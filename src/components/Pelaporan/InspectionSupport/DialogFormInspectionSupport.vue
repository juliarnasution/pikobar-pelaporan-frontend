<template>
  <v-dialog v-model="showFormAddInspectionSupport" max-width="70%">
    <v-card>
      <v-container>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormAddInspectionSupport = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <ValidationObserver ref="observer">
          <v-form ref="form" lazy-validation>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.checking_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-radio-group v-model="formData.inspection_type" row>
                      <v-radio :label="$t('label.confirmation_lab')" value="lab_cofirm" />
                      <v-radio :label="$t('label.other_checks')" value="other_checks" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.specimen_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-select
                      v-model="formData.specimens_type"
                      :items="specimenType"
                      solo
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.inspection_date') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="formData.inspection_date"
                      :value-date.sync="formData.inspection_date"
                      :label="$t('label.choose_date')"
                      @changeDate="formData.inspection_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.place_testing') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="formData.inspection_location"
                      :label="$t('label.enter_place')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.collection_specimen') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" rules="noAlphabet">
                    <v-text-field
                      v-model.number="formData.get_specimens_to"
                      :label="$t('label.enter_number_takes')"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.test_results') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }">
                    <v-radio-group v-model="formData.inspection_result" :error-messages="errors" row>
                      <v-radio
                        v-if="formData.inspection_type === 'other_checks'"
                        :label="$t('label.reaktif')"
                        value="reactif"
                      />
                      <v-radio
                        v-if="formData.inspection_type === 'other_checks'"
                        :label="$t('label.non_reaktif')"
                        value="non_reactif"
                      />
                      <v-radio
                        :label="$t('label.positif')"
                        value="positif"
                      />
                      <v-radio
                        :label="$t('label.negatif')"
                        value="negatif"
                      />
                      <v-radio
                        :label="$t('label.inkonklusif')"
                        value="inkonklusif"
                      />
                      <v-radio
                        :label="$t('label.invalid')"
                        value="invalid"
                      />
                      <v-radio
                        :label="$t('label.in_process')"
                        value="on_progress"
                      />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
        <v-row>
          <v-container fluid>
            <v-row>
              <v-col class="text-right">
                <v-btn
                  :loading="loading"
                  bottom
                  @click="handleBack"
                >
                  {{ $t('label.cancel') }}
                </v-btn>
                <v-btn
                  :loading="loading"
                  class="ml-2"
                  color="success"
                  bottom
                  @click="handleSave"
                >
                  {{ isEdit ? $t('label.edit'):$t('label.save') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { specimenType } from '@/utils/constantVariable'
export default {
  name: 'DialogFormInspectionSupport',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    showDialogAddInspectionSupport: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: null
    },
    idCase: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFormAddInspectionSupport: this.showFormAddInspectionSupport,
      loading: false,
      specimenType: specimenType,
      formatDate: 'YYYY/MM/DD',
      dataCloseContact: []
    }
  },
  watch: {
    showDialogAddInspectionSupport(value) {
      this.showFormAddInspectionSupport = value
    },
    showFormAddInspectionSupport(value) {
      this.$emit('update:showFormAddInspectionSupport', value)
    }
  },
  methods: {
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormAddInspectionSupport', false)
      }
      this.$emit('update:formData', {})
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true

      if (!this.isEdit) {
        const data = {
          idCase: this.idCase,
          body: this.formData
        }
        const response = await this.$store.dispatch('inspectionSupport/postListInspectionSupport', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('inspectionSupport/resetStateInspectionSupport')
        this.$emit('update:showFormAddInspectionSupport', false)
      } else {
        const idInspectionSupport = this.formData._id
        delete this.formData['_id']
        const data = {
          idInspectionSupport: idInspectionSupport,
          body: this.formData
        }
        const response = await this.$store.dispatch('inspectionSupport/updateDetailInspectionSupport', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('inspectionSupport/resetStateInspectionSupport')
        this.$emit('update:showFormAddInspectionSupport', false)
      }
      this.$refs.observer.reset()
    }
  }
}
</script>
