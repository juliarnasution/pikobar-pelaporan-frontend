<template>
  <div>
    <h4 class="font-weight-bold" style="color:#43A047">{{ $t('label.test_results') }}</h4>
    <v-divider />
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.method') }}</label>
              <v-radio-group
                v-model="formResult.tool_tester"
                :error-messages="errors"
                row
              >
                <v-radio
                  :label="$t('label.rapid_test')"
                  value="RDT"
                />
                <v-radio
                  :label="$t('label.pcr')"
                  value="PCR"
                />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-if="formResult.tool_tester === 'RDT'"
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.sampling') }}</label>
              <v-radio-group
                v-model="formResult.sampling_type"
                :error-messages="errors"
                row
              >
                <v-radio
                  :label="$t('label.vena')"
                  value="Vena"
                />
                <v-radio
                  :label="$t('label.kapiler')"
                  value="Kapiler"
                />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.test_result') }}</label>
              <v-radio-group
                v-model="formResult.final_result"
                :error-messages="errors"
                style="margin-left: 0.8rem;"
                row
              >
                <v-row
                  v-if="formResult.tool_tester === 'PCR'"
                >
                  <v-radio
                    :label="$t('label.negatif')"
                    value="NEGATIF"
                  />
                  <v-radio
                    :label="$t('label.positif')"
                    value="POSITIF"
                  />
                  <v-radio
                    :label="$t('label.inkonklusif')"
                    value="INKONKLUSIF"
                  />

                </v-row>
                <v-row
                  v-else
                >
                  <v-radio
                    :label="$t('label.reaktif')"
                    value="REAKTIF"
                  />
                  <v-radio
                    :label="$t('label.non_reaktif')"
                    value="NON REAKTIF"
                  />
                  <v-radio
                    :label="$t('label.invalid')"
                    value="INVALID"
                  />
                </v-row>
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-if="formResult.tool_tester"
              v-slot="{ errors }"
              rules="required|numeric"
              class="full-width"
            >
              <label class="required">{{ formResult.tool_tester === 'PCR' ? $t('label.swab_count') : $t('label.rdt_count') }}</label>
              <v-text-field
                v-if="formResult.tool_tester === 'PCR'"
                v-model="formResult.swab_to"
                :error-messages="errors"
                solo-inverted
                type="number"
              />
              <v-text-field
                v-else
                v-model="formResult.rdt_to"
                :error-messages="errors"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
          </v-col>
          <v-col>
            <label class="required">{{ $t('label.testing_date') }}</label>
            <input-date-picker
              :label="$t('label.testing_date')"
              :format-date="'YYYY/MM/DD'"
              :date-value="formResult.test_date"
              :value-date.sync="formResult.test_date"
              @changeDate="formResult.test_date = $event"
            />
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.place_testing') }}</label>
              <v-radio-group
                v-model="formResult.test_location_type"
                :error-messages="errors"
                row
                @change="handleChangeLocationNow"
              >
                <v-radio
                  :label="$t('label.hospital')"
                  value="RS"
                />
                <v-radio
                  :label="$t('label.lab')"
                  value="LAB"
                />
                <v-radio
                  :label="$t('label.other')"
                  value="LAINNYA"
                />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-if="formResult.test_location_type === 'RS'"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                v-model="formResult.test_location"
                :no-data-text="$t('label.data_not_available')"
                :items="hospitalList"
                :return-object="false"
                :error-messages="errors"
                :label="$t('label.choose_place_test')"
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
              v-if="formResult.test_location_type === 'LAB'"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                v-model="formResult.lab"
                :no-data-text="$t('label.data_not_available')"
                :return-object="false"
                :error-messages="errors"
                :label="$t('label.choose_place_test')"
                :items="listLab"
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
              v-if="formResult.test_location_type === 'LAINNYA'"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="formResult.test_other_location"
                :error-messages="errors"
                :placeholder="$t('label.input_name_place')"
                solo-inverted
              />
            </ValidationProvider>
            <div v-if="formResult.test_location_type === 'LAINNYA'">
              <address-region
                v-model="formResult.test_address_district_name"
                :district-code="formResult.test_address_district_code"
                :district-name="formResult.test_address_district_name"
                :code-district.sync="formResult.test_address_district_code"
                :name-district.sync="formResult.test_address_district_name"
                :sub-district-code="formResult.test_address_subdistrict_code"
                :sub-district-name="formResult.test_address_subdistrict_name"
                :code-sub-district.sync="formResult.test_address_subdistrict_code"
                :name-sub-district.sync="formResult.test_address_subdistrict_name"
                :village-code="formResult.test_address_village_code"
                :village-name="formResult.test_address_village_name"
                :code-village.sync="formResult.test_address_village_code"
                :name-village.sync="formResult.test_address_village_name"
                :disabled-address="false"
                :required-address="true"
              />
            </div>
            <label v-if="formResult.test_location_type === 'LAINNYA'">
              {{ $t('label.complete_address_place_testing') }}
            </label>
            <v-textarea
              v-if="formResult.test_location_type === 'LAINNYA'"
              v-model="formResult.test_address_detail"
              solo
            />
            <label>{{ $t('label.additional_information') }}</label>
            <v-textarea
              v-model="formResult.test_note"
              solo
            />
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'FormResult',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    formResult: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      listLab: []
    }
  },
  computed: {
    ...mapGetters('region', [
      'hospitalList'
    ]),
    ...mapGetters('user', [
      'district_user'
    ])
  },
  watch: {
    'formResult.tool_tester'(value) {
      if (this.formResult) {
        if (value === 'PCR') this.formResult.sampling_type = null
        this.formResult.final_result = null
      }
    }
  },
  async mounted() {
    const listQuery = {
      city_code: this.district_user
    }
    await this.$store.dispatch('region/getListHospital', listQuery)
    const response = await this.$store.dispatch('rdt/getLabList')
    this.listLab = response.data
    var paramHospitalWestJava = { 'rs_jabar': true }
    await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
  },
  methods: {
    handleChangeLocationNow(value) {
      if (value === 'LAINNYA') {
        this.formResult.test_location = null
        this.formResult.lab = null
        this.getCity()
      } else {
        if (value !== 'LAB') this.formResult.lab = null
        this.formResult.test_address_district_code = ''
        this.formResult.test_address_district_name = ''
        this.formResult.test_address_subdistrict_code = ''
        this.formResult.test_address_subdistrict_name = ''
        this.formResult.test_address_village_code = ''
        this.formResult.test_address_village_name = ''
        this.formResult.test_address_detail = ''
        this.formResult.test_other_location = ''
        this.formResult.test_location = null
      }
    },
    onSelectHospital(value) {
      this.formResult.test_location = value
    },
    async getCity() {
      const responseDetails = await this.$store.dispatch('region/getDetailDistrict', this.district_user)
      if (responseDetails.data[0]) {
        this.formResult.test_address_district_name = responseDetails.data[0].kota_nama
        this.formResult.test_address_district_code = responseDetails.data[0].kota_kode
      }
    }
  }
}
</script>
