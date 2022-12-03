<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <router-link to="/">Home</router-link>
     |
    <router-link to="/empresa">Empresa</router-link>
     |
    <router-link to="/contato">Contato</router-link>
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
