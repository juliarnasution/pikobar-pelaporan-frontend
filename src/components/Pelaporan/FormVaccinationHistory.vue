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
          <label>{{ $t('label.have_you_had_influenza_vaccination') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
          >
            <v-radio-group
              v-model="formBody.latest_history.vaccination_influenza_vaccine"
              :error-messages="errors"
              row
            >
              <v-radio
                :label="$t('label.yes')"
                :value="true"
              />
              <v-radio
                :label="$t('label.no')"
                :value="false"
              />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.latest_history.vaccination_influenza_vaccine"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.date_vaccination') }}
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider>
            <input-date-picker
              :format-date="formatDate"
              :date-value="formBody.latest_history.vaccination_influenza_vaccine_date"
              :value-date.sync="formBody.latest_history.vaccination_influenza_vaccine_date"
              @changeDate="formBody.latest_history.vaccination_influenza_vaccine_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.have_you_ever_carried_out_pvc_vaccination') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
          >
            <v-radio-group
              v-model="formBody.latest_history.vaccination_pvc_vaccine"
              :error-messages="errors"
              row
            >
              <v-radio
                :label="$t('label.yes')"
                :value="true"
              />
              <v-radio
                :label="$t('label.no')"
                :value="false"
              />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.latest_history.vaccination_pvc_vaccine"
        align="start"
        class="pb-4"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.date_vaccination') }}</label>
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
              :date-value="formBody.latest_history.vaccination_pvc_vaccine_date"
              :value-date.sync="formBody.latest_history.vaccination_pvc_vaccine_date"
              @changeDate="formBody.latest_history.vaccination_pvc_vaccine_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { transportOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormVaccinationHistory',
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
      transportOptions,
      formatDate: 'YYYY/MM/DD'
    }
  },
  methods: {
    //
  }
}
</script>
