<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <h3>Rekap Demografis</h3>
        </v-card-title>
        <v-divider class="ma-0" />
        <filter-recap-status class="ma-4" :params="params" />
        <v-card class="ma-4">
          <table-recap-demographic
            :list-recap-demographic="listDemographicCase"
          />
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'RecapDemographic',
  data() {
    return {
      params: {
        start_date: '',
        criteria: 'CONFIRMATION'
      },
      listDemographicCase: []
    }
  },
  watch: {
    params: {
      handler(val) {
        this.getAgregateSummaryCase()
      },
      deep: true
    }
  },
  mounted() {
    this.getAgregateSummaryCase()
  },
  methods: {
    async getAgregateSummaryCase() {
      const res = await this.$store.dispatch('statistic/agregateSummaryCase', this.params)
      if (res.data) {
        this.listDemographicCase = res.data[0].demographic
      }
    }
  }
}
</script>
