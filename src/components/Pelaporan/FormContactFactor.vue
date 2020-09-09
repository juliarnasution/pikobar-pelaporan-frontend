<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.travel_history') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-radio-group v-model="formPasien.travel" row>
              <v-radio :label="$t('label.from_out_of_country')" :value="1" />
              <v-radio :label="$t('label.from_out_of_city')" :value="0" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.travel === 1 || formPasien.travel === 0" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ formPasien.travel === 1 ? $t('label.country_visited') : $t('label.city_visited') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="formPasien.visited"
              :error-messages="errors"
              type="text"
              solo-inverted
              :placeholder="formPasien.travel === 1 ? $t('label.country_visited') : $t('label.city_visited')"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.travel === 1 || formPasien.travel === 0" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.start_travel') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <input-date-picker
              :format-date="formatDate"
              :error-messages="errors"
              :label="$t('label.start_travel')"
              :required="true"
              :date-value="formPasien.start_travel"
              :value-date.sync="formPasien.start_travel"
              @changeDate="handleChangeStartTravel"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.travel === 1 || formPasien.travel === 0" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.end_travel') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <input-date-picker
              :format-date="formatDate"
              :error-messages="errors"
              :label="$t('label.end_travel')"
              :required="true"
              :date-value="formPasien.end_travel"
              :value-date.sync="formPasien.end_travel"
              @changeDate="handleChangeEndTravel"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.close_contact') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact" row>
                  <span v-for="(item, index) in answerList" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact === 1" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-autocomplete
              :no-data-text="$t('label.data_not_found')"
              :placeholder="$t('label.no_data_autocomplete_patient')"
              :search-input.sync="searchPatientCloseContact"
              :items="patientCloseContactList"
              :return-object="true"
              item-value="id_case"
              item-text="name"
              menu-props="auto"
              single-line
              solo
              autocomplete
              clearable
              @change="onSelectCloseContact"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.close_contact_confirm') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_confirm" row>
                  <span v-for="(item, index) in answerList" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_confirm === 1" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-autocomplete
              :no-data-text="$t('label.data_not_found')"
              :placeholder="$t('label.no_data_autocomplete_patient')"
              :search-input.sync="searchPatientCloseContactConfirm"
              :items="patientCloseContactConfirmList"
              :return-object="true"
              item-value="id_case"
              item-text="name"
              menu-props="auto"
              single-line
              solo
              autocomplete
              clearable
              @change="onSelectCloseContactConfirm"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.visit_animal_market') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_animal_market" row>
                  <span v-for="(item, index) in answerList" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_animal_market === 1" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field v-model="formPasien.animal_market_other" :error-messages="errors" type="text" solo-inverted :placeholder="$t('label.location')" />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_animal_market === 1">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.date_of_visit')" :date-value="formPasien.animal_market_date" :value-date.sync="formPasien.animal_market_date" @changeDate="handleChangeVisitAnimalMarketDate" />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.visit_public_place') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_public_place" row>
                  <span v-for="(item, index) in answerList" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_public_place === 1" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field v-model="formPasien.public_place_other" :error-messages="errors" type="text" solo-inverted :placeholder="$t('label.location')" />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_public_place === 1">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.date_of_visit')" :date-value="formPasien.public_place_date" :value-date.sync="formPasien.public_place_date" @changeDate="handleChangeVisitPublicPlaceDate" />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.visit_medical_facility') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_medical_facility" row>
                  <span v-for="(item, index) in answerList" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_medical_facility === 1" align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field v-model="formPasien.medical_facility_other" :error-messages="errors" type="text" solo-inverted :placeholder="$t('label.location')" />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.close_contact_medical_facility === 1">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.date_of_visit')" :date-value="formPasien.medical_facility_date" :value-date.sync="formPasien.medical_facility_date" @changeDate="handleChangeVisitMedicalFacilityDate" />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.heavy_ispa_group') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_heavy_ispa_group" row>
                  <span v-for="(item, index) in answerList" :key="index">
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
          <label>{{ $t('label.health_worker') }}</label>
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
      <v-row v-if="formPasien.close_contact_health_worker === true">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <v-select
              v-model="formPasien.health_workers"
              :items="healthWorkerList"
              :label="$t('label.choose_health_worker')"
              item-value="value"
              item-text="text"
              solo
              :error-messages="errors"
              @change="onSelectHealthWorker"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.protective_equipment_used') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in apdList" :key="item" cols="6" sm="6" md="4">
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
      <br>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { answerList, yesOrNoAnswer, healthWorkerList, apd } from '@/utils/constantVariable'

export default {
  name: 'FormContactFactor',
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
      answerList: answerList,
      yesOrNoAnswer: yesOrNoAnswer,
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
    }
  }
}
</script>

