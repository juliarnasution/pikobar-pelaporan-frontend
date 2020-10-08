<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.interviewer_name') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field
              v-model="formPasien.interviewers_name"
              name="interviewers_name"
              type="text"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.interviewer_phone') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="isPhoneNumber">
            <v-text-field
              v-model="formPasien.interviewers_phone_number"
              name="interviewers_phone_number"
              :error-messages="errors"
              placeholder="08xxxxxxxxx"
              solo-inverted
              type="number"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.interview_date') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <input-date-picker
            name="interview_date"
            :format-date="formatDate"
            :label="$t('label.interview_date')"
            :date-value="formPasien.interview_date"
            :value-date.sync="formPasien.interview_date"
            @changeDate="handleChangeInterviewDate"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'FormVolunteer',
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
      formatDate: 'YYYY/MM/DD',
      currenDate: new Date()
    }
  },
  mounted() {
    this.formPasien.interview_date = this.$moment(this.currenDate).format(
      'YYYY/MM/DD'
    )
  },
  methods: {
    handleChangeInterviewDate(value) {
      this.formPasien.interview_date = value
    }
  }
}
</script>
