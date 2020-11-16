<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.whether_hospitalized') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group
              v-model="formPasien.current_location_type"
              name="current_location_type"
              :error-messages="errors"
              row
              @change="handleChangeLocationNow"
            >
              <v-radio :label="$t('label.yes')" value="RS" />
              <v-radio :label="$t('label.no')" value="RUMAH" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group
              v-model="formPasien.is_patient_address_same"
              name="is_patient_address_same"
              :error-messages="errors"
              row
              @change="handleChangeAccordingAddress"
            >
              <v-radio :label="$t('label.according_address')" :value="true" />
              <v-radio :label="$t('label.doesnt_according_address')" :value="false" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.house_address') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <address-region
            name="address-region"
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
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.complete_house_address') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="formPasien.current_location_address"
              name="current_location_address"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RS'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.location_hospital') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-autocomplete
              v-model="formPasien.current_location_address"
              name="current_location_address"
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
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.other_places') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-if="formPasien.current_location_type === 'others'" v-slot="{ errors }" rules="required">
            <v-autocomplete
              v-model="formPasien.current_location_address"
              name="current_location_address"
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
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.there_symptoms') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <v-radio-group
              v-model="formPasien.there_are_symptoms"
              name="there_are_symptoms"
              :error-messages="errors"
              row
              @change="checkSymptoms"
            >
              <v-radio :label="$t('label.yes')" :value="true" />
              <v-radio :label="$t('label.no')" :value="false" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formPasien.there_are_symptoms"
        align="start"
      >
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label :class="formPasien.there_are_symptoms ? 'required' : ''">{{ $t('label.date_symptoms') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <input-date-picker
            name="first_symptom_date"
            :format-date="formatDate"
            :required="formPasien.there_are_symptoms ? true:false"
            :date-value="formPasien.first_symptom_date"
            :value-date.sync="formPasien.first_symptom_date"
            @changeDate="formPasien.first_symptom_date = $event"
          />
        </v-col>
      </v-row>
      <v-row
        v-if="formPasien.there_are_symptoms"
        align="start"
      >
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label :class="formPasien.there_are_symptoms ? 'required' : ''">{{ $t('label.symptoms') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" :rules="formPasien.there_are_symptoms ? 'required' : ''">
            <v-row>
              <v-col v-for="item in symptomOptions" :key="item" cols="12" sm="6" md="4">
                <label class="material-checkbox-custom">
                  <input v-model="formPasien.diagnosis" name="diagnosis" :value="item" type="checkbox">
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
              </v-col>
            </v-row>
            <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formPasien.there_are_symptoms"
        align="start"
        class="mt-4"
      >
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field v-model="formPasien.diagnosis_other" name="diagnosis_other" :placeholder="$t('label.mention_other_symptoms')" solo-inverted />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.additional_condition') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }">
          <v-row>
            <v-col v-for="item in additionalConditionOptions" :key="item" cols="12" sm="6" md="4">
              <label class="material-checkbox-custom">
                <input v-model="formPasien.diseases" name="diseases" :value="item" type="checkbox">
                <span v-if="errors.length" class="error--text">{{ item }}</span>
                <span v-else>{{ item }}</span>
              </label>
            </v-col>
          </v-row>
          <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="start" class="mt-4">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-text-field v-model="formPasien.diseases_other" name="diseases_other" :placeholder="$t('label.mention_other_additional_condition')" solo-inverted />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.diagnosis_ards') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.diagnosis_ards" name="diagnosis_ards" row>
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
        <label>{{ $t('label.diagnosis_pneumonia') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.diagnosis_pneumonia" name="diagnosis_pneumonia" row>
                <span v-for="(item, index) in answerList" :key="index">
                  <v-radio :label="item.text" :value="item.value" />
                </span>
              </v-radio-group>
            </v-row>
          </v-container>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row
      align="start"
      class="mt-4"
    >
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-text-field
            v-model="formPasien.other_diagnosis"
            name="other_diagnosis"
            :placeholder="$t('label.mention_other_additional_diagnosis')"
            solo-inverted
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.do_you_have_another_diagnosis_etiology_for_respiratory_disease') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group
                v-model="formPasien.is_other_diagnosisr_respiratory_disease"
                name="is_other_diagnosisr_respiratory_disease"
                row
              >
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
      v-if="formPasien.is_other_diagnosisr_respiratory_disease"
      align="start"
      class="mt-4"
    >
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-text-field
            v-model="formPasien.other_diagnosisr_respiratory_disease"
            name="other_diagnosisr_respiratory_disease"
            :placeholder="$t('label.state_any_other_diagnosis_etiology')"
            solo-inverted
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.physical_check') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider v-slot="{ errors }" rules="noAlphabet">
              <v-text-field
                v-model.number="formPasien.physical_check_temperature"
                name="physical_check_temperature"
                class="input-append-btn"
                solo-inverted
                :placeholder="$t('label.temperature')"
                :error-messages="errors"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    &#778;C
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_blood_pressure"
                name="physical_check_blood_pressure"
                class="input-append-btn"
                solo-inverted
                :placeholder="$t('label.blood_pressure')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    mmHg
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_pulse"
                name="physical_check_pulse"
                class="input-append-btn"
                solo-inverted
                :placeholder="$t('label.pulse')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.x_minute') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_respiration"
                name="physical_check_respiration"
                class="input-append-btn"
                solo-inverted
                :placeholder="$t('label.respiration')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.x_minute') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_height"
                name="physical_check_height"
                class="input-append-btn"
                solo-inverted
                :placeholder="$t('label.height')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Cm
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_weight"
                name="physical_check_weight"
                class="input-append-btn"
                solo-inverted
                :placeholder="$t('label.weight')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Kg
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
        <label>{{ $t('label.physical_activity') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-radio-group v-model="formPasien.pysichal_activity" name="pysichal_activity" row>
            <v-row v-for="itemPhysicalActivity in listPhysicalActivity" :key="itemPhysicalActivity.value">
              <v-col cols="12" md="12" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <v-radio :label="itemPhysicalActivity.text" :value="itemPhysicalActivity.value" />
              </v-col>
            </v-row>
          </v-radio-group>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.smoking') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.smoking" name="smoking" row>
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
        <label>{{ $t('label.consume_alcohol') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.consume_alcohol" name="consume_alcohol" row>
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
        <label class="required">{{ $t('label.criteria') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-radio-group
            v-model="formPasien.status"
            name="status"
            :error-messages="errors"
            row
            @change="handleChangeCriteria"
          >
            <v-radio :label="$t('route.tight_contact')" value="CLOSECONTACT" />
            <v-radio :label="$t('label.suspect')" value="SUSPECT" />
            <v-radio :label="$t('label.probable')" value="PROBABLE" />
            <v-radio :label="$t('label.confirmation')" value="CONFIRMATION" />
          </v-radio-group>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row v-if="formPasien.status.length > 1" align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label class="required">{{ $t('label.latest_patient_status') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-radio-group v-model="formPasien.final_result" name="final_result" :error-messages="errors" row>
            <v-radio
              v-if="rolesCriteria['stillQuarantine'].includes(formPasien.status)"
              :label="$t('label.still_quarantine')"
              value="5"
            />
            <v-radio
              v-if="rolesCriteria['stillSick'].includes(formPasien.status)"
              :label="$t('label.still_sick')"
              value="4"
            />
            <v-radio
              v-if="rolesCriteria['recovery'].includes(formPasien.status)"
              :label="$t('label.recovery')"
              value="1"
            />
            <v-radio
              v-if="rolesCriteria['discarded'].includes(formPasien.status)"
              :label="$t('label.discarded')"
              value="3"
            />
            <v-radio
              :label="$t('label.dead')"
              value="2"
            />
          </v-radio-group>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label class="required">{{ $t('label.date_last_status') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <input-date-picker
          name="last_date_status_patient"
          :format-date="formatDate"
          :date-value="formPasien.last_date_status_patient"
          :value-date.sync="formPasien.last_date_status_patient"
          :label="$t('label.select_date_last_status')"
          :required="true"
          @changeDate="formPasien.last_date_status_patient = $event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import {
  symptomOptions,
  rolesCriteria,
  additionalConditionOptions,
  listPhysicalActivity,
  answerList,
  yesOrNoAnswer
} from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FormCaseHistory',
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
      symptomOptions: symptomOptions,
      formatDate: 'YYYY/MM/DD',
      disabledReportResource: false,
      hospitalWestJavaList: [],
      hospitalNonWestJavaList: [],
      listPhysicalActivity: listPhysicalActivity,
      additionalConditionOptions: additionalConditionOptions,
      answerList: answerList,
      yesOrNoAnswer: yesOrNoAnswer,
      rolesCriteria: rolesCriteria
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  watch: {
    'formPasien.according_address'(value) {
      this.handleChangeAccordingAddress(value)
    }
  },
  async mounted() {
    const paramHospitalWestJava = { 'rs_jabar': true }
    const paramHospitalNonWestJava = { 'rs_jabar': false }
    const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
    this.hospitalWestJavaList = responseWestJava.data
    const responseNonWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalNonWestJava)
    this.hospitalNonWestJavaList = responseNonWestJava.data
    if (this.roles[0] === 'faskes') {
      this.formPasien.report_source = this.fullName
      this.disabledReportResource = true
    }
  },
  methods: {
    checkSymptoms() {
      this.formPasien.first_symptom_date = ''
    },
    onSelectHospital(value) {
      this.formPasien.current_hospital_id = value._id
      this.formPasien.current_location_address = value.name
    },
    handleChangeCriteria() {
      this.formPasien.final_result = ''
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
    },
    handleChangeAccordingAddress(value) {
      if (value) {
        this.formPasien.current_location_district_code = this.formPasien.address_district_code
        this.formPasien.current_location_subdistrict_code = this.formPasien.address_subdistrict_code
        this.formPasien.current_location_village_code = this.formPasien.address_village_code
        this.formPasien.current_location_village_name = this.formPasien.address_village_name
        this.formPasien.current_location_address = this.formPasien.address_street
      } else {
        this.formPasien.current_location_district_code = ''
        this.formPasien.current_location_subdistrict_code = ''
        this.formPasien.current_location_village_code = ''
        this.formPasien.current_location_village_name = ''
        this.formPasien.current_location_address = ''
      }
    }
  }
}
</script>
