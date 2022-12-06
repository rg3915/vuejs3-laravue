<template>
  <div class="container mt-10">
    {{ $_fullName }}
    <Counter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Counter from './components/CounterView.vue'

export default {
  name: 'App',
  components: {
    Counter
  },

  created() {
    console.log(this.$_getPostById(1))
  },

  computed: {
    ...mapGetters({
      $_fullName: 'fullName',
      $_getPostById: 'getPostById',
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
