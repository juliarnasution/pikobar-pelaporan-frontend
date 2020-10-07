<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.physical_activity') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.pysichal_activity ? listPhysicalActivity[detail.pysichal_activity].text:'-' }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.smoking') }}</p>
      </v-col>
      <v-col>
        <p><answer-list :answer="detail.smoking" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.consume_alcohol') }}</p>
      </v-col>
      <v-col>
        <p><answer-list :answer="detail.consume_alcohol" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.income') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.income ? incomeList[detail.income].text:'-' }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { incomeList, listPhysicalActivity } from '@/utils/constantVariable'
export default {
  name: 'DetailSocioEconomicHistory',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      incomeList: incomeList,
      listPhysicalActivity: listPhysicalActivity
    }
  }
}
</script>
