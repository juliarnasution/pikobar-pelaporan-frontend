<template>
  <v-card
    class="chart-test-daily"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.growth') }} {{ $t('label.total_test_result') }} {{ label }}
      <div
        v-if="tabActive === 'rapid'"
        class="sample d-flex ml-auto"
      >
        <div class="mr-3">{{ $t('label.sample_taken') }}</div>
        <v-checkbox
          v-model="sampleActive"
          class="vena pt-0 mr-3"
          :label="$t('label.vena')"
          value="vena"
          @change="filterSample()"
        />
        <v-checkbox
          v-model="sampleActive"
          class="kapiler pt-0"
          :label="$t('label.kapiler')"
          value="kapiler"
          @change="filterSample()"
        />
      </div>
    </v-card-title>
    <v-divider class="mt-0 mb-2" />
    <v-card-text>
      <chart-bar
        v-if="loaded"
        ref="barChart"
        :chart-data="chartData"
        :options="chartOptions"
        :styles="chartStyles"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartTestMonthly',
  props: {
    tabActive: {
      type: String,
      default: null
    },
    chartHeight: {
      type: Number,
      default: 300
    },
    dataTestMonthly: {
      type: Array,
      default: function() { return [] }
    }
  },
  data() {
    return {
      loaded: false,
      label: null,
      sampleActive: ['vena', 'kapiler'],
      chartData: {
        labels: [],
        datasets: []
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
              scaleLabel: {
                display: false
              },
              ticks: {
                precision: 0
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                precision: 0,
                min: 0
              },
              gridLines: {
                drawBorder: false
              },
              scaleLabel: {
                display: true,
                labelString: this.$t('label.total_test_result')
              }
            }
          ]
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 10
          }
        },
        legendCallback: (chart) => {
          this.charts = chart
          this.legends = chart.data.datasets
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false,
          tooltipCaretSize: 0
        }
      },
      chartStyles: {}
    }
  },
  computed: {
    optionsDataMontly: {
      get: function() {
        return this.dataTestMonthly
      },
      set: function(value) {
        this.$emit('update:testMonthlyData', value)
      }
    }
  },
  watch: {
    'tabActive': {
      handler(value) {
        this.tabActive = value
        this.filterTab()
        this.$refs.barChart.update()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.barChart.update()
    },
    optionsDataMontly(value) {
      if (value) this.getDataAll()
    }
  },
  mounted() {
    this.filterTab()
  },
  methods: {
    filterTab() {
      this.loaded = true
      if (this.tabActive === 'rapid') {
        this.label = this.$t('label.rapid')
        this.getDataRapid()
      } else if (this.tabActive === 'pcr') {
        this.label = this.$t('label.pcr')
        this.getDataPCR()
      } else {
        this.label = null
        this.getDataAll()
      }
      if (this.$refs.barChart) this.$refs.barChart.update()
    },
    filterSample() {
      this.$refs.barChart.update()
    },
    getDataAll() {
      const date = []
      const one = []
      const two = []

      this.setHeight(this.chartHeight)

      // for (let index = 0; index < this.optionsDataMontly.length; index++) {
      //   date.push(this.optionsDataMontly[index]._id)
      //   one.push(this.optionsDataMontly[index].rdt)
      //   two.push(this.optionsDataMontly[index].pcr)
      // }

      for (let index = 0; index <= 9; index++) {
        date.push('2020-07-1' + index)
        one.push(this.randomNumber())
        two.push(this.randomNumber())
      }

      this.chartData.labels = date

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.rapid_test_id'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one
        },
        {
          label: this.$t('label.pcr'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two
        }
      )
      if (this.$refs.barChart) this.$refs.barChart.update()
    },
    getDataRapid() {
      const date = []
      const one = []
      const two = []
      const three = []

      for (let index = 0; index <= 9; index++) {
        date.push('2020-07-1' + index)
        one.push(this.randomNumber())
        two.push(this.randomNumber())
        three.push(this.randomNumber())
      }

      this.chartData.labels = date

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.reaktif'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one
        },
        {
          label: this.$t('label.non_reaktif'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two
        },
        {
          label: this.$t('label.inkonklusif'),
          backgroundColor: '#2F80ED',
          hoverBackgroundColor: '#2F80ED',
          data: two
        }
      )
    },
    getDataPCR() {
      const date = []
      const one = []
      const two = []
      const three = []

      for (let index = 0; index <= 9; index++) {
        date.push('2020-07-1' + index)
        one.push(this.randomNumber())
        two.push(this.randomNumber())
        three.push(this.randomNumber())
      }

      this.chartData.labels = date
      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.positif'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one
        },
        {
          label: this.$t('label.negatif'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two
        },
        {
          label: this.$t('label.invalid'),
          backgroundColor: '#2F80ED',
          hoverBackgroundColor: '#2F80ED',
          data: two
        }
      )
    },
    setHeight(total) {
      const limit = 8

      let height
      if (total > 0 && total <= limit) {
        height = '100%'
      } else if (total > limit && total <= limit * 2) {
        height = '200%'
      } else if (total > limit * 2 && total <= limit * 3) {
        height = '300%'
      } else if (total > limit * 3 && total <= limit * 4) {
        height = '400%'
      }

      this.chartStyles = {
        height,
        position: 'relative'
      }
    },
    randomNumber() {
      return Math.floor(Math.random() * 101)
    }
  }
}
</script>

<style lang="scss">
.chart-test-daily {
  .title {
    font-size: 16px !important;

    .sample {
      font-size: 0.875rem;
      font-weight: normal;

      .vena,
      .kapiler {
        margin-top: 2px;

        .v-input__slot {
          margin-bottom: 0;
        }

        .v-messages {
          display: none;
        }
      }
    }
  }
}
</style>
