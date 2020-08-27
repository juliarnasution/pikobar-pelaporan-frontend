<template>
  <div>
    <v-card
      outlined
    >
      <v-row align="center" justify="space-between">
        <v-col>
          <div class="title ml-4">
            {{ $t('label.patient_recap') }} <span>{{ fullName }} {{ this.$moment().format('DD MMMM YYYY HH:mm') }} WIB</span>
          </div>
        </v-col>
      </v-row>
      <hr class="table-divider">
      <v-row align="center" justify="space-between">
        <v-col>
          <div class="title ml-4">
            <v-row>
              <v-col>
                <input-date-picker
                  :format-date="formatDate"
                  :label="$t('label.input_date_filters')"
                  :date-value="listQuery.date"
                  :value-date.sync="listQuery.date"
                  @changeDate="listQuery.date = $event"
                />
              </v-col>
              <v-col>
                <v-btn
                  color="#4f4f4f"
                  class="ml-5 btn-reset"
                  @click="onReset"
                >
                  {{ $t('label.reset') }}
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="align-right">
          <v-btn
            class="mr-5"
            style="float: right;"
            color="#b3e2cd"
            :loading="loading"
            @click="handleVisualReport"
          >
            <v-icon left>mdi-upload</v-icon>
            {{ $t('label.export_png') }}
          </v-btn>
          <v-btn
            class="mr-5"
            style="float: right;"
            color="#b3e2cd"
            :loading="loading"
            @click="handleExport"
          >
            <v-icon left>mdi-upload</v-icon>
            {{ $t('label.export_xls') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div ref="printMe">
      <v-card
        outlined
      >
        <daily-report-table-revamp :data="data" :date="listQuery.date" />
        <!-- <daily-report-table
          :list="list"
          :table-headers="headers"
          :list-query="listQuery"
        /> -->
      </v-card>
      <!-- <v-row>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total OTG'"
            :total="listTotal.otg_total"
            :process="listTotal.otg_proses"
            :done="listTotal.otg_selesai"
            :gender="listTotal.otg_by_gender"
            :nationality="listTotal.otg_by_nationality"
            :age="listTotal.otg_by_usia"
          />
        </v-col>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total ODP'"
            :active-color="'#2D9CDB'"
            :total="listTotal.odp_total"
            :process="listTotal.odp_proses"
            :done="listTotal.odp_selesai"
            :gender="listTotal.odp_by_gender"
            :nationality="listTotal.odp_by_nationality"
            :age="listTotal.odp_by_usia"
          />
        </v-col>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total PDP'"
            :active-color="'#F2C94C'"
            :total="listTotal.pdp_total"
            :process="listTotal.pdp_proses"
            :done="listTotal.pdp_selesai"
            :gender="listTotal.pdp_by_gender"
            :nationality="listTotal.pdp_by_nationality"
            :age="listTotal.pdp_by_usia"
          />
        </v-col>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total Positif'"
            :active-color="'#EB5757'"
            :total="listTotal.positif_total"
            :process="listTotal.positif_proses"
            :done="listTotal.positif_selesai"
            :gender="listTotal.positif_by_gender"
            :nationality="listTotal.positif_by_nationality"
            :age="listTotal.positif_by_usia"
          />
        </v-col>
      </v-row> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileSaver from 'file-saver'
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'DailyReport',
  data() {
    return {
      formatDate: 'YYYY-MM-DD',
      loading: false,
      headers: [
        { text: this.$t('label.otg_procces').toUpperCase(), value: 'otg_proses' },
        { text: this.$t('label.otg_done').toUpperCase(), value: 'otg_selesai' },
        { text: this.$t('label.odp_procces').toUpperCase(), value: 'odp_proses' },
        { text: this.$t('label.odp_done').toUpperCase(), value: 'odp_selesai' },
        { text: this.$t('label.pdp_procces').toUpperCase(), value: 'pdp_proses' },
        { text: this.$t('label.pdp_done').toUpperCase(), value: 'pdp_selesai' },
        { text: this.$t('label.positif_procces').toUpperCase(), value: 'positif_aktif_proses' },
        { text: this.$t('label.positive_cured').toUpperCase(), value: 'positif_sembuh_selesai' },
        { text: this.$t('label.positif_dead').toUpperCase(), value: 'positif_meninggal_selesai' },
        { text: this.$t('label.grand_total').toUpperCase(), value: 'grand_total' }
      ],
      listQuery: {
        date: ''
      },
      data: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  watch: {
    'listQuery.date': {
      handler: function(value) {
        if (value.length > 0) {
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  async mounted() {
    if (this.roles[0] === 'dinkeskota') {
      this.headers.unshift({ text: this.$t('label.subdistrict').toUpperCase(), value: 'kotkabkec' })
    } else {
      this.headers.unshift({ text: this.$t('label.select_district').toUpperCase(), value: 'kotkabkec' })
    }
    this.handleSearch()
  },
  methods: {
    async handleSearch() {
      const response = await this.$store.dispatch('reports/getDailyReport', this.listQuery)
      if (response) {
        this.data = response
      }
    },
    async handleExport() {
      this.loading = true
      const response = await this.$store.dispatch('reports/exportExcelDailyReport', this.listQuery)
      const dateNow = Date.now()
      const fileName = `${this.$t('label.patient_recap')} ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      await FileSaver.saveAs(response, fileName)
      this.loading = false
    },
    async handleVisualReport() {
      this.loading = true
      const el = this.$refs.printMe
      const dateNow = Date.now()
      const filename = `${this.$t('label.patient_recap')} ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.png`
      const options = {
        type: 'dataURL'
      }
      const output = await this.$html2canvas(el, options)
      await FileSaver.saveAs(output, filename)
      this.loading = false
    },
    onReset() {
      this.listQuery.date = ''
      this.handleSearch()
    }
  }
}
</script>

<style scoped>
  .btn-reset {
    min-width: 37px!important;
    height: 46px !important;
    color: white !important;
  }
</style>
