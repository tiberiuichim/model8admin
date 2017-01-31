<template>
  <div class="layout-padding">

    <p class="small caption">
    <h4>List of models </h4>
    Models have a learning engine and they need to process data before
    they can be used for predictions.
    </p>

    <div id="model-list" class="list striped">
      <div class="item" v-for="model in models" >
        <div class="item-content">
          <router-link :to="{name: 'model', params: {model: model.name}}" >
            {{ model.name }}
            <i v-if="model.can_predict" class="on-left text-green">done</i>
          </router-link>
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
      this.$router.push({name: 'add_model'})
    },
    viewModel: function (name) {
      this.$router.push({name: 'model', model: name})
    }
  }
}
</script>

<style>
#model-list .item {
  cursor: pointer;
}
</style>
