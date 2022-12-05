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
    increment(state, payload) {
      state.counter += payload.value;
    },

    decrement(state, payload) {
      state.counter -= payload.value;
    },
  },
})

createApp(App)
  .use(store)
  .mount('#app')
