<template>
  <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" max-width="90%">
    <v-skeleton-loader
      :loading="isLoading"
      type="table-tbody"
    >
      <v-card>
        <v-container>
          <v-card-title :class="{'subtitle-1': $vuetify.breakpoint.xs}">
            {{ titleDetail }}
            <v-spacer />
            <v-icon @click="show = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <table-history-case
            :list-history-case="listHistoryCase"
            :handle-update-report="handleUpdateReport"
          />
          <v-card
            min-height="100"
            class="mx-auto mt-2 border-card"
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
                  <div>{{ $t('label.add_history') }}</div>
                </div>
              </v-row>
            </v-container>
          </v-card>
          <v-row class="mb-3">
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
        </v-container>
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
  </v-dialog>
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
      listHistoryCase: [],
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
    showDialog(value) {
      this.show = value
      if (value) {
        this.getListHistoryCase(this.idCase)
      }
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    },
    showFormHistoryCase(value) {
      if (!value) {
        this.getListHistoryCase(this.idCase)
      }
    },
    dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        this.getListHistoryCase(this.idCase)
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
    async getListHistoryCase(id) {
      const response = await this.$store.dispatch('reports/listHistoryCase', id)
      if (response !== undefined) {
        this.listHistoryCase = response
      }
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
