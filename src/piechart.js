import { Doughnut } from 'vue-chartjs'
import { getRandomColor } from './utils'

export default Doughnut.extend({
  props: ['labels', 'label', 'data'],
  mounted () {
    const bgs = this.data.map((x) => getRandomColor(x))
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          backgroundColor: bgs,   // '#f87979',
          data: this.data
        }
      ]
    })
  }
})
