<template>
  <div>
    <h1>A empresa</h1>
    <p>Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Quem num gosta di mé, boa gentis num é. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.</p>


    <div :class="{ 'sidebar': sidebar }">
      <router-link :to="{ name: 'company-history' }">História</router-link>
      |
      <router-link :to="{ name: 'company-awards' }">Prêmios</router-link>
    </div>

    {{ sidebar }}

    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'Company',
    data() {
      return {}
    },
    beforeRouteEnter(to, from, next) {
      // console.log('beforeRouteEnter')
      // console.log('to', to)
      // console.log('from', from)
      next()
    },
    beforeRouteUpdate(to, from, next) {
      // console.log('beforeRouteUpdate')
      // console.log('to', to)
      // console.log('from', from)
      next()
    },
    beforeRouteLeave(to, from, next) {
      // console.log('beforeRouteLeave')
      // console.log('to', to)
      // console.log('from', from)
      next()
    },
    computed: {
      sidebar() {
        return this.$route.meta.sidebar
      }
    },
    watch: {
      // '$route'(newValue, oldValue) {
      //   this.fetchData()
      //   console.log(newValue)
      //   console.log(oldValue)
      // }
      '$route'() {
        this.fetchData()
      }
    },
    methods: {
      fetchData() {
        // ajax
        console.log('fetchData')
      }
    }
  }
</script>

<style>
  .sidebar {
    background-color: #CCC;
    padding: 5px;
  }
</style>