<template>
  <div v-if="detail.length > 0">
    <div v-for="(data, index) in detail" :key="index">
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
        >
          <p>{{ $t('label.name') }}</p>
        </v-col>
        <v-col>
          <p>{{ data.name }}</p>
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
        >
          <p>{{ $t('label.hp_contact_number') }}</p>
        </v-col>
        <v-col>
          <p>{{ data.phone_number }}</p>
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
        >
          <p>{{ $t('label.gender') }}</p>
        </v-col>
        <v-col>
          <p>{{ data.gender === 'L' ? $t('label.male'):$t('label.female') }}</p>
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
        >
          <p>{{ $t('label.age') }}</p>
        </v-col>
        <v-col>
          <p>{{ detailAge(data.age) }}</p>
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
            data.address_district_name,
            data.address_subdistrict_name,
            data.address_village_name,
            data.address_street
          ) }}</p>
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
        >
          <p>{{ $t('label.relationship_with_primary_cases') }}</p>
        </v-col>
        <v-col>
          <p>{{ data.relationship }}</p>
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
        >
          <p>{{ $t('label.activities_carried_out') }}</p>
        </v-col>
        <v-col>
          <p>{{ splitArray(data.activity) }}</p>
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
          <p>{{ handlerDate(data.start_contact_date) }}</p>
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
          <p>{{ handlerDate(data.end_contact_date) }}</p>
        </v-col>
      </v-row>
      <v-divider />
    </div>
  </div>
  <div v-else class="text-center">
    -
  </div>
</template>
<script>
import { completeAddress } from '@/utils/utilsFunction'
export default {
  name: 'DetailCloseContact',
  props: {
    detail: {
      type: Array,
      default: null
    }
  },
  methods: {
    completeAddress,
    handlerDate(date) {
      date = date ? this.$moment(date).format('DD MMMM YYYY') : '-'
      return date
    },
    splitArray(array) {
      if (array === undefined) return
      const result = array.join(',', array)
      return result
    },
    detailAge(age) {
      if (age === undefined) age = 0
      const year = Math.floor(age)
      const month = Math.ceil((age - Math.floor(age)) * 12)
      return `${year} ${this.$t('label.year')} ${month} ${this.$t('label.month')}`
    }
  }
}
</script>
