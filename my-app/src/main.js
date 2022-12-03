import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home'
import Company from './views/Company'
import Contact from './views/Contact'

const routes = [
    { path: '/', component: Home },
    { path: '/empresa', component: Company },
    { path: '/contato', component: Contact },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
  .use(router)
  .mount('#app')
