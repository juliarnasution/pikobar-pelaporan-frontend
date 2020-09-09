<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.primary_contact_label_1') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.close_contacted_before_sick_14_days ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="closeContactPremierPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.primary_contact') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <div v-if="detail.last_history.close_contact_premier.length > 0">
                <div v-for="(data, index) in detail.last_history.close_contact_premier" :key="index">
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.contact_name') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.close_contact_name }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.contact_criteria') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.close_contact_criteria }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.address_home') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ completeAddress(
                        data.close_contact_address_district_name,
                        data.close_contact_address_subdistrict_name,
                        data.close_contact_address_village_name,
                        data.close_contact_address_street
                      ) }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.relationship') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.close_contact_relation }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.first_contact_date') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ handlerDate(data.close_contact_first_date) }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.last_contact_date') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ handlerDate(data.close_contact_last_date) }}</p>
                    </v-col>
                  </v-row>
                  <v-divider />
                </div>
              </div>
              <div v-else class="text-center">
                -
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.primary_contact_label_2') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.close_contact_heavy_ispa_group ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.primary_contact_label_3') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.close_contact_have_pets ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.primary_contact_label_4') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.close_contact_health_worker ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.protective_equipment_used') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.apd_use.length > 0 ? splitArray(detail.last_history.apd_use):'-' }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.primary_contact_label_5') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.close_contact_performing_aerosol_procedures ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { completeAddress } from '@/utils/utilsFunction'
export default {
  name: 'DetailContactFactor',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      closeContactPremierPanel: [0]
    }
  },
  methods: {
    completeAddress,
    handlerDate(date) {
      date = this.$moment(date).format('DD MMMM YYYY')
      return date
    },
    splitArray(array) {
      if (array === undefined) return
      const result = array.join(',', array)
      return result
    }
  }
}
</script>
