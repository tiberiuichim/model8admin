<template>

  <div class="layout-view">
    <div class="layout-padding">

      <p class="small caption">
      <h5>The models
        <button class="pink" @click="addModel()"><i>add</i></button>
      </h5>
      The models are have a learning engine and they need to process data
      before they can be used for predictions.
      </p>
      <div class="row wrap group">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    models () {
      return this.$store.state.models
    }
  },
  methods: {
    addModel: function (name) {
      this.$router.push({path: '/add_model'})
    },
    viewModel: function (name) {
      this.$router.push({path: '/' + name})
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
