<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.primary_contact_label_1') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group
              v-model="formPasien.close_contacted_before_sick_14_days"
              :error-messages="errors"
              row
              @change="handleCheckContactPremier"
            >
              <v-radio :label="$t('label.yes')" :value="true" />
              <v-radio :label="$t('label.no')" :value="false" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <div v-for="(data, index) in formPasien.close_contact_premier" :key="index" :class="`form-${index + 1}`">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.primary_contact')} ${index+1}` }}
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormCloseContact(index)">
                  <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
                </v-btn>
              </v-col>
            </v-row>
            <hr class="table-divider">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label :class="formPasien.close_contacted_before_sick_14_days ? 'required':''">{{ $t('label.contact_name') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="formPasien.close_contacted_before_sick_14_days ? 'required':''"
                  >
                    <v-text-field
                      v-model="data.close_contact_name"
                      :error-messages="errors"
                      :label="$t('label.contact_name')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label :class="formPasien.close_contacted_before_sick_14_days ? 'required':''">{{ $t('label.contact_criteria') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="formPasien.close_contacted_before_sick_14_days ? 'required':''"
                  >
                    <v-radio-group
                      v-model="data.close_contact_criteria"
                      :error-messages="errors"
                      row
                    >
                      <v-radio :label="$t('label.suspect')" value="SUSPECT" />
                      <v-radio :label="$t('label.probable')" value="PROBABLE" />
                      <v-radio :label="$t('label.confirmation')" value="CONFIRMATION" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start" class="pb-6">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  {{ $t('label.same_house_as_patient') }}
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="isHtml"
                  >
                    <v-checkbox
                      v-model="data.is_patient_address_same"
                      class="mt-0 pt-0"
                      :error-messages="errors"
                      @change="handleChangeSameHouse($event, index)"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.address_home') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <address-region
                    :district-code="data.close_contact_address_district_code"
                    :district-name="data.close_contact_address_district_name"
                    :code-district.sync="data.close_contact_address_district_code"
                    :name-district.sync="data.close_contact_address_district_name"
                    :sub-district-code="data.close_contact_address_subdistrict_code"
                    :sub-district-name="data.close_contact_address_subdistrict_name"
                    :code-sub-district.sync="data.close_contact_address_subdistrict_code"
                    :name-sub-district.sync="data.close_contact_address_subdistrict_name"
                    :village-code="data.close_contact_address_village_code"
                    :village-name="data.close_contact_address_village_name"
                    :code-village.sync="data.close_contact_address_village_code"
                    :name-village.sync="data.close_contact_address_village_name"
                    :disabled-address="false"
                    :required-address="false"
                  />
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <v-row align="center" class="ma-0">
                    <v-col cols="12" sm="6" class="pa-1">
                      <ValidationProvider>
                        <v-text-field v-model="data.close_contact_rt" class="input-append-btn" type="number" min="0" max="120" solo-inverted>
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
                        <v-text-field v-model="data.close_contact_rw" class="input-append-btn" type="number" min="0" max="120" solo-inverted>
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
                  <ValidationProvider>
                    <v-textarea
                      v-model="data.close_contact_address_street"
                      solo
                      :placeholder="$t('label.complete_address')"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.relationship') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }">
                    <v-select
                      v-model="data.close_contact_relation"
                      :items="listRelationships"
                      :error-messages="errors"
                      solo
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center" class="mt-2">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-if="data.close_contact_relation === 'Lainnya'"
                      v-model="data.country"
                      :label="$t('label.mention_it')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.first_contact_date') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.close_contact_first_date"
                      :value-date.sync="data.close_contact_first_date"
                      :label="$t('label.choose_date')"
                      @changeDate="data.close_contact_first_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.last_contact_date') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.close_contact_last_date"
                      :value-date.sync="data.close_contact_last_date"
                      :label="$t('label.choose_date')"
                      @changeDate="data.close_contact_last_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container
        v-if="formPasien.close_contacted_before_sick_14_days"
        fluid
      >
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormSupportingInvestigation">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_other_primary_contact') }}</p>
        </v-card>
      </v-container>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_2') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_heavy_ispa_group" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_3') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_have_pets" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_have_pets" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field
              v-model="formPasien.close_contact_pets"
              :label="$t('label.mention_animals_that_kept')"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_4') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_health_worker" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formPasien.close_contact_health_worker"
        align="start"
        class="mb-1"
      >
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.protective_equipment_used') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in apdList" :key="item" cols="12" sm="6" md="4">
                <label class="material-checkbox-custom">
                  <input v-model="formPasien.apd_use" :value="item" type="checkbox">
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
                <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
              </v-col>
            </v-row>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formPasien.close_contact_health_worker"
        align="center"
      >
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_5') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_performing_aerosol_procedures" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formPasien.close_contact_performing_aerosol_procedures"
        align="center"
      >
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field
              v-model="formPasien.close_contact_performing_aerosol"
              :label="$t('label.mention_it')"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <br>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { answerList, yesOrNoAnswer, healthWorkerList, listRelationships, apd } from '@/utils/constantVariable'
import { scrollUp } from '@/utils/utilsFunction'

export default {
  name: 'FormMultipleContactFactor',
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
      apdList: apd,
      formatDate: 'YYYY/MM/DD',
      totalCloseContact: 0,
      idCloseContactForm: 0,
      isValid: false,
      showAlert: false,
      answerList: answerList,
      yesOrNoAnswer: yesOrNoAnswer,
      listRelationships: listRelationships,
      patientCloseContactList: [],
      patientCloseContactConfirmList: [],
      searchPatientCloseContact: null,
      searchPatientCloseContactConfirm: null,
      listQuery: {
        name_case_related: null,
        status: null
      },
      healthWorkerList: healthWorkerList
    }
  },
  watch: {
    async searchPatientCloseContact(value) {
      if (value) {
        this.listQuery.name_case_related = value
        const response = await this.$store.dispatch('reports/casesList', this.listQuery)
        this.patientCloseContactList = response.data
      } else {
        this.patientCloseContactList = []
      }
    },
    async searchPatientCloseContactConfirm(value) {
      if (value) {
        this.listQuery.name_case_related = value
        const response = await this.$store.dispatch('reports/casesList', this.listQuery)
        this.patientCloseContactConfirmList = response.data
      }
    }
  },
  methods: {
    handleAddFormSupportingInvestigation() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.close_contact_premier.push({
        id: this.idCloseContactForm,
        close_contact_name: '',
        close_contact_criteria: '',
        close_contact_address_village_code: '',
        close_contact_address_village_name: '',
        close_contact_address_subdistrict_code: '',
        close_contact_address_subdistrict_name: '',
        close_contact_address_district_code: '',
        close_contact_address_district_name: '',
        close_contact_address_province_code: '32',
        close_contact_address_province_name: 'Jawa Barat',
        close_contact_rt: '',
        close_contact_rw: '',
        close_contact_address_street: '',
        close_contact_relation: '',
        close_contact_first_date: '',
        close_contact_last_date: ''
      })
      if (this.formPasien.close_contact_premier.length > 0) {
        const index = this.formPasien.close_contact_premier.length
        setTimeout(function() {
          const key = `.form-${index}`
          scrollUp(key)
        }, 500)
      }
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.close_contact_premier.splice(index, 1)
      this.isValid = this.formPasien.close_contact_premier.length !== 0
    },
    handleChangeStartTravel(value) {
      this.formPasien.start_travel = value
    },
    handleChangeEndTravel(value) {
      this.formPasien.end_travel = value
    },
    handleChangeVisitAnimalMarketDate(value) {
      this.formPasien.animal_market_date = value
    },
    handleChangeVisitPublicPlaceDate(value) {
      this.formPasien.public_place_date = value
    },
    handleChangeVisitMedicalFacilityDate(value) {
      this.formPasien.medical_facility_date = value
    },
    onSelectCloseContact(value) {
      if (value) {
        this.formPasien.name_close_contact = value.name
        this.formPasien.id_close_contact = value.id_case
      }
    },
    onSelectCloseContactConfirm(value) {
      if (value) {
        this.formPasien.name_close_contact_confirm = value.name
        this.formPasien.id_close_contact_confirm = value.id_case
      }
    },
    onSelectHealthWorker(value) {
      this.formPasien.health_workers = value
    },
    handleCheckContactPremier(value) {
      if ((value) && (this.formPasien.close_contact_premier.length < 1)) {
        this.handleAddFormSupportingInvestigation()
      }
    },
    handleChangeSameHouse(value, index) {
      if (value) {
        this.formPasien.close_contact_premier[index].close_contact_address_district_code = this.formPasien.address_district_code
        this.formPasien.close_contact_premier[index].close_contact_address_district_name = this.formPasien.address_district_name
        this.formPasien.close_contact_premier[index].close_contact_address_subdistrict_code = this.formPasien.address_subdistrict_code
        this.formPasien.close_contact_premier[index].close_contact_address_subdistrict_name = this.formPasien.address_subdistrict_name
        this.formPasien.close_contact_premier[index].close_contact_address_village_code = this.formPasien.address_village_code
        this.formPasien.close_contact_premier[index].close_contact_address_village_name = this.formPasien.address_village_name
        this.formPasien.close_contact_premier[index].close_contact_rt = this.formPasien.rt
        this.formPasien.close_contact_premier[index].close_contact_rw = this.formPasien.rw
        this.formPasien.close_contact_premier[index].close_contact_address_street = this.formPasien.address_street
      } else {
        this.formPasien.close_contact_patient[index].close_contact_address_district_code = ''
        this.formPasien.close_contact_patient[index].close_contact_address_district_name = ''
        this.formPasien.close_contact_patient[index].close_contact_address_subdistrict_code = ''
        this.formPasien.close_contact_patient[index].close_contact_address_subdistrict_name = ''
        this.formPasien.close_contact_patient[index].close_contact_address_village_code = ''
        this.formPasien.close_contact_patient[index].close_contact_address_village_name = ''
        this.formPasien.close_contact_patient[index].close_contact_rt = ''
        this.formPasien.close_contact_patient[index].close_contact_rw = ''
        this.formPasien.close_contact_patient[index].close_contact_address_street = ''
      }
    }
  }
}
</script>
