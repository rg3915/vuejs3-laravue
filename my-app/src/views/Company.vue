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
    computed: {
      sidebar() {
        return this.$route.meta.sidebar
      }
    },
  }
</script>

<style>
  .sidebar {
    background-color: #CCC;
    padding: 5px;
  }
</style>