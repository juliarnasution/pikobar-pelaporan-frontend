<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="chart mx-auto"
      outlined
    >
      <v-card-title class="title ml-0 mb-3 black--text">
        {{ $t('label.age') }}
      </v-card-title>
      <v-card-subtitle>
        <v-col
          cols="5"
          class="pa-0"
        >
          <select-status
            :selected-status="selectedStatus"
            :on-select-status="onSelectStatus"
          />
        </v-col>
      </v-card-subtitle>
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
  </v-skeleton-loader>
</template>

<script>
import { groupAge } from '@/utils/utilsFunction'

export default {
  name: 'ChartAge',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    },
    listQuery: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
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
      },
      params: null,
      selectedStatus: 'POSITIF-0'
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
    listQuery: {
      handler(value) {
        this.params = value
        this.getStatisticGender()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.horizontalBarChart.update()
    }
  },
  mounted() {
    this.loaded = true
    this.params = this.listQuery
    this.getStatisticGender()
  },
  methods: {
    groupAge,
    async getStatisticGender() {
      this.params.status_patient = (this.selectedStatus === 'POSITIF-0') ? null : this.selectedStatus

      this.loading = true
      const res = await this.$store.dispatch('statistic/countAgeGender', this.params)

      if (res) this.loading = false

      const male_age = this.groupAge('male', res.data.ageGroupMale)
      const female_age = this.groupAge('female', res.data.ageGroupFemale)

      this.chartData.datasets[0].data = female_age
      this.chartData.datasets[1].data = male_age
      this.setMinMax(female_age, male_age)
    },
    async onSelectStatus(value) {
      this.selectedStatus = value
      this.getStatisticGender()
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
      }
      if (max > 100 && max <= 1000) {
        last = max % 100
        plus = (last <= 75) ? 75 - last : 100 - last
      } else if (max > 1000) {
        last = max % 1000
        plus = (last <= 500) ? 1000 - last : 1500 - last
      }

      this.chartOptions.scales.xAxes[0].ticks.min = -Math.abs(max + plus)
      this.chartOptions.scales.xAxes[0].ticks.max = max + plus
    },
    checkVariable(variable) {
      if (typeof variable === 'undefined' || variable === null) {
        return 0
      }
      return Number(variable.count)
    }
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
