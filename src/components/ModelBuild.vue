<template>
  <div class="layout-padding">
    <h5>Add data</h5>

    <div class="form">

      <div class="field half">
        <label>Lines of text</label>
        <textarea
           required
           class="full-width"
           v-model="text" :taggable="true"
           ></textarea>
      </div>

      <div class="field half">
        <label >Label for this text</label>
        <multiselect
           required
           class="field"
           v-model="selected_label"
           label="name"
           track-by='code'
           :taggable='true'
           :multiple="false"
           :options="labels"
           :show-labels="true"
           @tag="addLabel"
           >
        </multiselect>
      </div>
    </div>
    <div class="group">
      <button @click="addData()" :disabled="!(selected_label && text)" class="primary">Add text</button>
      <button class="teal" @click="train()">
        <i class="on-left">build</i>
        (Re)Train model
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    const labels = []
    return {
      model: '',
      text: '',
      labels,
      selected_label: null
    }
  },
  created: function () {
    const name = this.$route.params.model
    this.model = this.$store.state.models.filter(m => m.name === name)[0]
    const _labels = Object.keys(this.model.labels)
    const vocab = []
    _labels.forEach(
        (l) => { vocab.push({code: l, name: l}) }
    )
    this.labels = vocab
  },
  methods: {
    addLabel: function (tag) {
      this.labels.push({code: tag, name: tag})
    },
    addData: function () {
      console.log('adding data')
      this.$store.dispatch('addDataToModel', {
        url: this.model.url,
        text: this.text,
        label: this.selected_label.code
      }).then(() => {
        console.log('has been added')
        this.selected_label = null
        this.text = ''
        // this.$router.push('build')
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
