export default {
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
}