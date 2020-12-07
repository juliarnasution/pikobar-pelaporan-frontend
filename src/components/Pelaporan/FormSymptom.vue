<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.date_symptoms') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider>
            <input-date-picker
              :format-date="formatDate"
              :date-value="formBody.latest_history.symptoms_date"
              :value-date.sync="formBody.latest_history.symptoms_date"
              @changeDate="formBody.latest_history.symptoms_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="pb-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.symptoms') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in symptomOptions" :key="item" cols="12" sm="6" md="6">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formBody.latest_history.symptoms"
                    :value="item"
                    type="checkbox"
                  >
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
              </v-col>
            </v-row>
            <span
              v-if="errors.length"
              class="v-messages error--text"
            >{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="mt-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        />
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider>
            <v-text-field
              v-model="formBody.latest_history.symptoms_other"
              :placeholder="$t('label.mention_other_symptoms')"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="pb-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.additional_condition') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in additionalConditionOptions" :key="item" cols="12" sm="6" md="6">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formBody.latest_history.diseases"
                    :value="item"
                    type="checkbox"
                  >
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
              </v-col>
            </v-row>
            <span
              v-if="errors.length"
              class="v-messages error--text"
            >{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="mt-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        />
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider>
            <v-text-field
              v-model="formBody.latest_history.diseases_other"
              :placeholder="$t('label.mention_other_additional_condition')"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { symptomOptions, additionalConditionOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormSymptom',
  components: {
    ValidationProvider
  },
  props: {
    formBody: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      symptomOptions,
      additionalConditionOptions,
      formatDate: 'YYYY/MM/DD'
    }
  },
  methods: {
    //
  }
}
</script>
