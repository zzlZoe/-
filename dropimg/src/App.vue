<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
html, body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
