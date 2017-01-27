<template>

  <div class="layout-view">
    <div class="layout-padding">

      <input v-model="service_url" placeholder="http:/localhost:6543/">
      <button class="secondary" @click="connect()">Connect</button>

      <p class="caption">
      <strong>The list of models</strong>
      <br />
      <small>
        <span class="desktop-only">
          The models are have a learning engine and they need to process data
          before they can be used for predictions.
        </span>
      </small>
      </p>
      <div class="row wrap smallgutter group">
        <div class="card width-1of5 " v-for="model in models" @click="viewModel(model.name)" >
          <div class="card-title">
            <a href="" class="text-black">
              <i class="on-left">input</i>
              {{ model.name }}
            </a>
          </div>
          <div class="card-content" >
            <div class="group">
              <div v-for="(k, v) in model.labels" class="chip label
              bg-light text-faded">
                <!-- <i class="on&#45;left">mail</i> -->
                {{ k }} {{ v }}
              </div>
            </div>
          </div>
        </div>
        <div class="width-1of5" @click="addModel()">
          <button class="secondary"><i>add</i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    models () {
      return this.$store.state.models
    },
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
    addModel: function (name) {
      this.$router.push({path: '/add_model'})
    },
    viewModel: function (name) {
      this.$router.push({path: '/' + name})
    },
    connect: function () {
      this.$store.dispatch('reconnect', {service_url: this.service_url})
    }
  }
}
</script>

<style>
.layout-view {
  padding: 2rem;
}
.card {
  cursor: pointer;
}
</style>
