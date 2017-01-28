<template>
  <div class="layout-view">
    <div class="layout-padding">
      <h4>
        Model {{ $route.params.model }}
        <i class="on-left text-green" v-if="model.can_predict">check_box</i>
        <span v-if="!model.can_predict">
          <small><small><small><i class="text-red" >indeterminate_check_box</i>Untrained model</small></small></small>
        </span>
      </h4>
      <p>
        <small>{{ model.url }}</small>
      </p>
      <p>
      <span v-for="(k, v) in model.labels" class="chip label bg-light text-faded">
        <i class="on-left">mail</i>
        {{ k }} {{ v }}
      </span>
      </p>
      <div class="form fill" v-if="model.can_predict">
        <div class="field one-half">
          <label class="title">Predict text:</label>
          <input v-model="predict_text" type="text" />
        </div>
        <button class="primary" @click="predict()">Submit</button>
        <div >{{ prediction }}</div>
      </div>
      <div v-if="show_controls">
        <div class="form fill group" v-if="!model.can_predict">
          <button class="green" @click="addData()">
            <i class="on-left">add</i>
            Add new data
          </button>
          <button class="teal" @click="train()">
            <i class="on-left">build</i>
            (Re)Train model
          </button>
        </div>
      </div>
      <transition>
        <router-view v-if="!show_controls"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'predict_text': '',
      'prediction': null,
      'show_controls': true
    }
  },
  // mounted: function () {
  //   console.log('Mounted ModelView')
  // },
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
      const self = this
      this.$store.dispatch('useModel', {
        url: this.model.url,
        text: this.predict_text
      }).then(function (data) {
        console.log('received ', data)
        self.prediction = data
      })
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
      this.$store.dispatch('trainModel', {
        url: this.model.url
      }).then(() => {
        console.log('trained')
      })
    }
  }
}
</script>

<style>
</style>
