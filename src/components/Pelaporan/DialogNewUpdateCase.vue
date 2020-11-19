<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      :fullscreen="$vuetify.breakpoint.xs"
      max-width="90%"
    >
      <v-card>
        <v-card-title>
          {{ $t('label.identity') }}
          <v-spacer />
          <v-icon @click="show = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <ValidationObserver ref="observer">
          <v-form
            ref="form"
            lazy-validation
          >
            <v-row class="ml-2 mr-2">
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
            <v-row class="ml-2 mr-2">
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
                    :loading="isLoading"
                    bottom
                    block
                    @click="handleCancel"
                  >
                    {{ $t('label.cancel') }}
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :loading="isLoading"
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
      </v-card>
      <dialog-duplicated-nik
        :show-dialog="showDuplicatedNikDialog"
        :show.sync="showDuplicatedNikDialog"
        :content="nikDuplicateMessage"
      />
    </v-dialog>
  </v-row>
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
      isLoading: false,
      showDuplicatedNikDialog: false,
      nikDuplicateMessage: null,
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
      this.formPasien.status_identity = 1
      const updateCase = {
        id: this.idCase,
        data: this.formPasien
      }
      this.isLoading = true
      const response = await this.$store.dispatch('reports/updateReportCase', updateCase)
      if (response.status !== ResponseRequest.UNPROCESSABLE) {
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        await this.$store.dispatch('reports/resetFormPasien')
        await this.$store.dispatch('reports/resetRiwayatFormPasien')
        this.isLoading = false
        this.$emit('update:show', false)
        EventBus.$emit('refreshPageListReport', true)
      } else {
        this.isLoading = false
        if (response.data.data === 'nik_exists') {
          this.showDuplicatedNikDialog = true
          this.nikDuplicateMessage = response.data.message
        } else {
          await this.$store.dispatch('toast/errorToast', response.data.message)
        }
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
