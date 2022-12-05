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
    increment(state, value) {
      state.counter += value;
    },

    decrement(state, value) {
      state.counter -= value;
    },
  },
})

createApp(App)
  .use(store)
  .mount('#app')
