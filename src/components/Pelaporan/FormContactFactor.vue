<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.primary_contact_label_1') }}</label>
        </v-col>
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group
              v-model="formPasien.close_contacted_before_sick_14_days"
              :error-messages="errors"
              row
            >
              <v-radio :label="$t('label.yes')" :value="true" />
              <v-radio :label="$t('label.no')" :value="false" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_2') }}</label>
        </v-col>
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_3') }}</label>
        </v-col>
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_4') }}</label>
        </v-col>
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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
        align="center"
      >
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_5') }}</label>
        </v-col>
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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
        <v-col cols="12" md="6" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="6" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
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

