<template>
  <div class="flex content-center items-center justify-center full-height">
    <div id='hero'>
      <h1 style="font-weight: 600">Model8 / REST</h1>
      <!-- <p class="caption">a REST text classifier</p> -->
      <div id="connect-widget">
        <input v-model="service_url" placeholder="http:/localhost:6543/">
        <button @click="connect()" class="primary">
          <i v-if="!$store.state.connected">offline_pin</i>
          <i v-if="$store.state.connected">done</i>
          Connect
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      service_url: 'http://localhost:6543/'
    }
  },
  methods: {
    connect: function () {
      if (this.service_url) {
        this.$store.dispatch('reconnect', {service_url: this.service_url}).then(() => {
          this.$router.push({name: 'models'})
        })
      }
      else {
      }
    }
  }
}
</script>
<style>
#hero {
  text-align: center;
}
.full-height { height: 100% }
</style>
