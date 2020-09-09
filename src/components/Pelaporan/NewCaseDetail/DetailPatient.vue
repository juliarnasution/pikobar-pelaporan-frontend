<template>
  <div>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.nik') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.nik }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.reason_do_not_have_nik') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.note_nik }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.phone_number') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.phone_number }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.reason_do_not_have_phone_number') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.note_phone_number }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.patient_name') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.name }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.parent_name') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.name_parents }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.place_birth') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.place_of_birth }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.birth_date') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.birth_date ? this.$moment(detail.birth_date).format('DD MMMM YYYY'):'-' }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.age') }}</p>
      </v-col>
      <v-col>
        <p>{{ detailAge(detail.age) }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.gender') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.gender === 'L' ? $t('label.male'):$t('label.female') }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.address_home') }}</p>
      </v-col>
      <v-col>
        <p>{{ completeAddress(
          detail.address_district_name,
          detail.address_subdistrict_name,
          detail.address_village_name,
          detail.address_street
        ) }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.profession') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.occupation }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.office_address') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.office_address }}</p>
      </v-col>
    </v-row>
    <v-row
      class="row-detail"
    >
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.citizenship') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.nationality.toUpperCase() }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { completeAddress } from '@/utils/utilsFunction'
export default {
  name: 'DetailPatient',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  methods: {
    completeAddress,
    detailAge(age) {
      if (age === undefined) age = 0
      const year = Math.floor(age)
      const month = Math.ceil((age - Math.floor(age)) * 12)
      return `${year} ${this.$t('label.year')} ${month} ${this.$t('label.month')}`
    }
  }
}
</script>
