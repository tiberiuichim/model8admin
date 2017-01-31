<template>
  <div class="layout-padding">
    <h4>Labeled data</h4>
    <div class="row">
      <div class="width-2of5">
        <pie-chart :label="'Labels'" :labels="labels" :data="data">
        </pie-chart>
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from 'piechart'

export default {
  components: { PieChart },
  data: function () {
    return {
      model: ''
    }
  },
  created: function () {
    const name = this.$route.params.model
    const model = this.$store.state.models.filter(m => m.name === name)[0]
    this.model = model
  },
  computed: {
    labels: function () {
      return Object.keys(this.model.labels)
    },
    data: function () {
      return Object.values(this.model.labels)
    }
  }
}
</script>
