<template>
  <div v-if="caseDetail">
    <ValidationObserver ref="observer">
      <v-row class="mx-0 font-weight-bold headline mb-5">
        {{ $t('label.detail_case') }}
      </v-row>
      <v-row class="mx-0">
        <div class="rejection py-2 px-7">
          <v-row justify="start">
            <v-col cols="12" sm="1">
              <v-icon x-large color="#EB5757">mdi-alert-circle</v-icon>
            </v-col>
            <v-col cols="12" sm="11">
              <v-row>
                <span class="font-weight-bold">{{ $t('label.rejection_note') }}</span>
              </v-row>
              <v-row>
                <span>"{{ caseDetail.verified_comment }}"</span>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-row>
      <v-row class="mx-0">
        <v-col class="mr-5 pb-0">
          <v-row class="font-weight-bold subtitle">
            {{ $t('label.identity') }}
          </v-row>
          <v-row class="input-label">
            {{ $t('label.nik') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              class="full-width"
            >
              <v-text-field
                v-model="caseDetail.nik"
                solo-inverted
                :error-messages="errors"
              />
            </ValidationProvider>
          </v-row>
          <v-row class="input-label" :class="required">
            {{ $t('label.name_case') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-text-field
                v-model="caseDetail.name"
                solo-inverted
                :error-messages="errors"
              />
            </ValidationProvider>
          </v-row>
          <v-row class="input-label">
            {{ $t('label.birth_date') }}
          </v-row>
          <v-row>
            <select-datetime
              :datetime="caseDetail.birth_date"
              :date-time.sync="caseDetail.birth_date"
              :formate-date="'YYYY/MM/DD'"
            />
          </v-row>
          <v-row class="input-label" :class="required">
            {{ $t('label.age') }}
          </v-row>
          <v-row align="start">
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown, 'px-0': $vuetify.breakpoint. mdAndUp}"
            >
              <v-row align="center" class="ma-0">
                <v-col cols="12" sm="3" class="pa-0">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|numeric|isHtml"
                  >
                    <v-text-field
                      :key="caseDetail.yearOld"
                      v-model="caseDetail.yearsOld"
                      :error-messages="errors"
                      type="number"
                      min="0"
                      max="120"
                      solo-inverted
                      oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="3" sm="2" class="pa-0 text-center">
                  <label>{{ $t('label.year') }}</label>
                </v-col>
                <v-col cols="12" sm="3" class="pa-0">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="numeric|isHtml"
                  >
                    <v-text-field
                      :key="caseDetail.monthsOld"
                      v-model="caseDetail.monthsOld"
                      :error-messages="errors"
                      type="number"
                      min="0"
                      max="11"
                      solo-inverted
                      oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="3" sm="2" class="pa-0 text-center">
                  <label>{{ $t('label.month') }}</label>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="input-label" :class="required">
            {{ $t('label.gender') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-radio-group
                v-model="caseDetail.gender"
                :error-messages="errors"
                row
              >
                <v-radio
                  :label="$t('label.male')"
                  value="L"
                />
                <v-radio
                  :label="$t('label.female')"
                  value="P"
                />
              </v-radio-group>
            </ValidationProvider>
          </v-row>
          <v-row class="input-label">
            {{ $t('label.phone_number') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="isPhoneNumber"
              class="full-width"
            >
              <v-text-field
                v-model="caseDetail.phone_number"
                solo-inverted
                type="number"
                placeholder="08xxxxxxxxx"
                :error-messages="errors"
              />
            </ValidationProvider>
          </v-row>
          <v-row class="input-label">
            {{ $t('label.address_home') }}
          </v-row>
          <v-row>
            <address-region
              :district-code="caseDetail.address_district_code"
              :district-name="caseDetail.address_district_name"
              :code-district.sync="caseDetail.address_district_code"
              :name-district.sync="caseDetail.address_district_name"
              :sub-district-code="caseDetail.address_subdistrict_code"
              :sub-district-name="caseDetail.address_subdistrict_name"
              :code-sub-district.sync="caseDetail.address_subdistrict_code"
              :name-sub-district.sync="caseDetail.address_subdistrict_name"
              :village-code="caseDetail.address_village_code"
              :village-name="caseDetail.address_village_name"
              :code-village.sync="caseDetail.address_village_code"
              :name-village.sync="caseDetail.address_village_name"
              :disabled-address="false"
              :required-address="true"
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.address_complete_home') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.address_street"
              solo-inverted
            />
          </v-row>
        </v-col>
        <v-col class="pb-0">
          <v-row class="font-weight-bold subtitle">
            {{ $t('label.case_id') }}
          </v-row>
          <v-row class="input-label">
            {{ $t('label.center_case_id') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.id_case_national"
              solo-inverted
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.related_case_id') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              class="full-width"
            >
              <v-autocomplete
                v-model="relatedCase"
                :no-data-text="$t('label.no_data_autocomplete_related_case')"
                :error-messages="errors"
                :items="listNameCases"
                :search-input.sync="searchRelatedCase"
                item-text="relateds"
                solo-inverted
                clearable
                return-object
                @change="handleChangeRelatedCase"
                @click:clear="clearListNameCases"
              />
            </ValidationProvider>
          </v-row>
          <v-row class="font-weight-bold subtitle extra-margin-top">
            {{ $t('label.profession') }}
          </v-row>
          <v-row class="input-label">
            {{ $t('label.profession') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.occupation"
              solo-inverted
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.office_address') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.office_address"
              solo-inverted
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mx-0 mt-0">
        <v-col class="mr-5 pt-0">
          <v-row class="input-label" :class="required">
            {{ $t('label.citizenship') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-radio-group
                v-model="caseDetail.nationality"
                row
                :error-messages="errors"
              >
                <v-radio
                  :label="$t('label.wni')"
                  value="WNI"
                />
                <v-radio
                  :label="$t('label.wna')"
                  value="WNA"
                />
              </v-radio-group>
            </ValidationProvider>
          </v-row>
        </v-col>
        <v-col class="pt-0">
          <v-row class="input-label">
            {{ $t('label.country') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail.nationality === 'WNI'"
              v-model="caseDetail.nationality_name"
              solo-inverted
              disabled
            />
            <v-autocomplete
              v-else
              v-model="caseDetail.nationality_name"
              :items="listCountry"
              item-text="name"
              item-value="name"
              :placeholder="$t('label.country_origin')"
              clearable
              solo-inverted
            />
          </v-row>
        </v-col>
      </v-row>
      <hr>
      <v-row class="mx-0">
        <v-col class="mr-5">
          <v-row class="input-label" :class="required">
            {{ $t('label.status') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-radio-group
                v-model="caseDetail.status"
                row
                :error-messages="errors"
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
          </v-row>
          <v-row class="input-label" :class="required">
            {{ $t('label.stages') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-radio-group
                v-model="caseDetail.stage"
                row
                :error-messages="errors"
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
          </v-row>
          <v-row v-if="caseDetail.stage === '1'" class="input-label">
            {{ $t('label.results') }}
          </v-row>
          <v-row v-if="caseDetail.stage === '1'">
            <v-radio-group
              v-model="caseDetail.final_result"
              row
            >
              <v-radio
                v-if="caseDetail.status !== 'POSITIF'"
                :label="$t('label.negatif')"
                value="0"
              />
              <v-radio
                :label="$t('label.recovery')"
                value="1"
              />
              <v-radio
                :label="$t('label.dead')"
                value="2"
              />
            </v-radio-group>
          </v-row>
        </v-col>
        <v-col>
          <v-row class="input-label" :class="required">
            {{ $t('label.current_location') }}
          </v-row>
          <v-row>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-radio-group
                v-model="caseDetail.last_history.current_location_type"
                row
                :error-messages="errors"
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
          </v-row>
          <v-row>
            <address-region
              v-if="caseDetail.last_history.current_location_type === 'RUMAH'"
              :district-code="caseDetail.last_history.current_location_district_code"
              :code-district.sync="caseDetail.last_history.current_location_district_code"
              :sub-district-code="caseDetail.last_history.current_location_subdistrict_code"
              :code-sub-district.sync="caseDetail.last_history.current_location_subdistrict_code"
              :village-code="caseDetail.last_history.current_location_village_code"
              :code-village.sync="caseDetail.last_history.current_location_village_code"
              :disabled-address="false"
              :required-address="true"
            />
            <ValidationProvider
              v-if="caseDetail.last_history.current_location_type === 'RS'"
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-autocomplete
                v-model="caseDetail.last_history.current_location_address"
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
            <ValidationProvider
              v-if="caseDetail.last_history.current_location_type === 'others'"
              v-slot="{ errors }"
              rules="required"
              class="full-width"
            >
              <v-autocomplete
                v-model="caseDetail.last_history.current_location_address"
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
          </v-row>
          <v-row>
            <label v-if="caseDetail.last_history.current_location_type === 'RUMAH'" class="input-label">{{ $t('label.address_complete_this_time') }}</label>
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail.last_history.current_location_type === 'RUMAH'"
              v-model="caseDetail.last_history.current_location_address"
              solo-inverted
              :disabled="caseDetail.verified_status !== 'declined'"
            />
          </v-row>
        </v-col>
      </v-row>
      <hr>
      <v-row class="mx-0">
        <v-col class="mr-5">
          <v-row class="input-label">
            {{ $t('label.history') }}
          </v-row>
          <v-row>
            <div class="full-width">
              <v-checkbox
                v-model="caseDetail.last_history.is_went_abroad"
                :label="$t('label.from_abroad')"
                class="mt-0 pt-0"
              />
              <v-row v-if="caseDetail.last_history.is_went_abroad" class="input-label mx-0">
                {{ $t('label.country_visited') }}
              </v-row>
              <v-row class="mx-0">
                <v-text-field
                  v-if="caseDetail.last_history.is_went_abroad"
                  v-model="caseDetail.last_history.visited_country"
                  solo-inverted
                  :disabled="caseDetail.verified_status !== 'declined'"
                />
              </v-row>
              <v-checkbox
                v-model="caseDetail.last_history.is_went_other_city"
                :label="$t('label.trip_outside_the_city')"
                class="mt-0 pt-0"
              />
              <v-row v-if="caseDetail.last_history.is_went_other_city" class="input-label mx-0">
                {{ $t('label.city_visited') }}
              </v-row>
              <v-row class="mx-0">
                <v-text-field
                  v-if="caseDetail.last_history.is_went_other_city"
                  v-model="caseDetail.last_history.visited_city"
                  solo-inverted
                  :disabled="caseDetail.verified_status !== 'declined'"
                />
              </v-row>
              <v-checkbox
                v-model="caseDetail.last_history.is_contact_with_positive"
                :label="$t('label.contact_with_positive_patients')"
                class="mt-0 pt-0"
              />
            </div>
          </v-row>
          <v-row class="input-label">
            {{ $t('label.other_illness_history') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.last_history.history_notes"
              solo-inverted
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.additional_condition') }}
          </v-row>
          <v-row>
            <v-col v-for="item in additionalConditionOptions" :key="item" sm="6" md="6" class="pa-0">
              <v-checkbox
                v-model="caseDetail.last_history.diseases"
                :label="item"
                :value="item"
                class="mt-0 pt-0"
              />
            </v-col>
          </v-row>
          <v-row class="input-label">
            {{ $t('label.other_additional_condition') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.last_history.diseases_other"
              solo-inverted
            />
          </v-row>
        </v-col>
        <v-col>
          <v-row class="input-label">
            {{ $t('label.date_of_beginning_symptoms') }}
          </v-row>
          <v-row>
            <select-datetime
              :datetime="caseDetail.last_history.first_symptom_date"
              :date-time.sync="caseDetail.last_history.first_symptom_date"
              :formate-date="'YYYY/MM/DD'"
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.symptoms') }}
          </v-row>
          <v-row>
            <v-col v-for="item in symptomOptions" :key="item" sm="6" md="6" class="pa-0">
              <v-checkbox
                v-model="caseDetail.last_history.diagnosis"
                :label="item"
                :value="item"
                class="mt-0 pt-0"
              />
            </v-col>
          </v-row>
          <v-row class="input-label">
            {{ $t('label.other_symptoms') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.last_history.diagnosis_other"
              solo-inverted
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="mr-5 pt-0">
          <v-row class="input-label">
            {{ $t('label.reporting_sources') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.last_history.report_source"
              solo-inverted
              disabled
            />
          </v-row>
        </v-col>
        <v-col class="pt-0">
          <v-row class="input-label">
            {{ $t('label.postscript') }}
          </v-row>
          <v-row>
            <v-text-field
              v-model="caseDetail.last_history.other_notes"
              solo-inverted
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="pa-0 mr-6">
          <v-btn
            color="grey"
            width="100%"
            outlined
            @click="onClose(false)"
          >
            <span class="input-label text-capitalize decline">{{ roles[0] === 'faskes' ? $t('label.canceled') : $t('label.decline') }}</span>
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-btn
            color="#2ead64"
            width="100%"
            @click="onClose(true)"
          >
            <span class="text-capitalize verify">{{ roles[0] === 'faskes' ? $t('label.update_case') : $t('label.verify_case') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'
import { getAgeWithMonth } from '@/utils/constantVariable'
import { symptomOptions, additionalConditionOptions } from '@/utils/constantVariable'
export default {
  name: 'EditVerification',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    caseData: {
      type: Object,
      default: null
    },
    queryData: {
      type: Object,
      default: null
    },
    relatedCaseObject: {
      type: Object,
      default: null
    },
    hospitalWestJavaList: {
      type: Array,
      default: null
    },
    hospitalNonWestJavaList: {
      type: Array,
      default: null
    },
    listCountry: {
      type: Array,
      default: null
    },
    listCases: {
      type: Array,
      default: null
    },
    updateCase: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      caseDetail: null,
      query: null,
      symptomOptions: symptomOptions,
      additionalConditionOptions: additionalConditionOptions,
      listNameCases: [],
      searchRelatedCase: null,
      relatedCase: null,
      listQuery: {
        'name': ''
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    required() {
      return {
        'required': this.caseDetail && this.caseDetail.verified_status === 'declined'
      }
    }
  },
  watch: {
    caseDetail(value) {
      this.$emit('update:dataCase', value)
    },
    'caseDetail.birth_date'(value) {
      if (this.caseDetail.birth_date && this.caseDetail.verified_status === 'declined') {
        const age = this.getAgeWithMonth(value)
        this.caseDetail.yearsOld = age.year
        this.caseDetail.monthsOld = age.month
        this.caseDetail.age = Number((this.caseDetail.yearsOld + (this.caseDetail.monthsOld / 12)).toFixed(2))
      }
    },
    'caseDetail.yearsOld'() {
      this.caseDetail.age = this.caseDetail.monthsOld !== '' ? Number((Number(this.caseDetail.yearsOld) + (Number(this.caseDetail.monthsOld) / 12)).toFixed(2)) : Number(this.caseDetail.yearsOld)
    },
    'caseDetail.monthsOld'() {
      if (this.caseDetail.yearsOld !== '') {
        this.caseDetail.age = Number((Number(this.caseDetail.yearsOld) + (Number(this.caseDetail.monthsOld) / 12)).toFixed(2))
      }
    },
    'caseDetail.nationality'(value) {
      if (value === 'WNI') {
        this.caseDetail.nationality_name = this.$t('label.indonesia')
      } else if (this.caseDetail.nationality_name === this.$t('label.indonesia')) {
        this.caseDetail.nationality_name = ''
      }
    },
    async searchRelatedCase(value) {
      if (value) {
        this.listQuery.name = value
        const response = await this.$store.dispatch('reports/listNameCase', this.listQuery)
        this.listNameCases = response.data
      } else {
        this.listNameCases = []
      }
    }
  },
  mounted() {
    this.caseDetail = this.caseData
    this.listNameCases = this.listCases
    this.relatedCase = this.relatedCaseObject
  },
  methods: {
    formatDatetime,
    getAgeWithMonth,
    handleChangeRelatedCase(value) {
      if (value) {
        this.caseDetail.id_case_related = value.id_case
        this.caseDetail.name_case_related = value.name
      }
    },
    clearListNameCases() {
      this.listNameCases = []
    },
    onSelectHospital(value) {
      this.caseDetail.last_history.current_hospital_id = value._id
      this.caseDetail.last_history.current_location_address = value.name
    },
    handleChangeLocationNow(value) {
      if (value !== 'RUMAH') {
        this.caseDetail.last_history.current_hospital_id = null
        this.caseDetail.last_history.current_location_address = ''
        this.caseDetail.last_history.current_location_district_code = ''
        this.caseDetail.last_history.current_location_subdistrict_code = ''
        this.caseDetail.last_history.current_location_village_code = ''
      }
    },
    async onClose(isSubmit) {
      if (isSubmit) {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        this.updateCase()
      }
      this.$emit('update:show', false)
    }
  }
}
</script>
<style scoped>
.row {
  margin-bottom: 0px;
}
</style>
