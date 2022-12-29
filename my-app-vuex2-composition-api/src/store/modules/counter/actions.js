export default {
  increment({ commit }, payload) {
    commit('INCREMENT', payload)
  },
  decrement({ commit }, payload) {
    commit('DECREMENT', payload)
  }
}