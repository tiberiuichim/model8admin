<template>
  <q-layout>

    <div slot="header" >
      <q-tabs :refs="$refs" class="pink" default-tab="tab-list">
        <q-tab name="tab-list" :route="{name: 'models_list'}" icon="view_list">Models</q-tab>
        <q-tab name="tab-add" :route="{name: 'models_add_model'}" icon="add">Add</q-tab>
      </q-tabs>
    </div>

    <div class="layout-view">
      <router-view></router-view>
      <q-ajax-bar></q-ajax-bar>
    </div>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {}
  },
  created: function () {
    console.log('Service_url at creation', this.$store.state.service_url)
    if (!this.$store.state.service_url) {
      console.log('Not connected, going to frontpage')
      this.$router.push('/')
    }
    else {
      this.$router.push({name: 'models_list'})
    }
  }
}
</script>

<style>
</style>
