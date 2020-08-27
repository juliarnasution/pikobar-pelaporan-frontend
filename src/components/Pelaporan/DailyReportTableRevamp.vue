<template>
  <div>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.provincial_health_service') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>{{ $t('label.west_java') }}</v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.district_or_city_health_service') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>{{ fullName }}</v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.name_of_officer_or_cellphone') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>{{ phoneNumber }}</v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.date') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>{{ reportingDate }} </v-col>
    </v-row>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">&nbsp;</th>
            <th class="text-left font-weight-bold subtitle-">{{ $t('label.status') }}</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.today') }}</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.amount_in_the_past_1_week') }}</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.amount_in_the_past_1_month') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td class="font-weight-bold">{{ $t('label.suspect_case_data') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases') }}</td>
            <td>{{ data ? data.suspect.aDay:0 }}</td>
            <td>{{ data ? data.suspect.aWeek:0 }}</td>
            <td>{{ data ? data.suspect.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_possible_cases') }}</td>
            <td>{{ data ? data.probable.aDay:0 }}</td>
            <td>{{ data ? data.probable.aWeek:0 }}</td>
            <td>{{ data ? data.probable.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases_isolated') }}</td>
            <td>{{ data ? data.suspectIsolated.aDay:0 }}</td>
            <td>{{ data ? data.suspectIsolated.aWeek:0 }}</td>
            <td>{{ data ? data.suspectIsolated.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases_discarded') }}</td>
            <td>{{ data ? data.suspectDiscarded.aDay:0 }}</td>
            <td>{{ data ? data.suspectDiscarded.aWeek:0 }}</td>
            <td>{{ data ? data.suspectDiscarded.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>2</td>
            <td class="font-weight-bold">{{ $t('label.confirmation_case_data') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmation_cases') }}</td>
            <td>{{ data ? data.confirmed.aDay:0 }}</td>
            <td>{{ data ? data.confirmed.aWeek:0 }}</td>
            <td>{{ data ? data.confirmed.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmation_cases_is_symptomatic') }}</td>
            <td>{{ data ? data.confirmedSymptomatic.aDay:0 }}</td>
            <td>{{ data ? data.confirmedSymptomatic.aWeek:0 }}</td>
            <td>{{ data ? data.confirmedSymptomatic.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmed_cases_is_asymptomatic') }}</td>
            <td>{{ data ? data.confirmedAsymptomatic.aDay:0 }}</td>
            <td>{{ data ? data.confirmedAsymptomatic.aWeek:0 }}</td>
            <td>{{ data ? data.confirmedAsymptomatic.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_travel_confirmation_cases_import') }}</td>
            <td>{{ data ? data.confirmedTravel.aDay:0 }}</td>
            <td>{{ data ? data.confirmedTravel.aWeek:0 }}</td>
            <td>{{ data ? data.confirmedTravel.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_contact_confirmation_cases') }}</td>
            <td>{{ data ? data.confirmedContact.aDay:0 }}</td>
            <td>{{ data ? data.confirmedContact.aWeek:0 }}</td>
            <td>{{ data ? data.confirmedContact.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmation_issues_is_not_on_the_trip_report_or_close_contact') }}</td>
            <td>{{ data ? data.confirmedNoTravel.aDay:0 }}</td>
            <td>{{ data ? data.confirmedNoTravel.aWeek:0 }}</td>
            <td>{{ data ? data.confirmedNoTravel.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.done_isolation_case_confirmation_today') }}</td>
            <td>{{ data ? data.confirmedRecovered.aDay:0 }}</td>
            <td>{{ data ? data.confirmedRecovered.aWeek:0 }}</td>
            <td>{{ data ? data.confirmedRecovered.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>3</td>
            <td class="font-weight-bold">{{ $t('label.close_contact_monitoring_data') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmed_cases_trace_close_contact') }}</td>
            <td>{{ data ? data.closeContact.aDay:0 }}</td>
            <td>{{ data ? data.closeContact.aWeek:0 }}</td>
            <td>{{ data ? data.closeContact.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_new_close_contacts') }}</td>
            <td>{{ data ? data.closeContactNew.aDay:0 }}</td>
            <td>{{ data ? data.closeContactNew.aWeek:0 }}</td>
            <td>{{ data ? data.closeContactNew.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts_is_a_suspect_case') }}</td>
            <td>{{ data ? data.closeContactSuspect.aDay:0 }}</td>
            <td>{{ data ? data.closeContactSuspect.aWeek:0 }}</td>
            <td>{{ data ? data.closeContactSuspect.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts') }}</td>
            <td>{{ data ? data.closeContactConfirmed.aDay:0 }}</td>
            <td>{{ data ? data.closeContactConfirmed.aWeek:0 }}</td>
            <td>{{ data ? data.closeContactConfirmed.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contact_defaulting_playback') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts_disposed') }}</td>
            <td>{{ data ? data.closeContactDiscarded.aDay:0 }}</td>
            <td>{{ data ? data.closeContactDiscarded.aWeek:0 }}</td>
            <td>{{ data ? data.closeContactDiscarded.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>4</td>
            <td class="font-weight-bold">{{ $t('label.case_data_died') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.died_RT_PCR_plus') }}</td>
            <td>{{ data ? data.deceaseConfirmed.aDay:0 }}</td>
            <td>{{ data ? data.deceaseConfirmed.aWeek:0 }}</td>
            <td>{{ data ? data.deceaseConfirmed.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.probable_died') }}</td>
            <td>{{ data ? data.deceaseProbable.aDay:0 }}</td>
            <td>{{ data ? data.deceaseProbable.aWeek:0 }}</td>
            <td>{{ data ? data.deceaseProbable.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>5</td>
            <td class="font-weight-bold">{{ $t('label.RT_PCR_examination') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_cases_taken_specimens_or_swabs') }}</td>
            <td>{{ data ? data.rapidTest.aDay:0 }}</td>
            <td>{{ data ? data.rapidTest.aWeek:0 }}</td>
            <td>{{ data ? data.rapidTest.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>6</td>
            <td class="font-weight-bold">{{ $t('label.serological_surveillance') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_quick_tests') }}</td>
            <td>{{ data ? data.rapidTest.aDay:0 }}</td>
            <td>{{ data ? data.rapidTest.aWeek:0 }}</td>
            <td>{{ data ? data.rapidTest.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.total_reactive_rapid_test') }}</td>
            <td>{{ data ? data.rapidTestReactive.aDay:0 }}</td>
            <td>{{ data ? data.rapidTestReactive.aWeek:0 }}</td>
            <td>{{ data ? data.rapidTestReactive.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.reactive_amount_check_RTPCR') }}</td>
            <td>{{ data ? data.pcr.aDay:0 }}</td>
            <td>{{ data ? data.pcr.aWeek:0 }}</td>
            <td>{{ data ? data.pcr.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.reactive_amount_with_RTPCR_plus') }}</td>
            <td>{{ data ? data.pcrPositive.aDay:0 }}</td>
            <td>{{ data ? data.pcrPositive.aWeek:0 }}</td>
            <td>{{ data ? data.pcrPositive.aMonth:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>7</td>
            <td class="font-weight-bold">{{ $t('label.isolation_or_quarantine_Today') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.classification') }}</td>
            <td>{{ $t('label.RS_reference') }}</td>
            <td>{{ $t('label.emergency_RS') }}</td>
            <td>{{ $t('label.independent_isolation_or_quarantine') }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases_probable_cases') }}</td>
            <td>{{ data ? data.suspectProbableIsolation.referralHospital:0 }}</td>
            <td>{{ data ? data.suspectProbableIsolation.emergencyHospital:0 }}</td>
            <td>{{ data ? data.suspectProbableIsolation.emergencyHospital:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmed_cases') }}</td>
            <td>{{ data ? data.confirmedIsolation.referralHospital:0 }}</td>
            <td>{{ data ? data.confirmedIsolation.emergencyHospital:0 }}</td>
            <td>{{ data ? data.confirmedIsolation.selfIsolation:0 }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts_is_being_monitored') }}</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td>{{ data ? data.confirmedIsolation.selfIsolation:0 }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DailyReportTableRevamp',
  props: {
    data: {
      type: Object,
      default: null
    },
    date: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reportingDate: this.$moment().format('DD MMMM YYYY')
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName',
      'phoneNumber'
    ])
  },
  watch: {
    date(value) {
      if (value.length > 1) {
        this.reportingDate = this.$moment(value).format('DD MMMM YYYY')
      } else {
        this.reportingDate = this.$moment().format('DD MMMM YYYY')
      }
    }
  },
  methods: {
    //
  }
}
</script>
<style scoped>
  .background-td {
    background: black !important;
  }
  .v-data-table td {
      height: 36px !important;
  }
</style>
