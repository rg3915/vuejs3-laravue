<template>
  <div class="input-group mb-3">
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon1"
      @click.stop.prevent="decrement()"
    >-
    </button>
    <input
      :value="counter"
      type="text"
      class="form-control"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
    >
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
      @click.stop.prevent="increment()"
    >+
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CounterView',

  computed: {
    ...mapState({
      counter: state => state.counter
    })
  },

  methods: {
    ...mapMutations({
      $_add: 'INCREMENT',
      $_remove: 'DECREMENT',
    }),
    increment() {
      // this.$store.dispatch('counter', 5)
      this.$store.dispatch('counter', { type: 'INCREMENT', value: 10 })
      // this.$_add(10)
    },
    decrement() {
      this.$store.dispatch('counter', { type: 'DECREMENT', value: 10 })
      // this.$_remove(10)
    },
  },
}
</script>