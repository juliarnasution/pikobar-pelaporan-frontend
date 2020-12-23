<template>
  <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" max-width="90%">
    <v-card>
      <v-card-title>
        {{ $t('label.patient_status_update') }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-container fluid>
        <ValidationObserver ref="observer">
          <v-form ref="form" lazy-validation>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label class="required">{{ $t('label.criteria') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-radio-group
                    v-model="formPasien.status"
                    name="status"
                    :error-messages="errors"
                    row
                    @change="handleChangeCriteria"
                  >
                    <v-radio :label="$t('route.tight_contact')" value="CLOSECONTACT" />
                    <v-radio :label="$t('label.suspect')" value="SUSPECT" />
                    <v-radio :label="$t('label.probable')" value="PROBABLE" />
                    <v-radio :label="$t('label.confirmation')" value="CONFIRMATION" />
                  </v-radio-group>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row v-if="formPasien.status.length > 1" align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label class="required">{{ $t('label.latest_patient_status') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-radio-group v-model="formPasien.final_result" name="final_result" :error-messages="errors" row>
                    <v-radio
                      v-if="rolesCriteria['stillQuarantine'].includes(formPasien.status)"
                      :label="$t('label.still_quarantine')"
                      value="5"
                    />
                    <v-radio
                      v-if="rolesCriteria['stillSick'].includes(formPasien.status)"
                      :label="$t('label.still_sick')"
                      value="4"
                    />
                    <v-radio
                      v-if="rolesCriteria['recovery'].includes(formPasien.status)"
                      :label="$t('label.recovery')"
                      value="1"
                    />
                    <v-radio
                      v-if="rolesCriteria['discarded'].includes(formPasien.status)"
                      :label="$t('label.discarded')"
                      value="3"
                    />
                    <v-radio
                      v-if="!rolesCriteria['discarded'].includes(formPasien.status)"
                      :label="$t('label.dead')"
                      value="2"
                    />
                  </v-radio-group>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label class="required">{{ $t('label.date_last_status') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <input-date-picker
                  name="last_date_status_patient"
                  :format-date="formatDate"
                  :date-value="formPasien.last_date_status_patient"
                  :value-date.sync="formPasien.last_date_status_patient"
                  :label="$t('label.select_date_last_status')"
                  :required="true"
                  @changeDate="formPasien.last_date_status_patient = $event"
                />
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
                    {{ $t('label.status_update') }}
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { rolesCriteria, ResponseRequest } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'DialogUpdateStatusCase',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    selectedCase: {
      type: Array,
      default: function() { return [] }
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
      rolesCriteria: rolesCriteria
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  async mounted() {
    //
  },
  methods: {
    async handleUpdateCase() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      const id_case = this.selectedCase.map(function(item) { return item._id })
      const updateMultipleCase = {
        id_case: id_case,
        status: this.formPasien.status,
        final_result: this.formPasien.final_result,
        last_date_status_patient: this.formPasien.last_date_status_patient
      }
      this.loading = true
      const response = await this.$store.dispatch('reports/updateMultipleStatusCase', updateMultipleCase)
      if (response.status !== ResponseRequest.UNPROCESSABLE) {
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        this.loading = false
        this.$refs.observer.reset()
        this.$emit('update:show', false)
        this.$emit('update:refreshPage', true)
      } else {
        this.loading = false
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
      }
    },
    handleChangeCriteria() {
      this.formPasien.final_result = ''
    },
    async handleCancel() {
      this.$emit('update:show', false)
    }
  }
}
</script>
