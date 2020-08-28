<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.criteria') }}</p>
      </v-col>
      <v-col>
        <p><status :status="detail.status" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.latest_patient_status') }}</p>
      </v-col>
      <v-col>
        <v-row><final-result :final-result="detail.last_history.final_result" /> Per-Tanggal {{ detail.last_date_status_patient ? this.$moment(detail.last_date_status_patient).format('DD MMMM YYYY'):'-' }}</v-row>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.there_symptoms') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.there_are_symptoms ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.symptoms') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.diagnosis.length > 1 ? splitArray(detail.last_history.diagnosis):'Tidak Ada Gejala' }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.additional_condition') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.diseases.length > 1 ? splitArray(detail.last_history.diseases):'Tidak Ada Kondisi Penyerta' }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.where_is_patient_isolation_quarantine_location') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.current_location_type }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.diagnosis_ards') }}</p>
      </v-col>
      <v-col>
        <p><answer-list :answer="detail.last_history.diagnosis_ards" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.diagnosis_covid') }}</p>
      </v-col>
      <v-col>
        <p><answer-list :answer="detail.last_history.diagnosis_covid" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.diagnosis_pneumonia') }}</p>
      </v-col>
      <v-col>
        <p><answer-list :answer="detail.last_history.diagnosis_pneumonia" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.do_you_have_another_diagnosis_etiology_for_respiratory_disease') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.is_other_diagnosisr_respiratory_disease ? $t('label.yes'):$t('label.not') }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'DetailCaseHistory',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  methods: {
    splitArray(array) {
      if (array === undefined) return
      const result = array.join(',', array)
      return result
    }
  }
}
</script>
