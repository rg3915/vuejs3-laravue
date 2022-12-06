export default {
  namespaced: true,
  state: () => ({
    posts: [
      { id: 1, title: 'Lorem Ipsum' },
      { id: 2, title: 'Mussum Ipsum' },
      { id: 3, title: 'VueJS' },
    ]
  }),
  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(o => o.id === id)
    },
  }
}