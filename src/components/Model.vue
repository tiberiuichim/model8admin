<template>
  <q-layout>

    <div slot="header" >
      <q-tabs :refs="$refs" class="pink" default-tab="tab-view">
        <q-tab name="tab-list" :route="{name: 'models'}" icon="view_list">Models</q-tab>
        <q-tab name="tab-view" :route="{path: 'view'}" icon="input">Use</q-tab>
        <q-tab name="tab-build" :route="{path: 'build'}" icon="build">Build</q-tab>
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
    return {
      model: null
    }
  },
  // computed: {
  //   model: function () {
  //     return model
  //   }
  // },
  created: function () {
    if (!this.$store.state.service_url) {
      console.log('Not connected, going to frontpage')
      this.$router.push('/')
    }
    else {
      const name = this.$route.params.model
      this.model = this.$store.state.models.filter(m => m.name === name)[0]
      this.$router.push(
        {
          name: 'modelview',
          params: { model: this.model.name }
        }
      )
    }
  }
}
</script>

<style>
</style>
