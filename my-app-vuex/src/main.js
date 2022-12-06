import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { INCREMENT } from './mutations'

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
    [INCREMENT](state, value) {
      state.counter += value;
    },

    DECREMENT(state, value) {
      state.counter -= value;
    },
  },

  actions: {
    // counter({ commit }, payload) {
    //   commit('INCREMENT', payload)
    // }
    counter({ commit }, { type, value }) {
      commit(type, value)
    }
  }
})

createApp(App)
  .use(store)
  .mount('#app')
