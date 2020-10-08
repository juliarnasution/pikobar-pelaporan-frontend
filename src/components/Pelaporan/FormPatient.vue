<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label :class="!formPasien.is_nik_exists ? 'required' : ''">{{ $t('label.nik') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" :rules="formPasien.is_nik_exists ? 'numeric' : 'required|numeric|sixteenDigits|provinceCode'">
            <v-text-field
              v-model="formPasien.nik"
              name="nik"
              type="number"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
          <v-checkbox v-model="formPasien.is_nik_exists" name="is_nik_exists" :label="$t('label.do_not_have_nik')" class="mt-0 pt-0" />
          <ValidationProvider v-if="formPasien.is_nik_exists" v-slot="{ errors }" rules="required">
            <label class="required">{{ $t('label.reason_do_not_have_nik') }}</label>
            <v-text-field
              v-model="formPasien.note_nik"
              name="note_nik"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label :class="!formPasien.is_phone_number_exists ? 'required' : ''">{{ $t('label.phone_number') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" :rules="formPasien.is_phone_number_exists ? 'isPhoneNumber' : 'required|isPhoneNumber'">
            <v-text-field
              v-model="formPasien.phone_number"
              name="phone_number"
              :error-messages="errors"
              placeholder="08xxxxxxxxx"
              solo-inverted
              type="number"
            />
          </ValidationProvider>
          <v-checkbox
            v-model="formPasien.is_phone_number_exists"
            name="is_phone_number_exists"
            :label="$t('label.do_not_have_phone_number')"
            class="mt-0 pt-0"
          />
          <ValidationProvider v-if="formPasien.is_phone_number_exists" v-slot="{ errors }" rules="required">
            <label class="required">{{ $t('label.reason_do_not_have_phone_number') }}</label>
            <v-text-field
              v-model="formPasien.note_phone_number"
              name="note_phone_number"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.patient_name') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
            <v-text-field v-model="formPasien.name" name="name" :error-messages="errors" solo-inverted />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.parent_name') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field v-model="formPasien.name_parents" name="name_parents" solo-inverted />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.place_birth') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field v-model="formPasien.place_of_birth" name="place_of_birth" solo-inverted />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.birth_date') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <select-datetime
            name="birth_date"
            :datetime="formPasien.birth_date"
            :date-time.sync="formPasien.birth_date"
            :formate-date="formatDate"
          />
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.age') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <v-row align="center" class="ma-0">
            <v-col cols="12" sm="6" class="pa-1">
              <ValidationProvider v-slot="{ errors }" rules="required|numeric|isHtml">
                <v-text-field
                  v-model="formPasien.yearsOld"
                  name="yearsOld"
                  :error-messages="errors"
                  type="number"
                  min="0"
                  max="120"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  class="input-append-btn"
                >
                  <template v-slot:append>
                    <v-btn depressed tile min-width="20">
                      {{ $t('label.year') }}
                    </v-btn>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
              <ValidationProvider v-slot="{ errors }" rules="required|numeric|isHtml">
                <v-text-field
                  v-model="formPasien.monthsOld"
                  name="monthsOld"
                  :error-messages="errors"
                  type="number"
                  min="0"
                  max="11"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  class="input-append-btn"
                >
                  <template v-slot:append>
                    <v-btn depressed tile min-width="20">
                      {{ $t('label.month') }}
                    </v-btn>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.gender') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group v-model="formPasien.gender" name="gender" :error-messages="errors" row>
              <v-radio :label="$t('label.male')" value="L" />
              <v-radio :label="$t('label.female')" value="P" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label class="required">{{ $t('label.address_home') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <address-region
          v-if="formPasien.address_district_name"
          name="address-region"
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
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="6" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.rt"
                name="rt"
                class="input-append-btn"
                type="number"
                min="0"
                max="120"
                solo-inverted
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.rt') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.rw"
                name="rw"
                class="input-append-btn"
                type="number"
                min="0"
                max="11"
                solo-inverted
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.rw') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-textarea
            v-model="formPasien.address_street"
            name="address_street"
            :error-messages="errors"
            solo
            :placeholder="$t('label.complete_address')"
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="start" hidden>
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="6" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.latitude"
                name="latitude"
                disabled
                class="input-append-btn"
                type="number"
                min="0"
                max="120"
                solo-inverted
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Lat
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.longitude"
                name="longitude"
                disabled
                class="input-append-btn"
                type="number"
                min="0"
                max="11"
                solo-inverted
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Long
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.profession') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-select v-model="formPasien.occupation" name="occupation" :items="occupationList" item-value="title" item-text="title" menu-props="auto" solo />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.office_address') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-textarea v-model="formPasien.office_address" name="office_address" solo />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label class="required">{{ $t('label.citizenship') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-radio-group v-model="formPasien.nationality" name="nationality" :error-messages="errors" row @change="handleChangeNationality">
            <v-radio :label="$t('label.wni')" value="WNI" />
            <v-radio :label="$t('label.wna')" value="WNA" />
          </v-radio-group>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row v-if="formPasien.nationality === 'WNA'" align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label class="required">{{ $t('label.country_origin') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }">
          <v-autocomplete v-model="formPasien.nationality_name" name="nationality_name" :items="listCountry" item-text="name" item-value="name" :error-messages="errors" :placeholder="$t('label.country_origin')" clearable solo-inverted />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.income') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.income" name="income" row>
                <span v-for="(item, index) in incomeList" :key="index">
                  <v-radio :label="item.text" :value="item.value" />
                </span>
              </v-radio-group>
            </v-row>
          </v-container>
        </ValidationProvider>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { getAgeWithMonth, incomeList } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FormPatient',
  components: {
    ValidationProvider
  },
  props: {
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      incomeList: incomeList,
      formatDate: 'YYYY/MM/DD',
      date: '',
      listCountry: [],
      listNameCases: [],
      listQuery: {
        'name': ''
      },
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
      if (value === null) return
      if (value.length > 0) {
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
    async 'formPasien.address_subdistrict_name'() {
      this.formPasien.latitude = ''
      this.formPasien.longitude = ''
    },
    async 'formPasien.address_street'(value) {
      if (this.formPasien.address_village_name !== '') {
        const completeAddress = `${value}, ${this.formPasien.address_village_name}, ${this.formPasien.address_district_name}, ${this.formPasien.address_subdistrict_name}`
        const params = {
          address: completeAddress
        }
        const response = await this.$store.dispatch('region/getLatitudeLongitude', params)
        if (response) {
          this.formPasien.latitude = response.lat
          this.formPasien.longitude = response.lng
        }
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
