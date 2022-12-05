<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>{{ $store.state.first_name }} {{ $store.state.last_name }}</p>
    <p>{{ $store.state.email }}</p>
    <p>{{ userFirstName }}</p>
    <p>{{ fullName }}</p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    userFirstName() {
      return this.$store.state.first_name
    },
    fullName() {
      return `${ this.$store.state.first_name } ${ this.$store.state.last_name }`
    }
  }
}
</script>

