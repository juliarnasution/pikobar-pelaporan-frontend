<template>
  <div>
    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-container>
          <v-card>
            <v-card-title>
              <h3>Rekap Kontak Erat, Suspek, Probable & Terkonfirmasi</h3>
            </v-card-title>
            <v-divider class="ma-0" />
            <filter-recap-status class="ma-4" :params="params" />
            <v-row v-if="item === 'Ringkasan'">
              <v-col>
                <v-card class="ma-4">
                  <table-recap-case
                    :list-recap-case="listSummaryCase"
                  />
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <v-list class="ma-0" style="overflow-y: scroll;max-height: 500px;">
                  <v-list-item-group class="ma-0">
                    <v-list-item
                      v-for="data in dataVisualization"
                      :key="data._id"
                    >
                      <v-list-item-title style="max-width: 150px;" v-text=" data._id" />
                      <v-list-item-title>
                        <progress-bar-case
                          :loading="false"
                          :data="data"
                        />
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>

export default {
  name: 'RecapStatus',
  data() {
    return {
      tab: null,
      items: [
        'Ringkasan', 'Visualisasi Data'
      ],
      dataVisualization: {},
      params: {
        start_date: '',
        criteria: 'CONFIRMATION'
      },
      listSummaryCase: []
    }
  },
  watch: {
    params: {
      handler(val) {
        if (this.tab === 0) {
          this.getAgregateSummaryCase()
        } else {
          this.getVisualizationCase()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getVisualizationCase()
    this.getAgregateSummaryCase()
  },
  methods: {
    async getVisualizationCase() {
      const res = await this.$store.dispatch('statistic/agregateVisualizationCase', this.params)
      if (res.data) {
        this.dataVisualization = res.data[0].visualization
      }
    },
    async getAgregateSummaryCase() {
      const res = await this.$store.dispatch('statistic/agregateSummaryCase', this.params)
      if (res.data) {
        this.listSummaryCase = res.data[0].summary
      }
    }
  }
}
</script>
