<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.criteria') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group
              v-model="formPasien.status"
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
            <v-radio-group v-model="formPasien.final_result" :error-messages="errors" row>
              <v-radio
                v-if="rolesCriteria['stillQuarantine'].includes(formPasien.status)"
                :label="$t('label.still_quarantine')"
                value="5"
                @click.prevent="uncheck('5')"
              />
              <v-radio
                v-if="rolesCriteria['stillSick'].includes(formPasien.status)"
                :label="$t('label.still_sick')"
                value="4"
                @click.prevent="uncheck('4')"
              />
              <v-radio
                v-if="rolesCriteria['recovery'].includes(formPasien.status)"
                :label="$t('label.recovery')"
                value="1"
                @click.prevent="uncheck('1')"
              />
              <v-radio
                v-if="rolesCriteria['discarded'].includes(formPasien.status)"
                :label="$t('label.discarded')"
                value="3"
                @click.prevent="uncheck('3')"
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
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <input-date-picker
            :format-date="formatDate"
            :date-value="formPasien.last_date_status_patient"
            :value-date.sync="formPasien.last_date_status_patient"
            :label="$t('label.select_date_last_status')"
            @changeDate="formPasien.last_date_status_patient = $event"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import {
  rolesCriteria
} from '@/utils/constantVariable'
export default {
  name: 'FormCriteriaPatient',
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
      rolesCriteria,
      formatDate: 'YYYY/MM/DD',
      currenDate: new Date()
    }
  },
  methods: {
    handleChangeCriteria() {
      this.formPasien.final_result = ''
    },
    uncheck(value) {
      if (value === this.formPasien.final_result) {
        this.formPasien.final_result = ''
      } else {
        this.formPasien.final_result = value
      }
    }
  }
}
</script>
