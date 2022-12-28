import { createStore } from 'vuex'
import counter from './modules/counter'

const store = createStore({
  strict: true,
  modules: {
    counter,
  },
})

export default store
