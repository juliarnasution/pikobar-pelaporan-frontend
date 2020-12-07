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
          <label>{{ $t('label.contact_date') }}</label>
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
              :date-value="formBody.home_contact_date"
              :value-date.sync="formBody.home_contact_date"
              @changeDate="formBody.home_contact_date = $event"
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
          <label>{{ $t('label.number_contact_days__move_in_same_room_primary_case') }}</label>
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
            <v-text-field
              v-model="formBody.home_contact_days"
              :error-messages="errors"
              type="number"
              min="0"
              max="30"
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
                  {{ $t('label.day') }}
                </v-btn>
              </template>
            </v-text-field>
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
          <label>{{ $t('label.has_contact_ever_done_this_activity_primary_case_at_home_before_going_hospital') }} </label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in activityContactOptions" :key="item" cols="12" sm="6" md="6">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formBody.home_contact_activities"
                    :value="item"
                    type="checkbox"
                  >
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
                <span
                  v-if="errors.length"
                  class="v-messages error--text"
                >{{ errors[0] }}</span>
              </v-col>
            </v-row>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { activityContactOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormCloselyContactHome',
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
      activityContactOptions,
      formatDate: 'YYYY/MM/DD'
    }
  },
  methods: {
    //
  }
}
</script>
