<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      :fullscreen="$vuetify.breakpoint.xs"
      max-width="90%"
    >
      <v-skeleton-loader
        :loading="isLoading"
        type="table-tbody"
      >
        <v-card>
          <v-card-title :class="{'subtitle-1': $vuetify.breakpoint.xs}">
            {{ titleDetail }}
            <v-spacer />
            <v-icon @click="show = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <table-history-case
            :list-history-case="listHistoryCase"
            :handle-update-report="handleUpdateReport"
            :handle-delete="handleDelete"
          />
          <v-card
            min-height="100"
            class="ml-6 mr-6 mt-2 border-card"
            @click="handleCreate"
          >
            <v-container
              fill-height
              fluid
            >
              <v-row
                align="center"
                justify="center"
              >
                <div align="center" class="mt-2">
                  <div>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </div>
                  <div>{{ $t('label.patient_condition_update') }}</div>
                </div>
              </v-row>
            </v-container>
          </v-card>
          <v-row class="ml-3 mr-3 mb-3">
            <v-col>
              <v-btn
                color="#FFFFFF"
                block
                @click="show = false"
              >
                {{ $t('label.back') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-skeleton-loader>
      <dialog-update-history-case
        :show-dialog="showFormHistoryCase"
        :show.sync="showFormHistoryCase"
        :is-edit="isEditHistoryCase"
        :edit.sync="isEditHistoryCase"
        :form-riwayat-pasien="formRiwayatPasien"
        :form-pasien="detailCase"
      />
      <dialog-delete
        :dialog="dialogDelete"
        :dialog-delete.sync="dialogDelete"
        :data-deleted="dataDelete"
        :delete-date.sync="dataDelete"
        :store-path-delete="`reports/deleteHistoryCase`"
      />
    </v-dialog>
  </v-row>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { mapGetters } from 'vuex'

export default {
  name: 'DialogListHistoryCase',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    detailCase: {
      type: Object,
      default: null
    },
    listHistoryCase: {
      type: Array,
      default: function() { return [] }
    },
    idCase: {
      type: String,
      default: ''
    },
    titleDetail: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: this.showDialog,
      isEditHistoryCase: false,
      isLoading: false,
      // listHistoryCase: [],
      dialogDecline: false,
      showFormHistoryCase: false,
      idCloseContact: null,
      dialogDelete: false,
      dataDelete: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName',
      'district_user',
      'district_name_user'
    ]),
    ...mapGetters('reports', [
      'formRiwayatPasien'
    ])
  },
  watch: {
    async showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    },
    async showFormHistoryCase(value) {
      this.$emit('update:refreshListHistoryCase', true)
    },
    async dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        this.$emit('update:refreshListHistoryCase', true)
      }
    }
  },
  methods: {
    formatDatetime,
    async handleCreate() {
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      this.getDetailLastHistory(this.$route.params.id)
      this.isEditHistoryCase = false
      this.showFormHistoryCase = true
    },
    async handleUpdateReport(item) {
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      item.address_district_code = this.detailCase.address_district_code
      item.address_subdistrict_code = this.detailCase.address_subdistrict_code
      item.address_village_code = this.detailCase.address_village_code
      item.address_village_name = this.detailCase.address_village_name
      item.address_street = this.detailCase.address_street
      Object.assign(this.formRiwayatPasien, item)
      this.formRiwayatPasien.case = this.detailCase
      this.isEditHistoryCase = true
      this.showFormHistoryCase = true
    },
    async getDetailLastHistory(id) {
      const response = await this.$store.dispatch('reports/detailHistoryCase', id)
      if (response) {
        response.address_district_code = this.detailCase.address_district_code
        response.address_subdistrict_code = this.detailCase.address_subdistrict_code
        response.address_village_code = this.detailCase.address_village_code
        response.address_village_name = this.detailCase.address_village_name
        response.address_street = this.detailCase.address_street
      }
      Object.assign(this.formRiwayatPasien, response)
      this.formRiwayatPasien.case = this.detailCase
      if ((this.formRiwayatPasien.first_symptom_date !== null) && (this.formRiwayatPasien.first_symptom_date !== 'Invalid date')) {
        this.formRiwayatPasien.first_symptom_date = await this.formatDatetime(this.formRiwayatPasien.first_symptom_date, this.formatDate)
      } else {
        this.formRiwayatPasien.first_symptom_date = ''
      }
      if (this.formRiwayatPasien.case) {
        delete this.formRiwayatPasien['createdAt']
        delete this.formRiwayatPasien['updatedAt']
      }
    },
    async handleDelete(item) {
      if (item) {
        this.dialogDelete = true
        this.dataDelete = item
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.contact_data_cannot_be_deleted'))
      }
    }
  }
}
</script>
<style scoped>
   .border-card {
      color: #828282;
      border: 1px dashed #E0E0E0 !important;
      box-sizing: border-box !important;
      border-radius: 8px !important;
   }
</style>
