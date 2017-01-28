<template>
  <q-layout>

    <div slot="header" class="toolbar primary">

      <q-toolbar-title :padding="1">
        <router-link to="/"><i class="text-white on-left">home</i></router-link>
        Model8 Interface

      </q-toolbar-title>

      <div class="auto flex within-iframe-hide justify-end">
        <input v-model="service_url" class="bg-blue text-white" placeholder="http:/localhost:6543/">
        <button class="secondary" @click="connect()">Connect</button>
      </div>

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
  },
  computed: {
    service_url: {    // TODO: refactor this
      get: function () {
        return this.$store.state.service_url
      },
      set: function (val) {
        this.$store.commit({ type: 'set_service_url', service_url: val })
      }
    }
  },
  methods: {
    connect: function () {
      this.$store.dispatch('reconnect', {service_url: this.service_url})
    }
  }
}
</script>

<style>
</style>
