<template>
  <div class="layout-padding">

    <h4 class="light-paragraph">
      Model {{ model.name }}
      <i class="on-left text-green" v-if="model.can_predict">check_box</i>
    </h4>
    <p>
    <small>{{ model.url }}</small>
    </p>

    <div v-if="!model.can_predict" class="label token bg-red text-white">
      <small><i class="on-left" >indeterminate_check_box</i>Untrained model,
        model cannot predict!</small>
    </div>
    <p>
    <span v-for="(k, v) in model.labels" class="chip label bg-light text-faded">
      <i class="on-left">mail</i>
      {{ k }} {{ v }}
    </span>
    </p>
    <div ref="tab-use">
      <div class="stacked-label" >
        <label class="title">Predict text</label>
        <input v-model="predict_text" :disabled="!model.can_predict" placeholder="Enter a phrase" type="text" />
        <button class="primary" :disabled="!predict_text" @click="predict()">Submit</button>
      </div>
      <transition name="bounce" >
      <div v-if="prediction" class="token label bg-faded">{{ prediction }}</div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'predict_text': '',
      'prediction': null
    }
  },
  watch: {
    'predict_text': function () {
      this.prediction = ''
    }
  },

  computed: { // TODO: use parent model
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
    }
  }
}
</script>

<style></style>
