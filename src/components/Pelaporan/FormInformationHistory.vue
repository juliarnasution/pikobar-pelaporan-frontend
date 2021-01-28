<template>
  <v-container>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'mb-3': $vuetify.breakpoint. smAndDown}"
          >
            <v-icon class="rotate" color="#27AE60" left>mdi-color-helper</v-icon><label class="subtitle text-uppercase">{{ $t('label.case_status') }}</label>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="required">{{ $t('label.criteria') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-radio-group
                v-model="formPasien.status"
                :error-messages="errors"
                row
              >
                <v-radio
                  :label="$t('label.OTG')"
                  value="OTG"
                />
                <v-radio
                  :label="$t('label.ODP')"
                  value="ODP"
                />
                <v-radio
                  :label="$t('label.PDP')"
                  value="PDP"
                />
                <v-radio
                  :label="$t('label.positif').toUpperCase()"
                  value="POSITIF"
                />
              </v-radio-group>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="required">{{ $t('label.stages') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-radio-group
                v-model="formPasien.stage"
                :error-messages="errors"
                row
              >
                <v-radio
                  :label="$t('label.process')"
                  value="0"
                />
                <v-radio
                  :label="$t('label.done')"
                  value="1"
                />
              </v-radio-group>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row
          v-if="formPasien.stage === '1'"
          align="center"
        >
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.results') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
            >
              <v-radio-group
                v-model="formPasien.final_result"
                :error-messages="errors"
                row
              >
                <v-radio
                  v-if="formPasien.status !== 'POSITIF'"
                  :label="$t('label.negatif')"
                  value="0"
                  @click.prevent="uncheck('0')"
                />
                <v-radio
                  :label="$t('label.recovery')"
                  value="1"
                  @click.prevent="uncheck('1')"
                />
                <v-radio
                  :label="$t('label.dead')"
                  value="2"
                  @click.prevent="uncheck('2')"
                />
              </v-radio-group>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row
          align="center"
        >
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="required">{{ $t('label.current_location') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-radio-group
                v-model="formPasien.current_location_type"
                :error-messages="errors"
                row
                @change="handleChangeLocationNow"
              >
                <v-radio
                  :label="$t('label.home')"
                  value="RUMAH"
                />
                <v-radio
                  :label="$t('label.hospital')"
                  value="RS"
                />
                <v-radio
                  :label="$t('label.other_places')"
                  value="others"
                />
              </v-radio-group>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="additional-label">({{ $t('label.house_address') }})</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <address-region
              :district-code="formPasien.current_location_district_code"
              :code-district.sync="formPasien.current_location_district_code"
              :sub-district-code="formPasien.current_location_subdistrict_code"
              :code-sub-district.sync="formPasien.current_location_subdistrict_code"
              :village-code="formPasien.current_location_village_code"
              :village-name="formPasien.current_location_village_name"
              :code-village.sync="formPasien.current_location_village_code"
              :name-village.sync="formPasien.current_location_village_name"
              :disabled-address="false"
              :required-address="true"
            />
          </v-col>
        </v-row>
        <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="additional-label">({{ $t('label.complete_house_address') }})</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-text-field
                v-model="formPasien.current_location_address"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row v-if="formPasien.current_location_type === 'RS'" align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="additional-label">({{ $t('label.location_hospital') }})</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                v-model="formPasien.current_location_address"
                :items="hospitalWestJavaList"
                :error-messages="errors"
                :return-object="true"
                :label="$t('label.location_hospital')"
                menu-props="auto"
                item-text="name"
                item-value="name"
                single-line
                solo
                autocomplete
                @change="onSelectHospital"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row v-if="formPasien.current_location_type === 'others'" align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="additional-label">({{ $t('label.other_places') }})</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-if="formPasien.current_location_type === 'others'"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                v-model="formPasien.current_location_address"
                :items="hospitalNonWestJavaList"
                :error-messages="errors"
                :return-object="true"
                :label="$t('label.others')"
                menu-props="auto"
                item-text="name"
                item-value="name"
                single-line
                solo
                autocomplete
                @change="onSelectHospital"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.reporting_sources') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formPasien.report_source"
                :error-messages="errors"
                :disabled="disabledReportResource"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <hr>
        <v-row>
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'mb-3': $vuetify.breakpoint. smAndDown}"
          >
            <v-icon class="rotate" color="#27AE60" left>mdi-color-helper</v-icon><label class="subtitle text-uppercase">{{ $t('label.history_and_symptoms') }}</label>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.history') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-checkbox
                v-model="formPasien.is_went_abroad"
                label="Dari Luar Negeri"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.is_went_abroad === true"
              v-slot="{ errors }"
              rules="required"
            >
              <v-text-field
                v-model="formPasien.visited_country"
                :error-messages="errors"
                :placeholder="$t('label.country_visited')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-checkbox
                v-model="formPasien.is_went_other_city"
                :label="$t('label.trip_outside_the_city')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.is_went_other_city === true"
              v-slot="{ errors }"
              rules="required"
            >
              <v-text-field
                v-model="formPasien.visited_city"
                :error-messages="errors"
                :placeholder="$t('label.city_visited')"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-checkbox
                v-model="formPasien.is_contact_with_positive"
                :label="$t('label.contact_with_positive_patients')"
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.history_notes"
                :placeholder="$t('label.enter_other_history_applicable')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.date_symptoms') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <select-datetime
              :datetime="formPasien.first_symptom_date"
              :date-time.sync="formPasien.first_symptom_date"
              :formate-date="formatDate"
            />
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.symptoms') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider v-slot="{ errors }">
              <v-row>
                <v-col v-for="item in symptomOptions" :key="item" cols="12" sm="4" md="4">
                  <label class="material-checkbox-custom">
                    <input
                      v-model="formPasien.diagnosis"
                      :value="item"
                      type="checkbox"
                    >
                    <span v-if="errors.length" class="error--text">{{ item }}</span>
                    <span v-else>{{ item }}</span>
                  </label>
                  <span
                    v-if="errors.length"
                    class="v-messages error--text"
                  >{{ errors[0] }}</span>
                </v-col>
              </v-row>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="start" class="mt-4">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          />
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.diagnosis_other"
                :placeholder="$t('label.mention_other_symptoms')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.additional_condition') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider v-slot="{ errors }">
              <v-row>
                <v-col v-for="item in additionalConditionOptions" :key="item" cols="12" sm="4" md="4">
                  <label class="material-checkbox-custom">
                    <input
                      v-model="formPasien.diseases"
                      :value="item"
                      type="checkbox"
                    >
                    <span v-if="errors.length" class="error--text">{{ item }}</span>
                    <span v-else>{{ item }}</span>
                  </label>
                  <span
                    v-if="errors.length"
                    class="v-messages error--text"
                  >{{ errors[0] }}</span>
                </v-col>
              </v-row>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="start" class="mt-4">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          />
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.diseases_other"
                :placeholder="$t('label.mention_other_additional_condition')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.postscript') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-textarea
                v-model="formPasien.other_notes"
                solo
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row
            v-if="!patientReferral"
            class="survey-bottom-form"
            justify="space-between"
          >
            <v-col cols="12" md="6" sm="12" :class="{'mb-2': $vuetify.breakpoint.smAndDown}" class="ma-0 pa-0">
              <v-btn
                :loading="loading"
                bottom
                outlined
                @click="backStep()"
              >
                {{ $t('label.back') }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" sm="12" :class="{'text-right': $vuetify.breakpoint.mdAndUp}" class="ma-0 pa-0">
              <v-btn
                color="success"
                :loading="loading"
                bottom
                @click="handleSave"
              >
                {{ $t('label.save') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { symptomOptions, additionalConditionOptions } from '@/utils/constantOption'
import { mapGetters } from 'vuex'
export default {
  name: 'FormInformationHistory',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    steps: {
      type: Number,
      default: null
    },
    formPasien: {
      type: Object,
      default: null
    },
    patientReferral: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      symptomOptions: symptomOptions,
      formatDate: 'YYYY/MM/DD',
      disabledReportResource: false,
      hospitalWestJavaList: [],
      hospitalNonWestJavaList: [],
      additionalConditionOptions: additionalConditionOptions
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  async mounted() {
    const paramHospitalWestJava = { 'rs_jabar': true }
    const paramHospitalNonWestJava = { 'rs_jabar': false }
    const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
    const responseNonWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalNonWestJava)
    this.hospitalWestJavaList = responseWestJava.data ? responseWestJava.data : []
    this.hospitalNonWestJavaList = responseNonWestJava.data ? responseNonWestJava.data : []
    if (this.roles[0] === 'faskes') {
      this.formPasien.report_source = this.fullName
      this.disabledReportResource = true
    }
  },
  methods: {
    backStep() {
      EventBus.$emit('backSurveySteps', this.steps)
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      if (this.formPasien.stage === '0') {
        this.formPasien.final_result = ''
      }
      const response = await this.$store.dispatch('reports/createReportCase', this.formPasien)
      if (response.status !== 422) {
        await this.$store.dispatch('reports/resetFormPasien')
        await this.$store.dispatch('toast/successToast', this.$t('success.create_data_success'))
        if (this.roles[0] === 'faskes') {
          await this.$router.push('/laporan/verification')
        } else {
          await this.$router.push('/laporan/list')
        }
        await this.$refs.form.reset()
      }
      this.loading = false
    },
    onSelectHospital(value) {
      this.formPasien.current_hospital_id = value._id || null
      this.formPasien.current_location_address = value.name || null
    },
    uncheck(value) {
      if (value === this.formPasien.final_result) {
        this.formPasien.final_result = ''
      } else {
        this.formPasien.final_result = value
      }
    },
    handleChangeLocationNow(value) {
      if (value === 'RUMAH') {
        this.formPasien.current_location_address = ''
      } else {
        this.formPasien.current_hospital_id = null
        this.formPasien.current_location_address = ''
        this.formPasien.current_location_district = ''
        this.formPasien.current_location_subdistrict = ''
        this.formPasien.current_location_village = ''
      }
    }
  }
}
</script>

<style>
.additional-label {
  color: #828282;
  font-style: italic;
}
</style>
