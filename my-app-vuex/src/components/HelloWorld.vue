<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <p>{{ firstName }} {{ lastName }}</p>
    <p>{{ email }}</p>
    <p>{{ fullName }}</p>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      firstName: state => state.first_name,
      lastName: state => state.last_name,
      email: state => state.email,
    }),
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
</script>

