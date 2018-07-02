<template>
  <div id="app">
    <Frankie />
  </div>
</template>

<script>
import Frankie from './components/Frankie.vue'

export default {
  name: 'app',
  components: {
    Frankie
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
