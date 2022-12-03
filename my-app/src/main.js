import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld'

const routes = [
    { path: '/', component: HelloWorld }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
  .use(router)
  .mount('#app')
