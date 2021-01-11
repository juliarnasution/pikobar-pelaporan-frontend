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
    params: {
      type: Object,
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
          '0 - 10',
          '10 - 20',
          '20 - 30',
          '30 - 40',
          '40 - 50',
          '50 - 60',
          '60 - 70',
          '70 - 80',
          '90 - 100'
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
      const res = await this.$store.dispatch('statistic/summaryTestResultAge', this.params)
      const { data } = res
      const list_male_age = Array.isArray(data) ? data[0].male : null
      const list_female_age = Array.isArray(data) ? data[0].female : null
      delete list_male_age[0]._id
      delete list_female_age[0]._id
      const male_age = Object.values(list_male_age[0])
      const set_negative_male_age = male_age.map(x => -Math.abs(x))
      const female_age = Object.values(list_female_age[0])
      this.setDataAge(set_negative_male_age, female_age)
    },
    setDataAge(male_age = [], female_age = []) {
      this.loaded = true
      this.chartData.datasets[0].data = female_age
      this.chartData.datasets[1].data = male_age
      this.setMinMax(female_age, male_age)
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
      } if (max > 100 && max <= 1000) {
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
