<template>
  <div>
    <v-card class="disclaimer pa-7 mb-5" width="100%">
      <v-row class="mx-0 mb-2 headline">
        <div class="white--text">
          {{ $t('label.create_new_case_report') }}
        </div>
      </v-row>
      <v-row class="mx-0 mb-0">
        <span class="white--text">
          {{ $t('label.please_fill_in_form_below') }}
        </span>
      </v-row>
    </v-card>
    <v-row v-if="isFixCase" class="mx-0 mb-2">
      <div class="rejection py-2 px-7">
        <v-row justify="start">
          <v-col cols="12" sm="1">
            <v-icon x-large color="#EB5757">mdi-alert-circle</v-icon>
          </v-col>
          <v-col cols="12" sm="11">
            <v-row>
              <span class="font-weight-bold">{{ $t('label.rejection_note') }}</span>
            </v-row>
            <v-row class="mt-1">
              <span>"{{ formPasien.verified_comment }}"</span>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-row>
    <ValidationObserver ref="observer">
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="volunteerPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_volunteer_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-volunteer :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="patientPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_patient_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-patient :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="historyCasePanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_case_history_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-case-history :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="multipleSupportingInvestigationPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.supporting_investigation') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-multiple-supporting-investigation :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="travelHistoryFactorPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.travel_history_factor') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-multiple-travel-history-factor :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="contactFactorPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_eposure_factor_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-multiple-contact-factor :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="historySocioeconomicPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_socioeconomic_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-socioeconomic-history :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row v-if="!isFixCase">
        <v-col auto>
          <v-expansion-panels
            v-model="multipleCloseContactPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_close_contact_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-multiple-close-contact :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </ValidationObserver>
    <dialog-duplicated-nik
      :show-dialog="showDuplicatedNikDialog"
      :show.sync="showDuplicatedNikDialog"
      :content="nikDuplicateMessage"
    />
    <v-container fluid>
      <v-row class="survey-bottom-form">
        <v-col class="text-right">
          <v-btn color="success" :loading="loading" bottom class="ml-2" @click="saveData">
            {{ isFixCase ? $t('label.fix_case'):$t('label.save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { validateScrollUp } from '@/utils/utilsFunction'
import { formatDatetime } from '@/utils/parseDatetime'
import { mapGetters } from 'vuex'
import { rolesPerm, ResponseRequest } from '@/utils/constantVariable'

export default {
  components: {
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      showDuplicatedNikDialog: false,
      isFixCase: false,
      formatDate: 'YYYY/MM/DD',
      nikDuplicateMessage: null,
      volunteerPanel: [0],
      patientPanel: [0],
      historyCasePanel: [0],
      historySocioeconomicPanel: [0],
      travelHistoryFactorPanel: [0],
      multipleSupportingInvestigationPanel: [0],
      contactFactorPanel: [0],
      multipleCloseContactPanel: [0]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName',
      'phoneNumber'
    ]),
    ...mapGetters('reports', [
      'formPasien'
    ])
  },
  async mounted() {
    this.$store.dispatch('reports/resetFormPasien')
    this.formPasien.interviewers_name = this.fullName
    this.formPasien.interviewers_phone_number = this.phoneNumber
    this.formPasien.interview_date = this.$moment().format()
    const idData = this.$route.params.id
    this.showDuplicatedNikDialog = false
    if (idData !== undefined) {
      const response = await this.$store.dispatch('reports/detailReportCase', idData)
      this.isFixCase = true
      await Object.assign(this.formPasien, response.data)
      await Object.assign(this.formPasien, response.data.last_history)
      if (response.data.birth_date !== null) {
        this.formPasien.birth_date = await this.formatDatetime(response.data.birth_date, this.formatDate)
      } else {
        this.formPasien.birth_date = ''
      }
      if (response.data.age !== null) {
        this.formPasien.yearsOld = Math.floor(response.data.age)
        this.formPasien.monthsOld = Math.ceil((response.data.age - Math.floor(response.data.age)) * 12)
      }
      if (this.formPasien._id) {
        delete this.formPasien['author']
        delete this.formPasien['createdAt']
        delete this.formPasien['updatedAt']
        delete this.formPasien['last_history']
      }
    }
  },
  methods: {
    validateScrollUp,
    formatDatetime,
    async saveData() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.validateScrollUp()
        return
      }
      delete this.formPasien['_id']
      delete this.formPasien['id_case']
      try {
        this.formPasien.input_source = 'form app'
        let response
        if (!this.isFixCase) {
          response = await this.$store.dispatch('reports/createRevampReportCase', this.formPasien)
        } else {
          const data = {
            id: this.$route.params.id,
            data: this.formPasien
          }
          response = await this.$store.dispatch('reports/correctCaseReport', data)
        }
        if (response.status !== ResponseRequest.UNPROCESSABLE) {
          await this.$store.dispatch('toast/successToast', this.$t('success.create_data_success'))
          await this.$store.dispatch('reports/resetFormPasien')
          if ((this.roles[0] === rolesPerm.FASKES) || (this.isFixCase)) {
            await this.$router.push('/laporan/verification')
          } else {
            await this.$router.push('/laporan/list')
          }
        } else {
          if (response.data.data === 'nik_exists') {
            this.isLoading = false
            this.showDuplicatedNikDialog = true
            this.nikDuplicateMessage = response.data.message
          } else {
            await this.$store.dispatch('toast/errorToast', response.data.message)
          }
        }
      } catch (error) {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
.disclaimer {
  background: linear-gradient(78.54deg, #27AE60 0%, #6FCF97 100%) !important;
}
</style>

