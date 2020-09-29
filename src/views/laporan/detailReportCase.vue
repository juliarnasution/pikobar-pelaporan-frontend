<template>
  <div>
    <v-container>
      <v-row @click="backPage">
        <v-icon>mdi-arrow-left</v-icon>
        {{ $t('label.back') }}
      </v-row>
    </v-container>
    <v-card class="pa-1 mt-2 mx-auto header-survey-list">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="12" md="8" sm="8">
            <v-card-text class="font-weight-bold">
              <v-card-title class="text-header-close-contact">
                {{ detail.id_case ? detail.id_case.toUpperCase() +' • '+ detail.name+' • '+detail.nik:'' }}
              </v-card-title>
              <v-card-subtitle class="text-sub-header-close-contact">
                {{ $t('label.complete_history_and_patient_information_below') }}
              </v-card-subtitle>
            </v-card-text>
          </v-col>
          <v-col>
            <div class="background-card">
              <v-btn
                class="float-right mt-8"
                style="height: 40px;min-width: 80px;"
              >
                <div style="color: #6FCF97;">
                  <v-icon>mdi-plus</v-icon>
                  {{ $t('label.case_report_verification') }}
                </div>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleUpdateCase"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">{{ $t('label.form_patient_title') }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">{{ $t('label.medical_personnel_data_patient_identity_patient_criteria') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#6FCF97"
              >
                {{ $t('label.complete') }}
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleUpdateHistoryCase"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">{{ $t('label.clinical_information') }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">{{ $t('label.case_history_data_and_patient_clinical_info') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#6FCF97"
              >
                {{ $t('label.complete') }}
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleInspectionSupport"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">{{ $t('label.supporting_information') }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">{{ $t('label.supporting_information_data_and_patient_test_results') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                {{ $t('label.incomplete') }}
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleHistoryTravel"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">{{ $t('label.travel_history') }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">{{ $t('label.history_of_patient_travel_abroad_out_of_town') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                {{ $t('label.incomplete') }}
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleContactFactor"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">{{ $t('label.exposure_factor') }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">{{ $t('label.patient_external_exposure_factor_information_data') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                {{ $t('label.incomplete') }}
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleCloseContact"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">{{ $t('label.related_ontacts') }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">{{ $t('label.patient_related_contact_information_data') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                {{ $t('label.incomplete') }}
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col />
      </v-row>
    </v-container>
    <dialog-new-update-case
      :show-dialog="dialogUpdateCase"
      :show.sync="dialogUpdateCase"
      :id-case="this.$route.params.id"
      :form-pasien="detail"
    />
    <dialog-update-history-case
      :show-dialog="dialogHistoryCase"
      :show.sync="dialogHistoryCase"
      :form-riwayat-pasien="formRiwayatPasien"
      :form-pasien="detail"
    />
    <dialog-close-contact
      :show-dialog="dialogCloseContact"
      :show.sync="dialogCloseContact"
      :list-close-contact.sync="listCloseContact"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :id-unique-case="detail ? detail.id_case:''"
      :unique-case-id.sync="idUniqueCase"
      :title-detail="$t('label.distribution_case_network')"
    />
    <dialog-transmission-area-local
      :show-dialog="dialogTransmissionArea"
      :show.sync="dialogTransmissionArea"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :title-detail="$t('label.local_transmission_area_history_list')"
    />
    <dialog-contact-factor
      :show-dialog="dialogContactFactor"
      :show.sync="dialogContactFactor"
      :id-case="this.$route.params.id"
      :form-pasien="detail"
    />
    <dialog-tab-history-travel
      :show-dialog="dialogHistoryTravel"
      :show.sync="dialogHistoryTravel"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :form-pasien="detail"
      :title-detail="$t('label.travel_history')"
    />
    <dialog-public-place
      :show-dialog="dialogPublicPlace"
      :show.sync="dialogPublicPlace"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :title-detail="$t('label.list_public_place_history')"
    />
    <dialog-inspection-support
      :show-dialog="dialogInspectionSupport"
      :show.sync="dialogInspectionSupport"
      :id-case="this.$route.params.id"
      :is-complete-data="true"
      :form-pasien="detail"
      :case-id.sync="idCase"
      :title-detail="$t('label.list_inspection_support')"
    />
  </div>
</template>

<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { mapGetters } from 'vuex'
export default {
  name: 'DetailReportCase',
  data() {
    return {
      detail: {},
      idCase: '',
      idUniqueCase: '',
      formatDate: 'YYYY/MM/DD',
      listCloseContact: [],
      dialogUpdateCase: false,
      dialogHistoryCase: false,
      dialogCloseContact: false,
      dialogTransmissionArea: false,
      dialogHistoryTravel: false,
      dialogInspectionSupport: false,
      dialogContactFactor: false,
      dialogPublicPlace: false
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formRiwayatPasien'
    ]),
    ...mapGetters('user', [
      'roles',
      'fullName',
      'district_user'
    ])
  },
  watch: {
    'dialogCloseContact': function(value) {
      if (!value) {
        this.getListCloseContactByCase(this.$route.params.id)
      }
    }
  },
  async mounted() {
    await this.detailCase()
  },
  methods: {
    formatDatetime,
    async detailCase() {
      const response = await this.$store.dispatch('reports/detailReportCase', this.$route.params.id)
      if (response.data !== null) {
        this.detail = response.data
        if (response.data.birth_date !== null) {
          this.detail.birth_date = await this.formatDatetime(response.data.birth_date, this.formatDate)
        } else {
          this.detail.birth_date = ''
        }
        if (response.data.age !== null) {
          this.detail.yearsOld = Math.floor(response.data.age)
          this.detail.monthsOld = Math.ceil((response.data.age - Math.floor(response.data.age)) * 12)
        }
        if (this.detail._id) {
          delete this.detail['author']
          delete this.detail['createdAt']
          delete this.detail['updatedAt']
          delete this.detail['last_history']
        }
      }
    },
    backPage() {
      this.$router.push('/laporan/list')
    },
    async handleUpdateCase() {
      this.dialogUpdateCase = true
    },
    async handleUpdateHistoryCase() {
      const response = await this.$store.dispatch('reports/detailHistoryCase', this.$route.params.id)
      if (response) {
        response.address_district_code = this.detail.address_district_code
        response.address_subdistrict_code = this.detail.address_subdistrict_code
        response.address_village_code = this.detail.address_village_code
        response.address_village_name = this.detail.address_village_name
        response.address_street = this.detail.address_street
      }
      Object.assign(this.formRiwayatPasien, response)
      this.formRiwayatPasien.case = this.detail
      if ((this.formRiwayatPasien.first_symptom_date !== null) && (this.formRiwayatPasien.first_symptom_date !== 'Invalid date')) {
        this.formRiwayatPasien.first_symptom_date = await this.formatDatetime(this.formRiwayatPasien.first_symptom_date, this.formatDate)
      } else {
        this.formRiwayatPasien.first_symptom_date = ''
      }
      if (this.formRiwayatPasien.case) {
        delete this.formRiwayatPasien['createdAt']
        delete this.formRiwayatPasien['updatedAt']
      }
      this.dialogHistoryCase = true
    },
    async handleCloseContact() {
      await this.getListCloseContactByCase(this.$route.params.id)
      this.dialogCloseContact = true
    },
    async getListCloseContactByCase(id) {
      const response = await this.$store.dispatch('closeContactCase/getListCloseContactByCase', id)
      this.listCloseContact = response.data
    },
    async handleHistoryTravel() {
      this.idCase = this.$route.params.id
      this.dialogHistoryTravel = true
    },
    async handleContactFactor() {
      this.idCase = this.$route.params.id
      this.dialogContactFactor = true
    },
    async handleTransmissionArea() {
      this.idCase = this.$route.params.id
      this.dialogTransmissionArea = true
    },
    async handleInspectionSupport() {
      this.idCase = this.$route.params.id
      this.dialogInspectionSupport = true
    },
    async handlePublicPlace() {
      this.idCase = this.$route.params.id
      this.dialogPublicPlace = true
    }
  }
}
</script>
<style scoped>
  .text-header-close-contact {
    color: #FFFF !important;
    font-size: 1.4rem;
  }
  .text-sub-header-close-contact {
    color: #FFFF !important;
    font-size: 1rem;
  }
  .background-card {
      background-image: url('../../static/survey-list-icon.svg');
      min-height: 100%;
      float: right;
  }
</style>
