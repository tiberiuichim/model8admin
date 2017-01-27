<template>
  <q-layout>
    <div slot="header" class="toolbar primary">
      <q-toolbar-title :padding="2">
        <router-link to="/"><i class="text-white on-left">home</i></router-link>
        Model8 Interface
      </q-toolbar-title>
    </div>
    <q-transition name="slide">
      <router-view class="layout-view" />
    </q-transition>
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
