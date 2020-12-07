<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row align="start" class="pb-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.contact_type') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-4': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <v-radio-group
              v-model="formBody.contact_type"
              :error-messages="errors"
              row
            >
              <v-radio
                :label="$t('label.housemate')"
                :value="0"
              />
              <v-radio
                :label="$t('label.health_workers')"
                :value="1"
              />
              <v-radio
                :label="$t('label.others')"
                :value="2"
              />
            </v-radio-group>
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
          <label>{{ $t('label.where_contact_meet_with_confirmation_case') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider v-slot="{ errors }">
            <v-radio-group
              v-model="formBody.contact_place"
              :error-messages="errors"
              row
            >
              <v-radio
                :label="$t('label.home')"
                :value="0"
              />
              <v-radio
                :label="$t('label.workplace')"
                :value="1"
              />
              <v-radio
                :label="$t('label.tour_group')"
                :value="2"
              />
              <v-radio
                :label="$t('label.medical_facility')"
                :value="3"
              />
              <v-radio
                :label="$t('label.others')"
                :value="4"
              />
            </v-radio-group>
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
          <label class="required">{{ $t('label.when_will_contacts_meet_with_confirmed_cases') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <input-date-picker
            :format-date="formatDate"
            :required="true"
            :date-value="formBody.contact_date"
            :value-date.sync="formBody.contact_date"
            @changeDate="formBody.contact_date = $event"
          />
        </v-col>
      </v-row>
      <v-row align="start" class="pb-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.how_long_did_contacts_interact_with_confirmed_cases') }}
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
            <v-text-field
              v-model="formBody.contact_durations"
              :error-messages="errors"
              type="number"
              min="0"
              max="120"
              solo-inverted
              oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
              class="input-append-btn"
            >
              <template v-slot:append>
                <v-btn
                  depressed
                  tile
                  min-width="20"
                >
                  {{ $t('label.minute_day') }}
                </v-btn>
              </template>
            </v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { protectionToolOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormExposureInformation',
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
      protectionToolOptions,
      formatDate: 'YYYY/MM/DD'
    }
  },
  methods: {
    //
  }
}
</script>
