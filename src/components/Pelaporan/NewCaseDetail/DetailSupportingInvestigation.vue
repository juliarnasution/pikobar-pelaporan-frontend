<template>
  <div>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="physicalExaminationPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.physical_check') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <v-row class="row-detail">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <p>{{ $t('label.temperature') }}</p>
                </v-col>
                <v-col>
                  <p>{{ detail.last_history.physical_check_temperature }}</p>
                </v-col>
              </v-row>
              <v-row class="row-detail">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <p>{{ $t('label.blood_pressure') }}</p>
                </v-col>
                <v-col>
                  <p>{{ detail.last_history.physical_check_blood_pressure }}</p>
                </v-col>
              </v-row>
              <v-row class="row-detail">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <p>{{ $t('label.pulse') }}</p>
                </v-col>
                <v-col>
                  <p>{{ detail.last_history.physical_check_pulse }}</p>
                </v-col>
              </v-row>
              <v-row class="row-detail">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <p>{{ $t('label.respiration') }}</p>
                </v-col>
                <v-col>
                  <p>{{ detail.last_history.physical_check_respiration }}</p>
                </v-col>
              </v-row>
              <v-row class="row-detail">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <p>{{ $t('label.height') }}</p>
                </v-col>
                <v-col>
                  <p>{{ detail.last_history.physical_check_height }}</p>
                </v-col>
              </v-row>
              <v-row class="row-detail">
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                >
                  <p>{{ $t('label.weight') }}</p>
                </v-col>
                <v-col>
                  <p>{{ detail.last_history.physical_check_weight }}</p>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="supportingInvestigationPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.supporting_investigation') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <div v-if="detail.inspection_support">
                <div v-for="(data, index) in detail.inspection_support" :key="index">
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.checking_type') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.inspection_type === 'lab_cofirm' ? $t('label.confirmation_lab'):$t('label.other_checks') }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.specimen_type') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.specimens_type }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.inspection_date') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ handlerDate(data.inspection_date) }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.place_testing') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.inspection_location }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.collection_specimen') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.get_specimens_to }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.test_results') }}</p>
                    </v-col>
                    <v-col>
                      <p><inspection-result :inspection-result="data.inspection_result" /></p>
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
  </div>
</template>
<script>
export default {
  name: 'DetailSupportingInvestigation',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      physicalExaminationPanel: [0],
      supportingInvestigationPanel: [0]
    }
  },
  methods: {
    handlerDate(date) {
      date = this.$moment(date).format('DD MMMM YYYY')
      return date
    }
  }
}
</script>
