<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
    style="height-100"
  >
    <v-card
      class="statistic-new-probable mx-auto height-100"
      outlined
    >
      <v-card-text class="card">
        <div class="head d-flex mb-3">
          {{ $t('label.total_probable') }}
          <div class="ml-auto">
            <v-tooltip
              bottom
              class="statistic"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >help_outline</v-icon>
              </template>
              <span>
                <span class="font-weight-bold">PROBABEL</span><br>
                Kasus suspek dengan ISPA<br>
                Berat/ARDS***/meninggal<br>
                dengan gambaran klinis yang<br>
                meyakinkan COVID-19 dan<br>
                belum ada hasil pemeriksaan<br>
                laboratorium RT-PCR.
              </span>
            </v-tooltip>
          </div>
        </div>
        <div class="total mb-5">
          {{ totalProbable | number }}
        </div>
        <div class="footer">
          <div class="progress-bar d-flex mb-2">
            <div
              v-if="totalSick === 0 && totalRecovered === 0 && totalDecease === 0"
              class="text-center"
              :style="{ width: '100%' }"
            />
            <div
              v-for="(item, index) in progress"
              :key="index"
              class="text-center"
              :class="item.class"
              :style="[
                item.percentBar,
                item.backgroundColor,
                item.zIndex,
                index > 0 ? {'margin-left': '-15px'} : {'margin-left': '0'}
              ]"
            >
              {{ item.percent | decimal }}%
            </div>
          </div>
          <div class="information">
            <v-row>
              <v-col
                col="12"
                lg="8"
                class="d-flex pr-0"
              >
                <div
                  class="box mr-2"
                  :style="{ backgroundColor: '#F2994A' }"
                />
                <div class="sub-label">{{ $t('label.still_sick') }}</div>
              </v-col>
              <v-col
                col="12"
                lg="4"
              >
                <div class="sub-total text-right">
                  {{ totalSick | number }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                col="12"
                lg="8"
                class="d-flex pr-0"
              >
                <div
                  class="box mr-2"
                  :style="{ backgroundColor: '#219653' }"
                />
                <div class="sub-label">{{ $t('label.finished_isolation_recovery') }}</div>
              </v-col>
              <v-col
                col="12"
                lg="4"
              >
                <div class="sub-total text-right">
                  {{ totalRecovered | number }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                col="12"
                lg="8"
                class="d-flex pr-0"
              >
                <div
                  class="box mr-2"
                  :style="{ backgroundColor: '#9C0000' }"
                />
                <div class="sub-label">{{ $t('label.dead') }}</div>
              </v-col>
              <v-col
                col="12"
                lg="4"
              >
                <div class="sub-total text-right">
                  {{ totalDecease | number }}
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticNewProbable',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    statistic: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      probable: null,
      totalProbable: 0,
      totalSick: 0,
      totalRecovered: 0,
      totalDecease: 0,
      percentSick: 0,
      percentRecovered: 0,
      percentDecease: 0,
      progress: []
    }
  },
  watch: {
    statistic: {
      handler(value) {
        this.probable = value
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    getData() {
      const sick = this.probable.sick || 0
      const recovered = this.probable.recovered || 0
      const decease = this.probable.decease || 0

      this.totalProbable = sick + recovered + decease
      this.totalSick = sick
      this.totalRecovered = recovered
      this.totalDecease = decease

      const data = [
        {
          total: this.totalSick,
          background: '#f2994a'
        },
        {
          total: this.totalRecovered,
          background: '#27ae60'
        },
        {
          total: this.totalDecease,
          background: '#9c0000'
        }
      ]

      this.progress = []
      for (let index = 0; index < data.length; index++) {
        if (data[index].total > 0) {
          const percent = (data[index].total / this.totalProbable) * 100
          this.progress.push({
            class: `progress-${index}`,
            percent: percent.toFixed(2),
            percentBar: { width: Number(percent) + 10 + '%' },
            backgroundColor: { backgroundColor: data[index].background },
            zIndex: { zIndex: data.length - index }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.statistic-new-probable {
  .card {
    .head {
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .total {
      color: #000000;
      font-size: 24px;
      font-weight: 500;
    }

    .footer {
      .progress-bar {
        color: #ffffff;
        margin-bottom: 5px;
        background-color: #f5f5f5;
        border-radius: 13px;

        div {
          height: 20px;
          border-radius: 10px;
        }
      }

      .information {
        .box {
          width: 15px;
          height: 15px;
          border-radius: 3px;
          margin-top: 2px;
        }

        .sub-total {
          font-weight: bold;
          color: #000000;
        }

        .sub-label {
          font-size: 11px;
        }
      }
    }
  }
}
</style>

<style scoped>
.v-tooltip__content {
  opacity: 1 !important;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  padding: 16px;
}

.height-100 {
  height: 100%;
}
</style>
