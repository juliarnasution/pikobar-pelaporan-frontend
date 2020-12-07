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
          <label>{{ $t('label.nasal_swab') }}</label>
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
              v-model="formBody.latest_history.test_nasal_swab"
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
        v-if="formBody.latest_history.test_nasal_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.date') }}
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
              :date-value="formBody.latest_history.test_nasal_swab_date"
              :value-date.sync="formBody.latest_history.test_nasal_swab_date"
              @changeDate="formBody.latest_history.test_nasal_swab_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.latest_history.test_nasal_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.results') }}</label>
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
              v-model="formBody.latest_history.test_nasal_swab_result"
              type="text"
              :error-messages="errors"
              solo-inverted
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
          <label>{{ $t('label.throat_swab') }}</label>
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
              v-model="formBody.latest_history.test_throat_swab"
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
        v-if="formBody.latest_history.test_throat_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.date') }}
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
              :date-value="formBody.latest_history.test_throat_swab_date"
              :value-date.sync="formBody.latest_history.test_throat_swab_date"
              @changeDate="formBody.latest_history.test_throat_swab_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.latest_history.test_throat_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.results') }}</label>
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
              v-model="formBody.latest_history.test_throat_swab_result"
              type="text"
              :error-messages="errors"
              solo-inverted
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
          <label>{{ $t('label.nasopharyngeal_swab') }}</label>
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
              v-model="formBody.latest_history.test_nasopharyngeal_swab"
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
        v-if="formBody.latest_history.test_nasopharyngeal_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.date') }}
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
              :date-value="formBody.latest_history.test_nasopharyngeal_swab_date"
              :value-date.sync="formBody.latest_history.test_nasopharyngeal_swab_date"
              @changeDate="formBody.latest_history.test_nasopharyngeal_swab_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.latest_history.test_nasopharyngeal_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.results') }}</label>
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
              v-model="formBody.latest_history.test_nasopharyngeal_swab_result"
              type="text"
              :error-messages="errors"
              solo-inverted
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
          <label>{{ $t('label.orofaringeal_swab') }}</label>
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
              v-model="formBody.latest_history.test_orofaringeal_swab"
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
        v-if="formBody.latest_history.test_orofaringeal_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.date') }}
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
              :date-value="formBody.latest_history.test_orofaringeal_swab_date"
              :value-date.sync="formBody.latest_history.test_orofaringeal_swab_date"
              @changeDate="formBody.latest_history.test_orofaringeal_swab_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.latest_history.test_orofaringeal_swab"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.results') }}</label>
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
              v-model="formBody.latest_history.test_orofaringeal_swab_result"
              type="text"
              :error-messages="errors"
              solo-inverted
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
          <label>{{ $t('label.serum') }}</label>
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
              v-model="formBody.latest_history.test_serum"
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
    </v-form>
  </div>
</template>
<script>
import { protectionToolOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormSupportingInvestigation',
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
