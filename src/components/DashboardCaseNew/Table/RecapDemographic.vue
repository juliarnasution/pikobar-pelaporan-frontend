<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <h3>{{ $t('label.demographic_recap') }}</h3>
        </v-card-title>
        <v-divider class="ma-0" />
        <filter-recap-status
          class="ma-4"
          :params="params"
          :is-loading="isLoading"
          :handle-print="handlePrintPNG"
        />
        <v-card class="ma-4">
          <div ref="printRecapDemographic">
            <table-recap-demographic
              :list-recap-demographic="listDemographicCase"
            />
          </div>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import FileSaver from 'file-saver'
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'RecapDemographic',
  data() {
    return {
      params: {
        start_date: '',
        criteria: 'CONFIRMATION'
      },
      listDemographicCase: [],
      isLoading: false
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
    },
    async handlePrintPNG() {
      this.isLoading = true
      const el = this.$refs.printRecapDemographic
      const dateNow = Date.now()
      const filename = `${this.$t('label.demographic_recap')} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.png`
      const options = {
        type: 'dataURL'
      }
      const output = await this.$html2canvas(el, options)
      await FileSaver.saveAs(output, filename)
      this.isLoading = false
    }
  }
}
</script>
