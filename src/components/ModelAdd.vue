<template>
  <div class="layout-padding">
    <h4>Add new model</h4>
    <div class="form">
      <div class="floating-label">
        <input required v-model="model_name" placeholder="...">
        <label>Model name</label>
      </div>
      <button :disabled="!this.model_name" class="secondary" @click="add()">Add</button>
    </div>
  </div>
</template>

<script>
import { showError } from 'errorlib'

export default {
  data () {
    return {
      model_name: ''
    }
  },
  created: function () {
    if (!this.$store.state.connected) {
      showError('Not connected')
      this.$router.push({path: '/'})
    }
  },
  methods: {
    add: function () {
      this.$store.dispatch('addModel', {name: this.model_name}).then(() => {
        this.$router.push({name: 'models'})
      })
    }
  }
}
</script>

<style>
</style>
