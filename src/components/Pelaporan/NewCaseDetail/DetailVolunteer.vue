<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.interviewer_name') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.interviewers_name }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.interviewer_phone') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.interviewers_phone_number }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.interview_date') }}</p>
      </v-col>
      <v-col>
        <p>{{ this.$moment(detail.interview_date).format('DD MMMM YYYY')||'-' }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'DetailVolunteer',
  props: {
    detail: {
      type: Object,
      default: null
    }
  }
}
</script>
