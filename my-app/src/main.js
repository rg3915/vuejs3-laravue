import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home'
import Company from './views/Company'
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
    component: Company
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
    component: Contact
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

createApp(App)
  .use(router)
  .mount('#app')
