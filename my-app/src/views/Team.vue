<template>
  <div>
    <h1>Equipe</h1>
    <h2>{{ member }}</h2>

    <div v-if="member === 'regis'">
      Bio Regis
    </div>

    <div v-else-if="member === 'tiago'">
      Bio Tiago
    </div>

    <div v-else>
      Membro comum
    </div>

    <p>Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mim que vai caçá sua turmis! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Quem num gosta di mé, boa gentis num é. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.</p>
  </div>
</template>

<script>
  export default {
    name: 'Team',
    data() {
      return {}
    },
    computed: {
      member() {
        return this.$route.params.member
      }
    },
    methods: {}
  }
</script>