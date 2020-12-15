
<template>
  <div>
    <v-card
      outlined
    >
      <v-container>
        <case-filter
          :list-query="listQuery"
          :query-list.sync="listQuery"
          :on-search="handleSearch"
        />
      </v-container>
      <hr>
      <v-row align="center" justify="space-between">
        <v-col>
          <div class="title">
            {{ $t('route.application_list') }}
          </div>
        </v-col>
      </v-row>
      <hr class="table-divider">
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="listKasus"
            mobile-breakpoint="0"
            :no-data-text="$t('label.data_empty')"
            :items-per-page="listQuery.limit"
            :options.sync="optionsDataTable"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.id_case ? item.id_case.toUpperCase() : '-' }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }} Th</td>
                <td>
                  <div v-if="item.gender =='P'">
                    {{ $t('label.female_initials') }}
                  </div>
                  <div v-else>
                    {{ $t('label.male_initials') }}
                  </div>
                </td>
                <td>{{ item.phone_number }}</td>
                <td><status :status="item.status" /> </td>
                <td>
                  <div v-if=" item.last_history.stage =='0'">
                    {{ $t('label.process') }}
                  </div>
                  <div v-else>
                    {{ $t('label.done') }}
                  </div>
                </td>
                <td>
                  <div v-if=" item.last_history.final_result =='0'">
                    {{ $t('label.negatif') }}
                  </div>
                  <div v-else-if=" item.last_history.final_result =='1'">
                    {{ $t('label.recovery') }}
                  </div>
                  <div v-else-if=" item.last_history.final_result =='2'">
                    {{ $t('label.dead') }}
                  </div>
                  <div v-else>
                    -
                  </div>
                </td>
                <td>{{ item.author.username }}</td>
                <td>{{ item.last_history.createdAt ? formatDatetime(item.last_history.createdAt, 'DD MMMM YYYY') : '-' }}</td>
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
                        <v-list-item @click="handleDetail(item._id)">
                          {{ $t('label.view_detail') }}
                        </v-list-item>
                        <div v-if="rolesWidget['dinkesKotaAndFaskes'].includes(roles[0])">
                          <v-list-item @click="handleEditCase(item._id)">
                            {{ $t('label.profile_update') }}
                          </v-list-item>
                          <v-list-item @click="handleEditHistoryCase(item._id)">
                            {{ $t('label.update_history') }}
                          </v-list-item>
                          <v-list-item
                            v-if="rolesWidget['dinkeskota'].includes(roles[0])"
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
    <v-dialog v-model="successDialog" max-width="20%">
      <v-card>
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
import FileSaver from 'file-saver'
import { rolesWidget } from '@/utils/constantVariable'
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'LaporanList',
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'KODE KASUS', value: 'id_case' },
        { text: 'NAMA', value: 'name' },
        { text: 'USIA', value: 'age' },
        { text: 'JK', value: 'gender' },
        { text: 'NO TELEPON', value: 'phone_number' },
        { text: 'STATUS', value: 'status' },
        { text: 'TAHAPAN', value: 'stage' },
        { text: 'HASIL', value: 'final_result' },
        { text: 'AUTHOR', value: 'author' },
        { text: 'TANGGAL INPUT', value: 'createdAt' },
        { text: 'Aksi', value: 'actions', sortable: false }
      ],
      loading: true,
      loadingTable: false,
      totalOTG: 0,
      totalODP: 0,
      totalPDP: 0,
      totalPositif: 0,
      totalReport: 0,
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
        page: 1,
        limit: 100,
        search: '',
        start_date: '',
        end_date: '',
        verified_status: 'verified',
        sort: {}
      },
      countingReports: null,
      dialog: false,
      dataDelete: null,
      failedDialog: false,
      showImportForm: false,
      errorMessage: null,
      successDialog: false
    }
  },
  computed: {
    ...mapGetters('reports', [
      'listKasus',
      'totalList'
    ]),
    ...mapGetters('user', [
      'roles',
      'fullName',
      'district_user'
    ])
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if ((value !== undefined) && (value.length >= 2)) {
          this.loadingTable = true
          this.listQuery.page = 1
          this.handleSearch()
          this.loadingTable = false
        } else if (value.length === 0) {
          this.loadingTable = true
          this.listQuery.page = 1
          this.handleSearch()
          this.loadingTable = false
        }
      },
      immediate: true
    },
    'optionsDataTable': {
      handler: function(value) {
        if (value.sortBy !== undefined) {
          if ((value.sortBy[0] !== undefined) && (value.sortDesc[0])) {
            this.listQuery.sort[value.sortBy[0]] = 'desc'
          } else if ((value.sortBy[0] !== undefined) && (!value.sortDesc[0])) {
            this.listQuery.sort[value.sortBy[0]] = 'asc'
          } else {
            this.listQuery.sort = {}
          }

          if (Object.keys(this.listQuery.sort).length > 0) {
            this.handleSearch()
          }
        }
      },
      immediate: true
    }
  },
  async mounted() {
    if (this.roles[0] === 'dinkeskota') this.listQuery.address_district_code = this.district_user
    this.queryReportCase.address_district_code = this.district_user
    const response = await this.$store.dispatch('reports/countReportCase', this.queryReportCase)
    if (response) this.loading = false
    this.totalOTG = response.data.OTG
    this.totalODP = response.data.ODP
    this.totalPDP = response.data.PDP
    this.totalPositif = response.data.POSITIF
    this.totalReport = this.totalOTG + this.totalODP + this.totalPDP + this.totalPositif
  },
  methods: {
    formatDatetime,
    async handleDetail(id) {
      await this.$router.push(`/laporan/detail/${id}`)
    },
    async handleEditCase(id) {
      await this.$router.push(`/laporan/edit-case/${id}`)
    },
    async handleEditHistoryCase(id) {
      await this.$router.push(`/laporan/edit-history-case/${id}`)
    },
    async handleDeleteCase(item) {
      this.dialog = true
      this.dataDelete = await item
    },
    async handleSearch() {
      this.listQuery.page = 1
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    async onExport() {
      const response = await this.$store.dispatch('reports/exportExcel', this.listQuery)
      const dateNow = Date.now()
      const fileName = `Data Kasus ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      FileSaver.saveAs(response, fileName)
    }
  }
}
</script>
<style>
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
    width: 36%;
    height: 46px !important;
    min-width: 100px !important;
    color: black !important;
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
