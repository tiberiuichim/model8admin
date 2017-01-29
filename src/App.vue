<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
require('themes/form.mat.styl')
require('vue2-animate/dist/vue2-animate.min.css')
/*
 * Root component
 */
export default {}
</script>

<style>
#q-app { height: 100% }
</style>
