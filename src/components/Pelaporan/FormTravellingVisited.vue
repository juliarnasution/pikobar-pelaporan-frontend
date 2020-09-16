<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label :class="isTravellingSick ? 'required' : ''">
            {{ formPasien.travelling_type === "Dari Luar Kota" ? $t('label.province'):$t('label.country') }}
          </label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" :rules="isTravellingSick ? 'required' : ''">
            <v-select
              v-if="formPasien.travelling_type !== 'Dari Luar Kota'"
              v-model="formPasien.travelling_visited"
              :items="listCountry"
              :label="$t('label.enter_place')"
              :error-messages="errors"
              item-text="name"
              item-value="name"
              solo
            />
            <v-select
              v-else
              v-model="formPasien.travelling_visited"
              :items="listProvince"
              :label="$t('label.enter_place')"
              :error-messages="errors"
              item-text="provinsi_nama"
              item-value="provinsi_nama"
              solo
              @change="getListDistrictByProvince"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label :class="isTravellingSick ? 'required' : ''">{{ $t('label.city') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" :rules="isTravellingSick ? 'required' : ''">
            <v-select
              v-if="formPasien.travelling_type === 'Dari Luar Kota'"
              v-model="formPasien.travelling_city"
              :items="listDistrict"
              :error-messages="errors"
              item-text="kota_nama"
              item-value="kota_nama"
              solo
            />
            <v-text-field
              v-else
              v-model="formPasien.travelling_city"
              :label="$t('label.enter_place')"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'FormTravellingVisited',
  components: {
    ValidationProvider
  },
  props: {
    isTravellingSick: {
      type: Boolean,
      default: false
    },
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      listCountry: [],
      listProvince: [],
      listDistrict: [],
      formatDate: 'YYYY/MM/DD'
    }
  },
  watch: {
    formPasien(value) {
      if (value .travelling_type === 'Dari Luar Kota') {
        this.getListProvince()
      }
    }
  },
  async mounted() {
    await this.getListCountry()
    await this.getListProvince()
  },
  methods: {
    async getListCountry() {
      const response = await this.$store.dispatch('region/listCountry')
      this.listCountry = response.data
    },
    async getListProvince() {
      const response = await this.$store.dispatch('region/getListProvince')
      this.listProvince = response.data
      if (this.formPasien.travelling_type === 'Dari Luar Kota') {
        await this.getListDistrictByProvince(this.formPasien.travelling_visited)
      }
    },
    async getListDistrictByProvince(item) {
      const response = await this.$store.dispatch('region/getListDistrictCity', {
        kemendagri_provinsi_nama: item,
        status: 'local'
      })
      this.listDistrict = response.data
    }
  }
}
</script>
