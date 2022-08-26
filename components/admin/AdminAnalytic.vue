<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :width="chartWidth"
    :heigth="chartHeight"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import 'chart.js/auto'

export default {
  name: 'AdminAnalytic',
  components: { Bar },
  props: {
    title: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    chartWidth: {
      type: Number,
      default: 600
    },
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      chartData: {
        labels: this.labels,
        datasets: [{
          label: this.title,
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>
