import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { INCREMENT } from './mutations'

const store = createStore({
  strict: true,
  modules: {
    users: {
      namespaced: true,
      // atributo, que recebe uma função, que retorna um objeto.
      // state: () => ({}),
      state: () => ({
        first_name: 'Arya',
        last_name: 'Stark',
        email: 'arya@stark.com',
      }),
      // recebe um objeto
      mutations: {},
      actions: {},
      getters: {
        fullName(state) {
          return `${ state.first_name } ${ state.last_name }`
        },
      },
    },
    counter: {
      namespaced: true,
      state: () => ({
        counter: 0
      }),
      mutations: {
        [INCREMENT](state, value) {
          state.counter += value;
        },

        DECREMENT(state, value) {
          state.counter -= value;
        },
      },
      actions: {
        counter({ commit }, { type, value }) {
          commit(type, value)
        }
      },
    }
  },
  state() {
    return {
      posts: [
        { id: 1, title: 'Lorem Ipsum' },
        { id: 2, title: 'Mussum Ipsum' },
        { id: 3, title: 'VueJS' },
      ],
    }
  },

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(o => o.id === id)
    },
  }
})

createApp(App)
  .use(store)
  .mount('#app')