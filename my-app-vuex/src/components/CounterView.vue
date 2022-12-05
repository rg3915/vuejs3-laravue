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
      :value="$store.state.counter"
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
export default {
  name: 'CounterView',
  methods: {
    increment() {
      this.$store.commit('increment', { value: 10 })
    },
    decrement() {
      this.$store.commit('decrement', { value: 10 })
    }
  },
}
</script>