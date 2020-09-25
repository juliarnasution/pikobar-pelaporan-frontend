<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-card-title>
        {{ $t('label.identity') }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-container>
        <ValidationObserver ref="observer">
          <v-form
            ref="form"
            lazy-validation
          >
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
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-btn
                    :loading="loading"
                    bottom
                    block
                    @click="handleCancel"
                  >
                    {{ $t('label.cancel') }}
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :loading="loading"
                    class="ml-2"
                    color="success"
                    bottom
                    block
                    @click="handleUpdateCase"
                  >
                    {{ $t('label.change_patent_data') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { getAgeWithMonth, ResponseRequest } from '@/utils/constantVariable'
import { formatDatetime } from '@/utils/parseDatetime'
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'

export default {
  name: 'DialogNewUpdateCase',
  components: {
    ValidationObserver
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    idCase: {
      type: String,
      default: ''
    },
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      show: this.showDialog,
      formatDate: 'YYYY/MM/DD',
      volunteerPanel: [1],
      patientPanel: [0],
      listCountry: [],
      listHistoryCase: null,
      listQuery: {
        'name': ''
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ]),
    ...mapGetters('occupation', [
      'occupationList'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    },
    'formPasien.birth_date': function(value) {
      if (value !== null && value.length > 0) {
        const age = this.getAgeWithMonth(value)
        this.formPasien.yearsOld = age.year
        this.formPasien.monthsOld = age.month
        this.formPasien.age = Number((this.formPasien.yearsOld + (this.formPasien.monthsOld / 12)).toFixed(2))
      }
    },
    'formPasien.yearsOld'(value) {
      if (this.formPasien.monthsOld !== '') {
        this.formPasien.age = Number((Number(this.formPasien.yearsOld) + (Number(this.formPasien.monthsOld) / 12)).toFixed(2))
      } else {
        this.formPasien.age = Number(this.formPasien.yearsOld)
      }
    },
    'formPasien.monthsOld'(value) {
      if (this.formPasien.yearsOld !== '') {
        this.formPasien.age = Number((Number(this.formPasien.yearsOld) + (Number(this.formPasien.monthsOld) / 12)).toFixed(2))
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('occupation/getListOccuption')
    const response = await this.$store.dispatch('region/listCountry')
    this.listCountry = response.data
    this.formPasien.yearsOld = Math.floor(this.formPasien.age)
    this.formPasien.monthsOld = Math.ceil((this.formPasien.age - Math.floor(this.formPasien.age)) * 12)
  },
  methods: {
    getAgeWithMonth,
    formatDatetime,
    async handleUpdateCase() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      delete this.formPasien['_id']
      const updateCase = {
        id: this.idCase,
        data: this.formPasien
      }
      this.loading = true
      const response = await this.$store.dispatch('reports/updateReportCase', updateCase)
      if (response.status !== ResponseRequest.UNPROCESSABLE) {
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        await this.$store.dispatch('reports/resetFormPasien')
        await this.$store.dispatch('reports/resetRiwayatFormPasien')
        this.loading = false
        this.$emit('update:show', false)
        EventBus.$emit('refreshPageListReport', true)
      } else {
        this.loading = false
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
      }
    },
    async handleCancel() {
      await this.$store.dispatch('reports/resetFormPasien')
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      this.$emit('update:show', false)
    },
    handleChangeNationality(value) {
      if (value === 'WNI') {
        this.formPasien.nationality_name = ''
      }
    },
    handleChangeRelatedCase(value) {
      this.formPasien.id_case_related = value.id_case
      this.formPasien.name_case_related = value.name
    }
  }
}
</script>
