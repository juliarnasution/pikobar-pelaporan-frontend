<template>
  <v-col auto>
    <v-data-table
      :key="list.length"
      :headers="headers"
      :items="list"
      :mobile-breakpoint="NaN"
      :no-data-text="$t('label.data_empty')"
      :items-per-page="listQuery.limit"
      hide-default-footer
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ getTableRowNumbering(index) }}</td>
          <td>{{ item.name }}</td>
          <td>{{ getAge(item.age) }}</td>
          <td>
            <div v-if="item.gender === 'P'">
              {{ $t('label.female_initials') }}
            </div>
            <div v-else>
              {{ $t('label.male_initials') }}
            </div>
          </td>
          <td><status :status="item.status" /> </td>
          <td>
            <div v-if=" item.last_history.final_result ==='0'">
              {{ $t('label.negatif') }}
            </div>
            <div v-else-if=" item.last_history.final_result ==='1'">
              {{ $t('label.recovery') }}
            </div>
            <div v-else-if=" item.last_history.final_result ==='2'">
              {{ $t('label.dead') }}
            </div>
            <div v-else-if=" item.last_history.final_result ==='3'">
              {{ $t('label.discarded') }}
            </div>
            <div v-else-if=" item.last_history.final_result ==='4'">
              {{ $t('label.still_sick') }}
            </div>
            <div v-else-if=" item.last_history.final_result ==='5'">
              {{ $t('label.still_quarantine') }}
            </div>
            <div v-else>
              -
            </div>
          </td>
          <td>{{ item.author.username }}</td>
          <td v-if="roles[0] === 'faskes'">
            {{ formatDatetime(item.createdAt, 'DD MMMM YYYY') }}
          </td>
          <td v-if="roles[0] === 'faskes'" class="adjust-width">
            <span
              v-if="item.verified_status === 'pending'"
              :class="{'pending': item.verified_status === 'pending', 'declined': item.verified_status === 'declined'}"
              class="pa-2 font-weight-bold"
            >
              {{ item.verified_status === 'pending' ? $t('label.waiting_for_verification') : $t('label.case_rejected') }}
            </span>
            <span
              v-else
              :class="{'draft': item.verified_status === 'draft', 'declined': item.verified_status === 'declined'}"
              class="pa-2 font-weight-bold"
            >
              {{ item.verified_status === 'draft' ? $t('label.has_not_been_submitted') : $t('label.case_rejected') }}
            </span>
          </td>
          <td v-else-if="item.verified_status !== 'declined'">{{ item.updatedAt ? timeRemain(item.updatedAt) : '-' }}</td>
          <td v-else-if="tableHeaders.length > 8">&nbsp;</td>
          <td
            v-if="item.verified_status === 'pending' || roles[0] === 'faskes' && item.verified_status === 'declined' || item.verified_status === 'draft'"
          >
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
                    class="ma-1 action-btn"
                    color="#828282"
                    tile
                    outlined
                    v-on="on"
                  >
                    {{ $t('label.choose_action') }}
                    <v-icon class="action-icon" right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <div v-if="roles[0] === 'faskes'">
                    <v-list-item
                      v-if="item.verified_status === 'declined' || item.verified_status === 'draft'"
                      @click="handleDetailFixCase(item._id)"
                    >
                      {{ item.verified_status === 'declined'? $t('label.fix_case'):$t('label.view_and_complete_case_data') }}
                    </v-list-item>
                    <v-list-item
                      v-else
                      @click="handleDetail(item._id)"
                    >
                      {{ $t('label.view_detail') }}
                    </v-list-item>
                    <v-list-item @click="handleDeleteCase(item)">
                      <span class="delete">{{ $t('label.delete_case') }}</span>
                    </v-list-item>
                  </div>
                  <div v-else>
                    <v-list-item @click="handleDetail(item._id)">
                      {{ $t('label.verification_process') }}
                    </v-list-item>
                  </div>
                </v-card>
              </v-menu>
            </v-card-actions>
          </td>
          <td v-else>&nbsp;</td>
        </tr>
      </template>
    </v-data-table>
    <dialog-delete
      class="ma-0"
      :dialog="dialog"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialog"
      :delete-date.sync="dataDelete"
      :store-path-delete="`reports/deleteReportCase`"
      :store-path-get-list="`reports/listReportCase`"
      :list-query="listQuery"
    />
    <dialog-close-contact
      class="ma-0"
      :show-dialog="dialogCloseContact"
      :show.sync="dialogCloseContact"
      :list-close-contact.sync="listCloseContact"
      :id-case="idCase"
      :case-id.sync="idCase"
      :id-unique-case="idUniqueCase"
      :unique-case-id.sync="idUniqueCase"
      :title-detail="$t('label.close_contact_list')"
    />
    <dialog-update-case
      class="ma-0"
      :show-dialog="dialogUpdateCase"
      :show.sync="dialogUpdateCase"
      :form-pasien="formPasien"
    />
    <dialog-update-history-case
      class="ma-0"
      :show-dialog="dialogHistoryCase"
      :show.sync="dialogHistoryCase"
      :form-riwayat-pasien="formRiwayatPasien"
    />
  </v-col>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatDatetime } from '@/utils/parseDatetime'
import EventBus from '@/utils/eventBus'
export default {
  name: 'VerificationTable',
  props: {
    listKasus: {
      type: Array,
      default: null
    },
    query: {
      type: Object,
      default: null
    },
    tableHeaders: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      list: this.listKasus,
      headers: this.tableHeaders,
      listQuery: this.query,
      dialog: false,
      idCase: null,
      idUniqueCase: null,
      dialogCloseContact: false,
      listCloseContact: [],
      dataDelete: null,
      verificationQuery: {
        'id': '',
        'data': {
          'verified_status': '',
          'verified_comment': ''
        }
      },
      dialogHistoryCase: false,
      dialogUpdateCase: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    ...mapGetters('reports', [
      'formPasien',
      'formRiwayatPasien'
    ])
  },
  watch: {
    listKasus(value) {
      this.list = value
    },
    tableHeaders(value) {
      this.headers = value
    },
    query(value) {
      this.listQuery = value
    },
    dialogHistoryCase(value) {
      if (!value) {
        this.$emit('update:refreshPage', true)
      }
    },
    dialogUpdateCase(value) {
      if (!value) {
        this.$emit('update:refreshPage', true)
      }
    }
  },
  async mounted() {
    EventBus.$on('refreshPageListReport', (value) => {
      if (this.idCase !== null) {
        this.getListCloseContactByCase(this.idCase)
      }
    })
  },
  methods: {
    formatDatetime,
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    timeRemain(value) {
      const now = this.$moment()
      const maxVerifiedDate = this.$moment(value).add(1, 'days')

      // output otomatis mengeluarkan kalimat waktu. Contoh: dalam 3 jam
      return (maxVerifiedDate > now) ? now.to(maxVerifiedDate) : '-'
    },
    async handleDetail(id) {
      this.$emit('update:verificationQuery', this.verificationQuery)
      const response = await this.$store.dispatch('reports/detailReportCase', id)
      const responseCloseContact = await this.$store.dispatch('closeContactCase/getListCloseContactByCase', id)
      if (response.data.verified_status === 'verified') {
        this.$emit('update:showFailedDialog', true)
      } else {
        this.$emit('update:caseDetail', response.data)
        this.$emit('update:closeContactDetail', responseCloseContact.data)
        this.$emit('update:showVerificationForm', true)
      }
    },
    // async handleCorrectCaseReport(id) {
    //   await this.$router.push(`/laporan/correct-case-report/${id}`)
    // },
    async handleEditCase(id) {
      this.detail = await this.$store.dispatch('reports/detailReportCase', id)
      await Object.assign(this.formPasien, this.detail.data)
      if (this.detail.data.birth_date) {
        this.formPasien.birth_date = await this.formatDatetime(this.detail.data.birth_date, this.formatDate)
      } else {
        this.formPasien.birth_date = ''
      }
      if (this.formPasien._id) {
        delete this.formPasien['author']
        delete this.formPasien['createdAt']
        delete this.formPasien['updatedAt']
        delete this.formPasien['last_history']
      }
      this.dialogUpdateCase = true
    },
    async handleEditHistoryCase(id) {
      this.detail = await this.$store.dispatch('reports/detailHistoryCase', id)
      await Object.assign(this.formRiwayatPasien, this.detail)
      this.formRiwayatPasien.case = this.detail.case
      if ((this.detail.first_symptom_date !== null) && (this.detail.first_symptom_date !== 'Invalid date')) {
        this.formRiwayatPasien.first_symptom_date = await this.formatDatetime(this.detail.first_symptom_date, this.formatDate)
      } else {
        this.formRiwayatPasien.first_symptom_date = ''
      }
      if (this.formRiwayatPasien.case) {
        delete this.formRiwayatPasien['createdAt']
        delete this.formRiwayatPasien['updatedAt']
      }
      this.dialogHistoryCase = true
    },
    async handleCloseContact(id, idUniqueCase) {
      this.idCase = id
      this.idUniqueCase = idUniqueCase
      await this.getListCloseContactByCase(id)
      this.dialogCloseContact = true
    },
    async getListCloseContactByCase(id) {
      const response = await this.$store.dispatch('closeContactCase/getListCloseContactByCase', id)
      this.listCloseContact = response.data
    },
    async handleDeleteCase(item) {
      this.dialog = true
      this.dataDelete = await item
    },
    showActionButton(status) {
      if (this.roles[0] === 'dinkeskota') {
        return status === 'pending'
      } else {
        return true
      }
    },
    handleDetailFixCase(id) {
      this.$router.push(`/laporan/detail-report/${id}`)
    },
    getAge(value) {
      const yearsOld = Math.floor(value)
      const age = `${yearsOld} ${this.$t('label.year')}`
      return age
    }
  }
}
</script>
<style>
.delete {
  color: #fb2c2c !important;
}
.action-btn {
  text-transform: none !important;
  height: 30px !important;
  min-width: 80px !important;
}
.action-icon {
  color: #009D57 !important;
  font-size: 2rem !important;
}
.adjust-width {
  width: 20%;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 0.8rem !important;
}
</style>
