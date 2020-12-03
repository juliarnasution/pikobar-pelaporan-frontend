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
          :on-reset="onReset"
          :handle-print="handlePrintPNG"
          :handle-export-excel="onExportExcelDemographic"
        />
        <v-card class="ma-4">
          <div ref="printRecapDemographic">
            <table-recap-demographic
              :list-recap-demographic="listDemographicCase"
              :headers-table="headersStatus"
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
import { mapGetters } from 'vuex'
import { rolesWidget } from '@/utils/constantVariable'

export default {
  name: 'RecapDemographic',
  data() {
    return {
      params: {
        start_date: '',
        criteria: 'CONFIRMATION'
      },
      listDemographicCase: [],
      isLoading: false,
      headersStatus: [
        { text: 'WNI', value: 'wni' },
        { text: 'WNA', value: 'wna' },
        { text: 'LAKI-LAKI', value: 'male' },
        { text: 'PEREMPUAN', value: 'female' },
        { text: '<5TH', value: 'under_five' },
        { text: '6-9TH', value: 'six_nine' },
        { text: '20-29TH', value: 'twenty_twenty_nine' },
        { text: '30-39TH', value: 'thirty_thirty_nine' },
        { text: '40-49TH', value: 'forty_forty_nine' },
        { text: '50-59TH', value: 'fifty_fifty_nine' },
        { text: '60-69TH', value: 'sixty_sixty_nine' },
        { text: '70-79TH', value: 'seventy_seventy_nine' },
        { text: '≥80 TH', value: 'greater_eighty' }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
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
    const nameDistrict = rolesWidget['superadmin'].includes(this.roles[0]) ? 'KOTA/KAB' : 'Kecamatan'
    this.headersStatus.unshift(
      { text: '#', value: '_id', sortable: false },
      { text: nameDistrict, value: '_id' }
    )
    this.getAgregateSummaryCase()
  },
  methods: {
    async getAgregateSummaryCase() {
      const res = await this.$store.dispatch('statistic/agregateSummaryCase', this.params)
      if (res.data) {
        this.listDemographicCase = res.data[0].demographic
      }
    },
    onReset() {
      this.params.start_date = ''
      this.params.criteria = 'CONFIRMATION'
      this.params.address_subdistrict_code = ''
      this.params.address_village_code = ''
      this.getAgregateSummaryCase()
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
    },
    async onExportExcelDemographic() {
      this.isLoading = true
      const criteria = this.params.criteria
      let criteriaText = this.$t(`label.${criteria.toLowerCase()}`)
      if (criteria === 'CONFIRMATION') {
        criteriaText = this.$t('label.confirmed')
      } else if (criteria === 'CLOSECONTACT') {
        criteriaText = this.$t('label.tight_contact')
      }
      const response = await this.$store.dispatch('statistic/exportDemographic', this.params)
      const dateNow = Date.now()
      const fileName = `${this.$t('label.demographic_data_recap')} ${criteriaText} - ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      FileSaver.saveAs(response, fileName)
      this.isLoading = false
    }
  }
}
</script>
