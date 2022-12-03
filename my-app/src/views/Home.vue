<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {}
    },
    created() {
      console.log(this.$route)
      console.log(this.$router)
    },
    methods: {}
  }
</script>