import { INCREMENT } from './mutations'

export default {
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