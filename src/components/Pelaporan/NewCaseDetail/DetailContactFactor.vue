<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.primary_contact_label_2') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.close_contact_heavy_ispa_group ? $t('label.yes'):$t('label.no') }}</p>
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
        <p>{{ detail.close_contact_have_pets ? $t('label.yes'):$t('label.no') }}</p>
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
        <p>{{ detail.close_contact_health_worker ? $t('label.yes'):$t('label.no') }}</p>
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
        <p>{{ detail.apd_use ? splitArray(detail.apd_use):'-' }}</p>
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
        <p>{{ detail.close_contact_performing_aerosol_procedures ? $t('label.yes'):$t('label.no') }}</p>
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
