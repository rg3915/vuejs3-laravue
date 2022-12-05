import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state() {
    return {
      first_name: 'Jon',
      last_name: 'Snow',
      email: 'jon@snow.com',
      counter: 0,
    }
  },

  mutations: {
    increment(state) {
      state.counter += 1;
    },

    decrement(state) {
      state.counter -= 1;
    },
  },
})

createApp(App)
  .use(store)
  .mount('#app')
