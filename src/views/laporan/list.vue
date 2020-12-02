
<template>
  <div>
    <v-skeleton-loader
      v-show="false"
      :loading="loading"
      type="article"
    >
      <v-card class="d-block pa-1 mx-auto header-survey-list">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-card-text class="header-survey-text">
                <div>{{ $t('label.total_case_data') }} : {{ totalData }}</div>
                <div>{{ fullName }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-skeleton-loader>
    <v-row
      v-show="false"
    >
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          type="article"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line style="background-color: #eb5757">
              <v-list-item-content>
                <v-list-item-title style="color: #FFFFFF;">{{ $t('label.total_case_confirmed').toUpperCase() }}</v-list-item-title>
                <v-list-item-title class="headline mb-1 font-weight-bold" style="color: #FFFFFF;">{{ totalConfirmation }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          type="article"
        >
          <v-card
            class="mx-auto"
            style="border: 2px solid #F2C94C;"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>{{ $t('label.total_probable').toUpperCase() }}</v-list-item-title>
                <v-list-item-title class="headline mb-1 font-weight-bold">{{ totalProbable }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          type="article"
        >
          <v-card
            class="mx-auto"
            style="border: 2px solid #27AE60;"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('label.total_suspect').toUpperCase() }}
                </v-list-item-title>
                <v-list-item-title class="headline mb-1 font-weight-bold">{{ totalSuspect }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          style="border: 2px solid #2D9CDB;"
          type="article"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('label.total_close_contact').toUpperCase() }}
                </v-list-item-title>
                <v-list-item-title class="headline mb-1 font-weight-bold">{{ totalCloseCase }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-card
      outlined
      class="mt-2"
    >
      <v-row>
        <v-col cols="12" md="6" sm="6" class="ma-1">
          <search
            :list-query="listQuery"
            :handle-search="handleSearch"
          />
        </v-col>
        <v-col class="px-0">
          <v-card-actions class="ma-0 py-0 float-right">
            <v-menu
              :close-on-content-click="false"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  color="#27AE60"
                  class="btn-import-export"
                  tile
                  outlined
                  v-on="on"
                >
                  <v-icon left>mdi-upload</v-icon>
                  {{ $t('label.export') }}
                </v-btn>
              </template>
              <v-card>
                <v-list-item @click="onExportCase">
                  {{ $t('label.export_patient_data') }}
                </v-list-item>
                <v-list-item @click="onExportHistoryCase">
                  {{ $t('label.export_clinical_history') }}
                </v-list-item>
              </v-card>
            </v-menu>
          </v-card-actions>
          <v-btn
            v-if="roles[0] !== 'faskes'"
            color="#27AE60"
            class="btn-import-export float-right"
            outlined
            @click="showImportForm = true"
          >
            <v-icon left>
              mdi-download
            </v-icon>
            {{ $t('label.import') }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            color="primary"
            class="mr-4 float-right"
            block
            @click="handleFilter"
          >
            {{ $t('label.filter') }}
            <v-icon v-if="!showFilter">mdi-chevron-right</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div
        v-if="showFilter"
        class="ma-2"
      >
        <case-filter
          :list-query="listQuery"
          :query-list.sync="listQuery"
          :reset-statistic.sync="resetStatistic"
          :on-search="handleSearch"
        />
      </div>
      <hr>
      <v-row align="center" justify="space-between">
        <v-col>
          <div class="title">
            {{ $t('label.case_data') }}
          </div>
        </v-col>
      </v-row>
      <hr class="table-divider">
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="listKasus"
            :mobile-breakpoint="NaN"
            :no-data-text="$t('label.data_empty')"
            :items-per-page="listQuery.limit"
            :options.sync="optionsDataTable"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr
                @click="handleNewDetail(item, item._id)"
              >
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.id_case ? item.id_case.toUpperCase() : '-' }}</td>
                <td>{{ item.name }}</td>
                <td>{{ getAge(item.age) }}</td>
                <td>
                  <div v-if="item.gender ==='P'">
                    {{ $t('label.female_initials') }}
                  </div>
                  <div v-else>
                    {{ $t('label.male_initials') }}
                  </div>
                </td>
                <td>{{ item.phone_number }}</td>
                <td><status :status="item.status" /> </td>
                <td><final-result :final-result="item.final_result" /></td>
                <td>{{ item.author.username }}</td>
                <td>{{ item.last_history ? formatDatetime(item.last_history.last_changed, 'DD MMMM YYYY') : '-' }}</td>
                <td>
                  <v-card-actions>
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-width="100"
                      :nudge-left="220"
                      :nudge-top="40"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ma-1"
                          color="#828282"
                          style="text-transform: none;height: 30px;min-width: 80px;"
                          tile
                          outlined
                          v-on="on"
                        >
                          {{ $t('label.choose_action') }}
                          <v-icon style="color: #009D57;font-size: 2rem;" right>
                            mdi-menu-down
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-list-item @click="handleDetail(item, item._id)">
                          {{ $t('label.edit_and_detail') }}
                        </v-list-item>
                        <div v-if="rolesWidget['all'].includes(roles[0])">
                          <v-list-item @click="handlePrintPEForm(item._id, item.id_case)">
                            {{ $t('label.print_pe_form') }}
                          </v-list-item>
                          <v-divider class="mt-0 mb-0" />
                          <v-list-item
                            v-if="rolesWidget['dinkeskota'].includes(roles[0])"
                            style="color: #EB5757 !important;"
                            @click="handleDeleteCase(item)"
                          >
                            {{ $t('label.deleted_case') }}
                          </v-list-item>
                        </div>
                      </v-card>
                    </v-menu>
                  </v-card-actions>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalList"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
    <dialog-delete
      :dialog="dialog"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialog"
      :delete-date.sync="dataDelete"
      :store-path-delete="`reports/deleteReportCase`"
      :store-path-get-list="`reports/listReportCase`"
      :list-query="listQuery"
    />
    <dialog-detail-case
      :show-dialog="dialogDetailCase"
      :show.sync="dialogDetailCase"
      :detail-case="detailCase"
      :close-contact-case="closeContactCase"
      :case-detail.sync="detailCase"
      :list-history-case="listHistoryCase"
      :referral-history-case="referralHistoryCase"
      :title-detail="$t('label.detail_case')"
    />
    <dialog-update-case
      :show-dialog="dialogUpdateCase"
      :show.sync="dialogUpdateCase"
      :form-pasien="formPasien"
    />
    <dialog-update-history-case
      :show-dialog="dialogHistoryCase"
      :show.sync="dialogHistoryCase"
      :form-riwayat-pasien="formRiwayatPasien"
      :form-pasien="formPasien"
    />
    <v-dialog v-model="failedDialog" persistent max-width="30%">
      <v-card>
        <v-card-title class="headline"><v-icon x-large color="red" left>mdi-close-circle</v-icon>{{ $t('errors.file_failed_upload') }}</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="failedDialog = false">{{ $t('label.ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="successDialog" max-width="40%">
      <v-card class="container">
        <v-row class="mx-0" align="center" justify="center">
          <v-card-title><v-icon size="80px" color="success">mdi-checkbox-marked-circle</v-icon></v-card-title>
        </v-row>
        <v-row class="mx-0" align="center" justify="center">
          <v-card-title class="display-1 font-weight-bold pt-0 success-message">{{ $t('label.congratulation') }}</v-card-title>
        </v-row>
        <v-row class="mx-0" align="center" justify="center">
          <v-card-text
            :class="{'subtitle-1': $vuetify.breakpoint. mdAndDown, 'headline': $vuetify.breakpoint. lgAndUp}"
            class="pt-0 text-center success-message"
          >
            {{ $t('label.import_success_message') }}
          </v-card-text>
        </v-row>
        <v-row class="mx-0" align="center" justify="center">
          <v-btn color="green darken-1" text @click="successDialog = false">{{ $t('label.ok') }}</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <import-form
      :show-import-form="showImportForm"
      :refresh-page="handleSearch"
      :show.sync="showImportForm"
      :failed.sync="failedDialog"
      :success.sync="successDialog"
      :message.sync="errorMessage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'
import FileSaver from 'file-saver'
import { rolesWidget } from '@/utils/constantVariable'
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'LaporanList',
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.case_code').toUpperCase(), value: 'id_case' },
        { text: this.$t('label.name').toUpperCase(), value: 'name' },
        { text: this.$t('label.age').toUpperCase(), value: 'age' },
        { text: this.$t('label.gender_abbreviation').toUpperCase(), value: 'gender' },
        { text: this.$t('label.short_phone_number').toUpperCase(), value: 'phone_number' },
        { text: this.$t('label.criteria').toUpperCase(), value: 'status' },
        { text: this.$t('label.latest_patient_status').toUpperCase(), value: 'final_result' },
        { text: this.$t('label.author').toUpperCase(), value: 'author' },
        { text: this.$t('label.last_updated_date').toUpperCase(), value: 'updatedAt' },
        { text: this.$t('label.action'), value: 'actions', sortable: false }
      ],
      loading: true,
      resetStatistic: false,
      loadingTable: false,
      totalConfirmation: 0,
      totalProbable: 0,
      totalSuspect: 0,
      totalCloseCase: 0,
      queryReportCase: {
        address_district_code: ''
      },
      rolesWidget,
      optionsDataTable: {},
      listQuery: {
        address_district_code: '',
        address_subdistrict_code: '',
        address_village_code: '',
        status: '',
        final_result: '',
        stage: '',
        page: 1,
        limit: 100,
        search: '',
        start_date: '',
        end_date: '',
        verified_status: 'verified',
        sort: 'updatedAt:asc'
      },
      countingReports: null,
      dialog: false,
      showFilter: false,
      dataDelete: null,
      formatDate: 'YYYY/MM/DD',
      failedDialog: false,
      showImportForm: false,
      errorMessage: null,
      successDialog: false,
      detailCase: {},
      closeContactCase: [],
      listCloseContact: [],
      listTransmissionArea: [],
      idCase: null,
      idUniqueCase: '',
      listHistoryCase: [],
      referralHistoryCase: [],
      dialogDetailCase: false,
      dialogHistoryCase: false,
      dialogUpdateCase: false,
      dialogCloseContact: false,
      dialogTransmissionArea: false,
      dialogHistoryTravel: false,
      dialogInspectionSupport: false,
      dialogPublicPlace: false
    }
  },
  computed: {
    ...mapGetters('reports', [
      'listKasus',
      'totalData',
      'totalList',
      'formPasien',
      'formRiwayatPasien'
    ]),
    ...mapGetters('user', [
      'roles',
      'fullName',
      'district_user'
    ])
  },
  watch: {
    'optionsDataTable': {
      handler: function(value) {
        if (value.sortBy !== undefined) {
          if ((value.sortBy[0] !== undefined) && (value.sortDesc[0])) {
            this.listQuery.sort = 'updatedAt:desc'
          } else if ((value.sortBy[0] !== undefined) && (!value.sortDesc[0])) {
            this.listQuery.sort = 'updatedAt:asc'
          } else {
            this.listQuery.sort = 'updatedAt:desc'
          }

          if (Object.keys(this.listQuery.sort).length > 0) {
            this.handleSearch()
          }
        }
      },
      immediate: true
    },
    'resetStatistic'(value) {
      if (value) {
        this.getStatistic()
      }
    }
  },
  async mounted() {
    EventBus.$on('refreshPageListReport', (value) => {
      this.handleSearch()
    })
    if (rolesWidget['dinkesKotaAndFaskes'].includes(this.roles[0])) this.listQuery.address_district_code = this.district_user
    this.queryReportCase.address_district_code = this.district_user
    await this.$store.dispatch('reports/listReportCase', this.listQuery)
    await this.getStatistic()
  },
  methods: {
    formatDatetime,
    async handleDetail(item, id) {
      this.$router.push(`/laporan/detail-report/${id}`)
    },
    handleNewDetail(item, id) {
      this.$router.push(`/laporan/detail-report/${id}`)
    },
    handleFilter() {
      this.showFilter = !this.showFilter
    },
    async handlePrintPEForm(id, caseCode) {
      const response = await this.$store.dispatch('reports/printPEForm', id)
      const fileName = `${this.$t('label.pe_report')} - ${caseCode}.pdf`
      FileSaver.saveAs(response, fileName)
    },
    async handleDeleteCase(item) {
      this.dialog = true
      this.dataDelete = item
    },
    async handleSearch() {
      this.listQuery.page = 1
      this.loadingTable = true
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
      await this.getStatistic()
      this.loadingTable = false
    },
    async getListCloseContactByCase(id) {
      const response = await this.$store.dispatch('closeContactCase/getListCloseContactByCase', id)
      this.listCloseContact = response.data
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    async getStatistic() {
      const listQueryStatistic = {
        address_district_code: this.listQuery.address_district_code,
        address_subdistrict_code: this.listQuery.address_subdistrict_code,
        address_village_code: this.listQuery.address_village_code,
        status: this.listQuery.status,
        final_result: this.listQuery.final_result,
        min_date: this.listQuery.start_date,
        max_date: this.listQuery.end_date
      }

      const response = await this.$store.dispatch('reports/countReportCase', listQueryStatistic)
      if (response) this.loading = false
      if (response.data === undefined) {
        this.totalConfirmation = 0
        this.totalProbable = 0
        this.totalSuspect = 0
        this.totalCloseCase = 0
      } else {
        this.totalConfirmation = response.data.confirmed
        this.totalProbable = response.data.probable
        this.totalSuspect = response.data.suspect
        this.totalCloseCase = response.data.closeContact
      }
    },
    async onExportCase() {
      const response = await this.$store.dispatch('reports/exportExcelCase', this.listQuery)
      const dateNow = Date.now()
      const fileName = `Data Pasien ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      FileSaver.saveAs(response, fileName)
    },
    async onExportHistoryCase() {
      const response = await this.$store.dispatch('reports/exportExcelHistory', this.listQuery)
      const dateNow = Date.now()
      const fileName = `Data Riwayat Klinis ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      FileSaver.saveAs(response, fileName)
    },
    getAge(value) {
      const yearsOld = Math.floor(value)
      const age = `${yearsOld} ${this.$t('label.year')}`
      return age
    }
  }
}
</script>
<style scoped>
  .title {
    font-size: 1.5rem;
    text-transform: uppercase;
    margin-left: 30px;
    color: #828282;
  }
  .align-right {
    text-align: right;
    padding-right: 50px;
  }
  .btn-import-export {
    width: 25%;
    height: 50px !important;
    min-width: 98px !important;
  }
  .margin-right {
    margin-right: 8px;
  }
  .margin-left {
    margin-left: 8px;
  }
  .table-divider {
    margin: 15px 0px 0px 0px;
  }
  .success-message {
    color: #27ae60;
  }
</style>
