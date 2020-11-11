<template>
  <div>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="volunteerPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_volunteer_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-volunteer :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="patientPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_patient_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-patient :detail="detail" />
              <detail-socio-economic-history :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="historyCasePanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_case_history_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-case-history :detail="detail" />
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
              <detail-supporting-investigation :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="travelHistoryFactorPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.travel_history_factor') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-travel-history-factor :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="contactFactorPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_eposure_factor_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-contact-factor :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="multipleCloseContactPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.related_contacts') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-close-contact :detail="closeContactCase" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>

</template>
<script>
export default {
  name: 'NewCaseDetail',
  props: {
    detail: {
      type: Object,
      default: null
    },
    closeContactCase: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      volunteerPanel: [0],
      patientPanel: [0],
      historyCasePanel: [0],
      supportingInvestigationPanel: [0],
      travelHistoryFactorPanel: [0],
      contactFactorPanel: [0],
      historySocioEconomicPanel: [0],
      multipleCloseContactPanel: [0]
    }
  }
}
</script>
<style scoped>
.row-detail {
    margin-bottom: -24px;
    color: #828282;
}
</style>
