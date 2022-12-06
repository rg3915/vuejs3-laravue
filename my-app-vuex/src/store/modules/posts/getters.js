export default {
  getPostById: (state) => (id) => {
    return state.posts.find(o => o.id === id)
  },
}