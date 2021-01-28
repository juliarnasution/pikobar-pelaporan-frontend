<template>
  <v-card
    class="chart-test-age"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.comparison') }} {{ $t('label.age') }} {{ $t('label.and') }} {{ $t('label.gender') }}
    </v-card-title>
    <v-divider class="mt-0 mb-2" />
    <v-card-text>
      <chart-bar-horizontal
        v-if="loaded"
        ref="horizontalBarChart"
        :chart-data="chartData"
        :options="chartOptions"
        :styles="chartStyles"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartTestAge',
  props: {
    tabActive: {
      type: String,
      default: null
    },
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [
          '<5',
          '6 - 19',
          '20 - 29',
          '30 - 39',
          '40 - 49',
          '50 - 59',
          '60 - 69',
          '70 - 79',
          '>80'
        ],
        datasets: [
          {
            label: this.$t('label.female'),
            backgroundColor: '#F2C94C',
            data: []
          },
          {
            label: this.$t('label.male'),
            backgroundColor: '#27AE60',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                drawBorder: false
              },
              ticks: {
                precision: 0,
                callback: (value, index, values) => {
                  return Math.abs(value)
                }
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: true,
              ticks: {
                reverse: true
              }
            }
          ]
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10
          },
          reverse: true
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (items, data) => {
              return data.datasets[items.datasetIndex].label + ': ' + Math.abs(items.xLabel)
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    }
  },
  computed: {
    chartStyles() {
      return {
        height: `${this.chartHeight}px`,
        position: 'relative'
      }
    }
  },
  watch: {
    'tabActive': {
      handler(value) {
        this.tabActive = value
        this.getDataAge()
        this.$refs.horizontalBarChart.update()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.horizontalBarChart.update()
    }
  },
  mounted() {
    this.getDataAge()
  },
  methods: {
    async getDataAge() {
      this.loaded = true

      const male_age = []
      const female_age = []

      for (let index = 1; index <= 9; index++) {
        female_age.push(this.randomNumberFemale())
        male_age.push(-Math.abs(this.randomNumberMale()))
      }

      this.chartData.datasets[0].data = female_age
      this.chartData.datasets[1].data = male_age
      this.setMinMax(female_age, male_age)
    },
    randomNumberMale() {
      return Math.floor(Math.random() * 501)
    },
    randomNumberFemale() {
      return Math.floor(Math.random() * 1001)
    },
    setMinMax(female, male) {
      const maxFemale = Math.max(...female)
      const minMale = Math.min(...male)
      const max = (maxFemale > Math.abs(minMale)) ? maxFemale : Math.abs(minMale)

      let plus = 0
      let last = 0
      if (max > 10 && max <= 100) {
        last = max % 10
        plus = (last <= 5) ? 10 - last : 15 - last
      } else if (max > 100 && max <= 1000) {
        last = max % 100
        plus = (last <= 75) ? 75 - last : 100 - last
      } else if (max > 1000) {
        last = max % 1000
        plus = (last <= 500) ? 1000 - last : 1500 - last
      }

      this.chartOptions.scales.xAxes[0].ticks.min = -Math.abs(max + plus)
      this.chartOptions.scales.xAxes[0].ticks.max = max + plus
    }
  }
}
</script>

<style lang="scss">
.chart-test-age {
  .title {
    font-size: 16px !important;
  }
}
</style>
