<template>
  <div class="layout-view">
    <div class="layout-padding">
      <h4>Model {{ $route.params.model }}
        <small>@ {{ model.url }}</small>
      </h4>
      <p>
      <span v-for="(k, v) in model.labels" class="chip label bg-light text-faded">
        <i class="on-left">mail</i>
        {{ k }} {{ v }}
      </span>
      </p>
      <div class="form fill" v-if="model.can_predict">
        <div class="field one-quarter">
          <label class="title">Predict text:</label>
          <input v-model="predict_text" type="text" />
        </div>
        <button class="primary" @click="predict()">Submit</button>
      </div>
      <div v-if="show_controls">
        <div class="form fill group" v-if="!model.can_predict">
          <button class="primary" @click="addData()">Add new data</button>
          <button class="primary" @click="train()">Train model</button>
        </div>
      </div>
      <transition>
        <router-view v-if="!show_controls"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { showError } from 'errorlib'

export default {
  data () {
    return {
      'predict_text': '',
      'show_controls': true
    }
  },
  mounted: function () {
    console.log('Mounted ModelView')
  },
  created: function () {
    console.log('created')
    if (!this.$store.state.models.length) {
      console.log('Pushing to frontpage')
      this.$router.push({path: '/'})
    }
  },
  computed: {
    model: function () {
      const name = this.$route.params.model
      const model = this.$store.state.models.filter(m => m.name === name)[0]
      console.log('model', model)
      return model
    }
  },
  methods: {
    predict: function () {
      console.log('predicting', this.predict_text)
    },
    addData: function () {
      console.log('adding data')
      this.show_controls = false
      const name = this.$route.params.model
      this.$router.push({
        name: 'model_add_data',
        params: { model: name }
      })
    },
    train: function () {
      // TODO: refactor to store action
      console.log('training', this)
      axios.post(this.model.url, {}).then(
        function (response) {
          console.log(response.data)
        }
      ).catch(
        function (error) {
          showError('Error from server')
          console.log(error)
        }
      )
    }
  }
}
</script>

<style>
</style>
