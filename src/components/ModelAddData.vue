<template>
  <div class="group">
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
    <div>
      <button @click="submit()" :disabled="!(selected_label && text)" class="primary">Add</button>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    const labels = []
    return {
      text: '',
      labels,
      selected_label: null
    }
  },
  created: function () {
    const _labels = Object.keys(this.$parent.model.labels)
    const vocab = []
    _labels.forEach(
        (l) => { vocab.push({code: l, name: l}) }
    )
    this.labels = vocab
  },
  methods: {
    submit: function () {
      this.$store.dispatch('addDataToModel', {
        url: this.$parent.model.url,
        text: this.text,
        label: this.selected_label.code
      }).then(() => {
        this.$parent.show_controls = true
        // this.$router.push('/')
      })
    },
    addLabel: function (tag) {
      this.labels.push({code: tag, name: tag})
    }
  }
}
</script>

<style>
</style>
