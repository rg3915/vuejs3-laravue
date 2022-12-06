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
      posts: [
        { id: 1, title: 'Lorem Ipsum' },
        { id: 2, title: 'Mussum Ipsum' },
        { id: 3, title: 'VueJS' },
      ],
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
  },

  getters: {
    fullName(state) {
      return `${ state.first_name } ${ state.last_name }`
    },
    // getPostById(state) {
    //   return function(id) {
    //     return state.posts.find(o => o.id === id)
    //   }
    // },
    getPostById: (state) => (id) => {
      return state.posts.find(o => o.id === id)
    },
  }
})

createApp(App)
  .use(store)
  .mount('#app')