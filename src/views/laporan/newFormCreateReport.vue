<template>
  <div>
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
                <form-volunteer :form-pasien="formPasienV2" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="criteriaPatientPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.patient_criteria') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-criteria-patient :form-pasien="formPasienV2" />
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
                <form-patient :form-pasien="formPasienV2" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </ValidationObserver>
    <v-container fluid>
      <v-row class="survey-bottom-form">
        <v-col class="text-right">
          <v-btn color="success" :loading="loading" bottom class="ml-2" @click="onSave">
            {{ isFixCase ? $t('label.fix_case'):$t('label.save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { rolesPerm, ResponseRequest } from '@/utils/constantVariable'
import { validateScrollUp } from '@/utils/utilsFunction'
import { ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  components: {
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      isFixCase: false,
      volunteerPanel: [0],
      criteriaPatientPanel: [0],
      patientPanel: [0]
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formPasienV2'
    ]),
    ...mapGetters('user', [
      'roles',
      'fullName',
      'phoneNumber',
      'district_user'
    ])
  },
  async mounted() {
    this.$store.dispatch('reports/resetFormPasienV2')
    this.formPasienV2.interviewers_name = this.fullName
    this.formPasienV2.interviewers_phone_number = this.phoneNumber
    this.formPasienV2.interview_date = this.$moment().format()
  },
  methods: {
    validateScrollUp,
    async onSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.validateScrollUp()
        return
      }
      if ((!this.isFixCase) && (this.formPasienV2.nik)) {
        this.loading = true
        const response = await this.$store.dispatch('reports/revampGetNik', { params: this.formPasienV2.nik })
        if (response.data) {
          this.loading = false
          this.nikNumber = this.formPasienV2.nik
          this.nikName = this.formPasienV2.name
          this.showDuplicatedNikDialog = true
          return
        }
      }
      delete this.formPasienV2['_id']
      delete this.formPasienV2['id_case']
      try {
        this.formPasienV2.input_source = 'form app'
        let response
        if (!this.isFixCase) {
          response = await this.$store.dispatch('reports/createReportCaseV2', this.formPasienV2)
        } else {
          const data = {
            id: this.$route.params.id,
            data: this.formPasienV2
          }
          response = await this.$store.dispatch('reports/correctCaseReport', data)
        }
        if (response.status !== ResponseRequest.UNPROCESSABLE) {
          await this.$store.dispatch('toast/successToast', this.$t('success.create_data_success'))
          await this.$store.dispatch('reports/resetFormPasien')
          if ((this.roles[0] === rolesPerm.FASKES) || (this.isFixCase)) {
            await this.$router.push('/laporan/verification')
          } else {
            this.$router.push(`/laporan/detail-report/${response.data._id}`)
          }
        } else {
          await this.$store.dispatch('toast/errorToast', response.message)
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
