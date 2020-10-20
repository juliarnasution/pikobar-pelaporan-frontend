<template>
  <div class="mt-0">
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col>
            <input-date-picker
              :format-date="formatDate"
              :date-value="params.start_date"
              :value-date.sync="params.start_date"
              :label="$t('label.choose_date')"
              :required="false"
              @changeDate="params.start_date = $event"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <address-region
          name="address-region"
          :district-code="params.address_district_code"
          :district-name="district_name_user"
          :code-district.sync="params.address_district_code"
          :sub-district-code="params.address_subdistrict_code"
          :code-sub-district.sync="params.address_subdistrict_code"
          :village-code="params.address_village_code"
          :code-village.sync="params.address_village_code"
          :disabled-district="disabledDistrict"
          :disabled-address="false"
          :required-address="false"
        />
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-btn
              color="#27AE60"
              outlined
              block
            >
              {{ $t('label.export_xls') }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="#27AE60"
              outlined
              block
              :loading="isLoading"
              @click="handlePrint"
            >
              {{ $t('label.export_png') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          :color="params.criteria === 'CONFIRMATION' ? 'primary':'#E6F6EC'"
          :class="params.criteria === 'CONFIRMATION' ? '':'primary--text'"
          @click="changeButtonStatus('CONFIRMATION')"
        >
          {{ $t('label.confirmed') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          :color="params.criteria === 'PROBABLE' ? 'primary':'#E6F6EC'"
          :class="params.criteria === 'PROBABLE' ? '':'primary--text'"
          @click="changeButtonStatus('PROBABLE')"
        >
          {{ $t('label.probable') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          :color="params.criteria === 'SUSPECT' ? 'primary':'#E6F6EC'"
          :class="params.criteria === 'SUSPECT' ? '':'primary--text'"
          @click="changeButtonStatus('SUSPECT')"
        >
          {{ $t('label.suspect') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          :color="params.criteria === 'CLOSECONTACT' ? 'primary':'#E6F6EC'"
          :class="params.criteria === 'CLOSECONTACT' ? '':'primary--text'"
          @click="changeButtonStatus('CLOSECONTACT')"
        >
          {{ $t('label.tight_contact') }}
        </v-btn>
      </v-col>
      <v-col />
      <v-col />
    </v-row>
  </div>
</template>
<script>
import { rolesWidget } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FilterRecapStatus',
  props: {
    params: {
      type: Object,
      default: null
    },
    handlePrint: {
      type: Function,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formatDate: 'YYYY/MM/DD',
      disabledDistrict: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'district_user',
      'district_name_user'
    ])
  },
  created() {
    if (rolesWidget['dinkesKotaAndFaskes'].includes(this.roles[0])) {
      this.params.address_district_code = this.district_user
      this.disabledDistrict = true
    }
  },
  methods: {
    changeButtonStatus(criteria) {
      this.params.criteria = criteria
    }
  }
}
</script>
