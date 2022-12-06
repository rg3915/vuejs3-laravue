import { createStore } from 'vuex'
import users from './modules/users'
import counter from './modules/counter'
import posts from './modules/posts'

const store = createStore({
  strict: true,
  modules: {
    users,
    counter,
    posts
  },
})

export default store
