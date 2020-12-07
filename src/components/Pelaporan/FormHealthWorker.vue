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
          <label>{{ $t('label.is_contact_health_officer') }}</label>
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
              v-model="formBody.officer_is_contact"
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
      <v-row align="start" class="pb-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.protection_equipment_used') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in protectionToolOptions" :key="item" sm="6" md="6">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formBody.officer_protection_tools"
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
import { protectionToolOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormHealthWorker',
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
