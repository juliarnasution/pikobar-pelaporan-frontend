<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <div>
        <v-container fluid>
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
        </v-container>
      </div>
      <div v-for="(data, index) in formPasien.inspection_support" :key="index" :class="`form-${index + 1}`">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.supporting_investigation')} ${index+1}` }}
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
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.checking_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-radio-group v-model="data.inspection_type" row>
                      <v-radio :label="$t('label.confirmation_lab')" value="lab_cofirm" />
                      <v-radio :label="$t('label.other_checks')" value="other_checks" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.specimen_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-select
                      v-model="data.specimens_type"
                      :items="specimenType"
                      solo
                    />
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
                      :date-value="data.inspection_date"
                      :value-date.sync="data.inspection_date"
                      :label="$t('label.choose_date')"
                      @changeDate="data.inspection_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.place_testing') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="data.inspection_location"
                      :label="$t('label.enter_place')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.collection_specimen') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" rules="noAlphabet">
                    <v-text-field
                      v-model.number="data.get_specimens_to"
                      :label="$t('label.enter_number_takes')"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.test_results') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }">
                    <v-radio-group v-model="data.inspection_result" :error-messages="errors" row>
                      <v-radio
                        v-if="data.inspection_type === 'other_checks'"
                        :label="$t('label.reaktif')"
                        value="reactif"
                      />
                      <v-radio
                        v-if="data.inspection_type === 'other_checks'"
                        :label="$t('label.non_reaktif')"
                        value="non_reactif"
                      />
                      <v-radio
                        :label="$t('label.positif')"
                        value="positif"
                      />
                      <v-radio
                        :label="$t('label.negatif')"
                        value="negatif"
                      />
                      <v-radio
                        :label="$t('label.inkonklusif')"
                        value="inkonklusif"
                      />
                      <v-radio
                        :label="$t('label.invalid')"
                        value="invalid"
                      />
                      <v-radio
                        :label="$t('label.in_process')"
                        value="on_progress"
                      />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container fluid style="position: static;">
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormSupportingInvestigation">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_supporting_investigation') }}</p>
        </v-card>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { specimenType } from '@/utils/constantOption'
import { scrollUp } from '@/utils/utilsFunction'
export default {
  name: 'FormMultipleSupportingInvestigation',
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
      isAddCloseContactForm: false,
      specimenType: specimenType,
      totalCloseContact: 0,
      idCloseContactForm: 0,
      isValid: false,
      showAlert: false,
      formatDate: 'YYYY/MM/DD'
    }
  },
  mounted() {
    // this.handleAddFormSupportingInvestigation()
  },
  methods: {
    handleAddFormSupportingInvestigation() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.inspection_support.push({
        id: this.idCloseContactForm,
        specimens_type: '',
        inspection_date: '',
        inspection_location: '',
        get_specimens_to: '',
        inspection_result: ''
      })
      if (this.formPasien.inspection_support.length > 0) {
        const index = this.formPasien.inspection_support.length
        setTimeout(function() {
          const key = `.form-${index}`
          scrollUp(key)
        }, 500)
      }
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.inspection_support.splice(index, 1)
      this.isValid = this.formPasien.inspection_support.length !== 0
    },
    handleChangeContactDate(value, index) {
      this.formPasien.inspection_support[index].contact_date = value
    }
  }
}
</script>
