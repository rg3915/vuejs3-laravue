import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home'
import Company from './views/Company'
import Contact from './views/Contact'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/empresa',
    name: 'company',
    alias: '/a-empresa',
    component: Company
  },
  { path: '/contato', name: 'contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
