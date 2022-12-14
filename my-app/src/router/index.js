import { createRouter, createWebHistory } from 'vue-router'
// import Home from './views/Home'
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home')
// import Company from '../views/Company'
// const Company = () => import(/* webpackChunkName: "company" */ '../views/Company') ou
const CompanyHistory = () => import(/* webpackChunkName: "company-history" */ '../views/CompanyHistory')
const CompanyAwards = () => import(/* webpackChunkName: "company-awards" */ '../views/CompanyAwards')
const Contact = () => import(/* webpackChunkName: "contact" */ '../views/Contact')
const Team = () => import(/* webpackChunkName: "team" */ '../views/Team')
const Error404 = () => import(/* webpackChunkName: "error404" */ '../views/404')

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
    component: () => import(/* webpackChunkName: "company" */ '../views/Company'), // <<<
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
    meta: {
      auth: true,
    },
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
  scrollBehaviour(to, from, savePosition) {
    console.log(to, from, savePosition)
    return { top: 0 }
  }
})

const isLogged = false

router.beforeEach((to, from, next) => {
  // console.log('beforeEach')
  // console.log('to', to)
  // console.log('from', from)
  
  let n = null

  if (to.meta.auth && !isLogged) {
    n = { name: 'home' }
  }

  next(n)
})

// router.afterEach((to, from) => {
//   console.log('afterEach')
//   console.log('to', to)
//   console.log('from', from)
// })

export default router
