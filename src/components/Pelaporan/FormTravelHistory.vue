<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row align="start" class="pb-6">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.travel_history') }}
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
            <v-checkbox
              v-model="formBody.travel_is_went_abroad"
              :label="$t('label.from_abroad')"
              class="mt-0 pt-0"
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.travel_is_went_abroad"
        align="start"
      >
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
          <ValidationProvider
            v-slot="{ errors }"
          >
            <v-autocomplete
              v-model="formBody.travel_visited_country"
              :items="listCountry"
              item-text="name"
              item-value="name"
              :error-messages="errors"
              :placeholder="$t('label.country_origin')"
              clearable
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.travel_is_went_abroad"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.travel_start_date') }}</label>
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
              :date-value="formBody.travel_country_depart_date"
              :value-date.sync="formBody.travel_country_depart_date"
              @changeDate="formBody.travel_country_depart_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.travel_is_went_abroad"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.date_arrival_indonesia') }}</label>
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
              :date-value="formBody.travel_country_return_date"
              :value-date.sync="formBody.travel_country_return_date"
              @changeDate="formBody.travel_country_return_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="pb-6">
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
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="isHtml"
          >
            <v-checkbox
              v-model="formBody.travel_is_went_other_city"
              :label="$t('label.from_outside_city')"
              class="mt-0 pt-0"
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.travel_is_went_other_city"
        align="start"
      >
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
          <ValidationProvider
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="formBody.travel_visited_city"
              type="text"
              :placeholder="$t('label.city_visited')"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.travel_is_went_other_city"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.travel_start_date') }}</label>
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
              :date-value="formBody.travel_city_depart_date"
              :value-date.sync="formBody.travel_city_depart_date"
              @changeDate="formBody.travel_city_depart_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row
        v-if="formBody.travel_is_went_other_city"
        align="start"
      >
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.return_date') }}</label>
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
              :date-value="formBody.travel_city_return_date"
              :value-date.sync="formBody.travel_city_return_date"
              @changeDate="formBody.travel_city_return_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="pb-3">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.profession') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <v-select
              v-model="formBody.travel_occupation"
              :items="occupationList"
              :error-messages="errors"
              item-value="title"
              item-text="title"
              menu-props="auto"
              solo
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
          <label>{{ $t('label.office_address') }}</label>
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
            <v-textarea
              v-model="formBody.travel_address_office"
              :error-messages="errors"
              solo
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
          <label class="required">{{ $t('label.transportation_used_daily') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <v-row>
              <v-col v-for="item in transportOptions" :key="item" cols="12" sm="6" md="6">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formBody.travel_transportations"
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
    </v-form>
  </div>
</template>
<script>
import { transportOptions } from '@/utils/constantOption'
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'FormTravelHistory',
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
      listCountry: [],
      formatDate: 'YYYY/MM/DD'
    }
  },
  computed: {
    ...mapGetters('occupation', [
      'occupationList'
    ])
  },
  async mounted() {
    await this.$store.dispatch('occupation/getListOccuption')
    const response = await this.$store.dispatch('region/listCountry')
    this.listCountry = response.data
  },
  methods: {
    //
  }
}
</script>
