import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state() {
    return {
      first_name: 'Jon',
      last_name: 'Snow',
      email: 'jon@snow.com',
    }
  },

  mutation: {
    updateName() {}
  }
})

createApp(App)
  .use(store)
  .mount('#app')

console.log(store.state.email)