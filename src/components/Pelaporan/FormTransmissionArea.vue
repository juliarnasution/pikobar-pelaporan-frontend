<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.province') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="formPasien.visited_local_area_province"
              :items="listProvince"
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
          <label>{{ $t('label.city') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="formPasien.visited_local_area_city"
              :items="listDistrict"
              item-text="kota_nama"
              item-value="kota_nama"
              solo
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
  name: 'FormTransmissionArea',
  components: {
    ValidationProvider
  },
  props: {
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      listProvince: [],
      listDistrict: [],
      formatDate: 'YYYY/MM/DD'
    }
  },
  async mounted() {
    await this.getListProvince()
  },
  methods: {
    async getListProvince() {
      const response = await this.$store.dispatch('region/getListProvince')
      this.listProvince = response.data
      if (this.formPasien.visited_local_area_city) {
        await this.getListDistrictByProvince(this.formPasien.visited_local_area_province)
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
