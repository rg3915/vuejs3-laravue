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
import { useStore } from 'vuex'
import { computed } from 'vue';

export default {
  name: 'CounterView',

  setup() {
    const store = useStore()

    const increment = () => {
      store.dispatch('counter/counter', { type: 'INCREMENT', value: 10 })
    }
    const decrement = () => {
      store.dispatch('counter/counter', { type: 'DECREMENT', value: 10 })
    }

    const counter = computed(() => store.state.counter.counter)

    return {
      increment,
      decrement,
      counter,
    }
  },
}
</script>
