<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="required ? 'required': ''"
  >
    <v-autocomplete
      v-if="disabledDistrict !== true"
      v-model="nameDistrict"
      name="nameDistrict"
      :items="listDistrictCity"
      :label="$t('label.select_district')"
      :error-messages="errors"
      :disabled="disabledSelect"
      :return-object="true"
      item-value="kota_kode"
      item-text="kota_nama"
      single-line
      solo
      autocomplete
      @change="onSelectDistrict"
    />
    <v-text-field
      v-else
      v-model="nameDistrict"
      :error-messages="errors"
      disabled
      solo-inverted
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'SelectAreaDistrictCity',
  components: {
    ValidationProvider
  },
  props: {
    disabledSelect: {
      type: Boolean,
      default: false
    },
    disabledDistrict: {
      type: Boolean,
      default: false
    },
    districtCity: {
      type: Object,
      default: function() {
        return []
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    onSelectDistrict: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      nameDistrict: ''
    }
  },
  computed: {
    ...mapGetters('region', [
      'listDistrictCity'
    ])
  },
  watch: {
    'districtCity': function(value) {
      if (this.disabledDistrict) {
        this.nameDistrict = value.kota_nama
      } else if (value && value.kota_kode) {
        this.nameDistrict = value
      } else {
        this.nameDistrict = ''
      }
    }
  },
  async mounted() {
    if (this.disabledDistrict) {
      this.nameDistrict = this.districtCity.kota_nama
    } else {
      this.nameDistrict = this.districtCity
    }
    if (!this.disabledSelect) {
      await this.$store.dispatch('region/getListDistrictCity')
    }
  }
}
</script>
