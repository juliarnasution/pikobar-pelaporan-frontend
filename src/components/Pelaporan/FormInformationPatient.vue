<template>
  <v-container fluid>
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
            <v-icon class="rotate" color="#27AE60" left>mdi-color-helper</v-icon><label class="subtitle text-uppercase">{{ $t('label.identity') }}</label>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.nik') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="isHtml|sixteenDigits|numeric"
            >
              <v-text-field
                v-model="formPasien.nik"
                type="number"
                :error-messages="errors"
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
            <label class="required">{{ $t('label.name_case') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isHtml"
            >
              <v-text-field
                v-model="formPasien.name"
                :error-messages="errors"
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
            <label>{{ $t('label.birth_date') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <select-datetime
              :datetime="formPasien.birth_date"
              :date-time.sync="formPasien.birth_date"
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
            <label class="required">{{ $t('label.age') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <v-row align="center" class="ma-0">
              <v-col cols="12" sm="3" class="pa-0">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|numeric|isHtml"
                >
                  <v-text-field
                    v-model="formPasien.yearsOld"
                    :error-messages="errors"
                    type="number"
                    min="0"
                    max="120"
                    solo-inverted
                    oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="1" sm="2" class="pa-0 text-center">
                <label>{{ $t('label.year') }}</label>
              </v-col>
              <v-col cols="12" sm="3" class="pa-0">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="numeric|isHtml"
                >
                  <v-text-field
                    v-model="formPasien.monthsOld"
                    :error-messages="errors"
                    type="number"
                    min="0"
                    max="11"
                    solo-inverted
                    oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  />
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="1" sm="2" class="pa-0 text-center">
                <label>{{ $t('label.month') }}</label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label class="required">{{ $t('label.gender') }}</label>
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
                v-model="formPasien.gender"
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
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.phone_number') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="isPhoneNumber"
            >
              <v-text-field
                v-model="formPasien.phone_number"
                :error-messages="errors"
                placeholder="08xxxxxxxxx"
                solo-inverted
                type="number"
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
            <label class="required">{{ $t('label.address_home') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <address-region
              v-if="formPasien.address_district_name"
              :district-code="formPasien.address_district_code"
              :district-name="formPasien.address_district_name"
              :code-district.sync="formPasien.address_district_code"
              :name-district.sync="formPasien.address_district_name"
              :sub-district-code="formPasien.address_subdistrict_code"
              :sub-district-name="formPasien.address_subdistrict_name"
              :code-sub-district.sync="formPasien.address_subdistrict_code"
              :name-sub-district.sync="formPasien.address_subdistrict_name"
              :village-code="formPasien.address_village_code"
              :village-name="formPasien.address_village_name"
              :code-village.sync="formPasien.address_village_code"
              :name-village.sync="formPasien.address_village_name"
              :disabled-address="false"
              :required-address="true"
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
            <label>{{ $t('label.address_complete_home') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-textarea
                v-model="formPasien.address_street"
                solo
              />
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
            <label class="required">{{ $t('label.citizenship') }}</label>
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
                v-model="formPasien.nationality"
                :error-messages="errors"
                row
                @change="handleChangeNationality"
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
          </v-col>
        </v-row>
        <v-row v-if="formPasien.nationality === 'WNA'" align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.country_origin') }}</label>
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
              <v-autocomplete
                v-model="formPasien.nationality_name"
                :items="listCountry"
                item-text="name"
                item-value="name"
                :error-messages="errors"
                :placeholder="$t('label.country_origin')"
                clearable
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
            <v-icon class="rotate" color="#27AE60" left>mdi-color-helper</v-icon><label class="subtitle text-uppercase">{{ $t('label.case_id') }}</label>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.center_case_id') }}</label>
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
                v-model="formPasien.id_case_national"
                :error-messages="errors"
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
            <label>{{ $t('label.related_case_name') }}</label>
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
              <v-autocomplete
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
            <v-icon class="rotate" color="#27AE60" left>mdi-color-helper</v-icon><label class="subtitle text-uppercase">{{ $t('label.profession') }}</label>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'py-0': $vuetify.breakpoint. smAndDown}"
          >
            <label>{{ $t('label.profession') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-select
                v-model="formPasien.occupation"
                :items="occupationList"
                item-value="title"
                item-text="title"
                menu-props="auto"
                solo
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
            <label>{{ $t('label.office_address') }}</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <ValidationProvider>
              <v-textarea
                v-model="formPasien.office_address"
                solo
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row
          v-if="!patientReferral"
          class="survey-bottom-form ma-0 pa-0"
        >
          <v-col cols="12" :class="{'text-right': $vuetify.breakpoint.mdAndUp}" class="ma-0 pa-0">
            <v-btn
              color="success"
              bottom
              @click="onNext"
            >
              {{ $t('label.continue') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
    <dialog-duplicated-nik
      :show-dialog="showDuplicatedNikDialog"
      :nik-number="nikNumber"
      :nik-name="nikName"
      :nik-author="nikAuthor"
      :show.sync="showDuplicatedNikDialog"
    />
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { getAgeWithMonth } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FormInformationPatient',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
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
      formatDate: 'YYYY/MM/DD',
      date: '',
      listCountry: [],
      listNameCases: [],
      listQuery: {
        'name': ''
      },
      searchRelatedCase: null,
      showDuplicatedNikDialog: false,
      nikNumber: null,
      nikName: null,
      nikAuthor: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName',
      'district_user',
      'district_name_user'
    ]),
    ...mapGetters('region', [
      'listDistrictCity'
    ]),
    ...mapGetters('occupation', [
      'occupationList'
    ])
  },
  watch: {
    'formPasien.birth_date': function(value) {
      if (value && value.length > 0) {
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
  async mounted() {
    const response = await this.$store.dispatch('region/listCountry')
    this.listCountry = response.data
  },
  async beforeMount() {
    await this.$store.dispatch('occupation/getListOccuption')
    this.formPasien.address_district_name = this.district_name_user
  },
  methods: {
    getAgeWithMonth,
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      if (this.formPasien.nik) {
        const response = await this.$store.dispatch('reports/getNik', this.formPasien.nik)
        if (response.data) {
          this.nikNumber = response.data.nik
          this.nikName = response.data.name
          this.nikAuthor = response.data.author.fullname
          this.showDuplicatedNikDialog = true
          return
        }
      }
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      EventBus.$emit('nextSurveySteps', this.steps)
    },
    handleChangeNationality(value) {
      if (value === 'WNI') {
        this.formPasien.nationality_name = ''
      }
    },
    handleChangeRelatedCase(value) {
      this.formPasien.id_case_related = value.id_case
      this.formPasien.name_case_related = value.name
    },
    clearListNameCases() {
      this.listNameCases = []
    }
  }
}
</script>
<style>
.subtitle {
  font-family: "Product Sans";
  font-weight: bold;
  font-size: 16px;
}
.rotate {
  transform: rotate(90deg);
}
</style>
