import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home'
import Company from './views/Company'
import CompanyHistory from './views/CompanyHistory'
import CompanyAwards from './views/CompanyAwards'
import Contact from './views/Contact'
import Team from './views/Team'
import Error404 from './views/404'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/a-empresa',
    // redirect: '/empresa', ou
    redirect: { name: 'company' },
  },
  {
    path: '/empresa',
    name: 'company',
    // alias: '/a-empresa',
    component: Company,
    meta: {
      sidebar: true,
      auth: false,
    },
    children: [
      {
        path: 'historia',
        name: 'company-history',
        component: CompanyHistory,
      },
      {
        path: 'premios',
        name: 'company-awards',
        component: CompanyAwards,
      },
    ]
  },
  {
    path: '/equipe/:member',
    name: 'team',
    component: Team,
    props: route => ({ member: route.params.member, color: 'green' })
  },
  {
    path: '/contato',
    name: 'contact',
    component: Contact,
    beforeEnter: (to, from, next) => {
      // console.log('to', to)
      // console.log('from', from)
      next()
    }
  },
  {
    path: '/:pathMatch(.*)',
    component: Error404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  console.log('to', to)
  console.log('from', from)
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
  console.log('to', to)
  console.log('from', from)
})

createApp(App)
  .use(router)
  .mount('#app')
