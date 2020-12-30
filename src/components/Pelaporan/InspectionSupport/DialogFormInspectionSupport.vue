<template>
  <v-row justify="center">
    <v-dialog
      v-model="showFormAddInspectionSupport"
      :fullscreen="$vuetify.breakpoint.xs"
      max-width="90%"
    >
      <v-card>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormAddInspectionSupport = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <v-row class="ma-3">
          <v-container fluid>
            <ValidationObserver ref="observer">
              <v-form ref="form" lazy-validation>
                <v-container fluid>
                  <v-row align="center">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label class="required">{{ $t('label.checking_type') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <v-radio-group
                          v-model="formData.inspection_type"
                          :error-messages="errors"
                          row
                          @change="onChangeInspectionType"
                        >
                          <v-radio :label="$t('label.pcr')" value="pcr" />
                          <v-radio :label="$t('label.rapid')" value="rapid" />
                          <v-radio :label="$t('label.radiologi')" value="radiologi" />
                          <v-radio :label="$t('label.ct_scan')" value="ct_scan" />
                          <v-radio :label="$t('label.tcm_sars_cov_2')" value="tcm_sars_cov_2" />
                        </v-radio-group>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="inspectionType['inspectiontype1'].includes(formData.inspection_type)"
                    align="center"
                  >
                    <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <label class="required">{{ $t('label.specimen_type') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <v-radio-group v-model="formData.specimens_type" :error-messages="errors" row>
                          <v-radio
                            v-if="formData.inspection_type === 'rapid'"
                            :label="$t('label.blood')"
                            value="blood"
                          />
                          <v-radio v-else :label="$t('label.sputum')" value="sputum" />
                          <v-radio :label="$t('label.swab_nasofaring')" value="swab_nasofaring" />
                          <v-radio :label="$t('label.swab_orofaring')" value="swab_orofaring" />
                          <v-radio :label="$t('label.swab_naso_orofaring')" value="swab_naso_orofaring" />
                        </v-radio-group>
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
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.place_testing') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <v-row>
                        <v-col cols="12" md="9" sm="12">
                          <ValidationProvider v-slot="{ errors }">
                            <v-autocomplete
                              v-model="formData.inspection_location"
                              name="current_location_address"
                              :items="hospitalWestJavaList"
                              :error-messages="errors"
                              :return-object="false"
                              :label="$t('label.choose_place')"
                              :disabled="!formData.is_other_location"
                              menu-props="auto"
                              item-text="name"
                              item-value="name"
                              single-line
                              clearable
                              solo
                              autocomplete
                            />
                          </ValidationProvider>
                          <ValidationProvider v-if="!formData.is_other_location" v-slot="{ errors }">
                            <label>{{ $t('label.other_places') }}</label>
                            <v-text-field
                              v-model="formData.other_inspection_location"
                              name="note_nik"
                              :error-messages="errors"
                              solo-inverted
                            />
                          </ValidationProvider>
                        </v-col>
                        <v-col>
                          <v-checkbox
                            v-model="formData.is_other_location"
                            :value="formData.is_other_location"
                            :true-value="false"
                            :false-value="true"
                            :label="$t('label.other_places')"
                            class="mt-0 pt-0"
                            @change="handleChangeOtherLocation($event)"
                          />
                        </v-col>
                      </v-row>
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
                  <v-row
                    v-if="inspectionType['inspectiontype1'].includes(formData.inspection_type)"
                    align="center"
                  >
                    <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.test_results') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider v-slot="{ errors }">
                        <v-radio-group v-model="formData.inspection_result" :error-messages="errors" row>
                          <v-radio
                            v-if="testResults['testResults1'].includes(formData.inspection_type)"
                            :label="$t('label.reaktif')"
                            value="reactif"
                          />
                          <v-radio
                            v-if="testResults['testResults1'].includes(formData.inspection_type)"
                            :label="$t('label.non_reaktif')"
                            value="non_reactif"
                          />
                          <v-radio
                            v-if="testResults['testResults2'].includes(formData.inspection_type)"
                            :label="$t('label.positif')"
                            value="positif"
                          />
                          <v-radio
                            v-if="testResults['testResults2'].includes(formData.inspection_type)"
                            :label="$t('label.negatif')"
                            value="negatif"
                          />
                          <v-radio
                            v-if="testResults['testResults3'].includes(formData.inspection_type)"
                            :label="$t('label.invalid')"
                            value="invalid"
                          />
                          <v-radio
                            v-if="testResults['testResults2'].includes(formData.inspection_type)"
                            :label="$t('label.in_process')"
                            value="on_progress"
                          />
                        </v-radio-group>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row
                    v-else
                    align="center"
                  >
                    <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.test_results') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider v-slot="{ errors }">
                        <v-text-field
                          v-model.number="formData.inspection_result"
                          :label="$t('label.test_results')"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </ValidationObserver>
            <v-row>
              <v-col cols="12" lg="6" sm="6">
                <v-btn
                  :loading="loading"
                  bottom
                  block
                  @click="handleBack"
                >
                  {{ $t('label.cancel') }}
                </v-btn>
              </v-col>
              <v-col cols="12" lg="6" sm="6">
                <v-btn
                  :loading="loading"
                  color="success"
                  bottom
                  block
                  @click="handleSave"
                >
                  {{ isEdit ? $t('label.edit'):$t('label.save') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { inspectionType, testResults } from '@/utils/constantVariable'
import { specimenType } from '@/utils/constantOption'
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
      inspectionType: inspectionType,
      testResults: testResults,
      formatDate: 'YYYY/MM/DD',
      hospitalWestJavaList: [],
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
  mounted() {
    this.getListHospital()
  },
  methods: {
    onChangeInspectionType() {
      this.formData.specimens_type = ''
    },
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormAddInspectionSupport', false)
      }
      this.$emit('update:formData', {})
    },
    async getListHospital() {
      const paramHospitalWestJava = { 'rs_jabar': true }
      const responseWestJava = await this.$store.dispatch('region/getListUnitLab', paramHospitalWestJava)
      this.hospitalWestJavaList = responseWestJava.data ? responseWestJava.data : []
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
    },
    handleChangeOtherLocation() {
      this.formData.other_inspection_location = ''
    }
  }
}
</script>
