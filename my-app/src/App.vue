<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <router-link :to="{ name: 'home' }">Home</router-link>
     |
    <router-link :to="{ name: 'company' }">Empresa</router-link>
     |
    <router-link :to="{ name: 'team', params: { member: 'regis' }}">Equipe</router-link>
     |
    <router-link :to="{ name: 'contact' }">Contato</router-link>
  </div>

  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
