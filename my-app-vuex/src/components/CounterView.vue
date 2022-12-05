<template>
  <div class="input-group mb-3">
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon1"
      @click.stop.prevent="decrement(10)"
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
      @click.stop.prevent="increment(10)"
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
    ...mapMutations(['increment', 'decrement'])
  },
}
</script>