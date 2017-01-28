<template>
  <q-layout>
    <div slot="header" class="toolbar primary">
      <q-toolbar-title :padding="2">
        <router-link to="/"><i class="text-white on-left">home</i></router-link>
        Model8 Interface
      </q-toolbar-title>
    </div>
    <!-- <q&#45;transition name="slide"> -->
    <router-view class="layout-view" ></router-view>
    <q-ajax-bar></q-ajax-bar>
    <!-- </q&#45;transition> -->
  </q-layout>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
