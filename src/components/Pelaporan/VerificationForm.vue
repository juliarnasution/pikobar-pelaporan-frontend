<template>
  <v-dialog v-model="show" :max-width="maxWidthDialog">
    <v-card class="pa-7">
      <new-case-detail
        v-if="caseDetail && caseDetail.verified_status !== 'declined'"
        :detail="caseDetail"
        :close-contact-case="closeContactCase"
      />
      <edit-verification
        v-else
        :case-data="caseDetail"
        :data-case.sync="caseDetail"
        :related-case-object="relatedCaseObject"
        :hospital-west-java-list="hospitalWestJavaList"
        :hospital-non-west-java-list="hospitalNonWestJavaList"
        :list-country="listCountry"
        :list-cases="listNameCases"
        :update-case="updateCase"
        :show.sync="show"
      />
      <v-row v-if="showActionButton && caseDetail && caseDetail.verified_status !== 'declined'" class="mt-2">
        <v-col class="pa-0 mr-6">
          <v-btn
            color="grey"
            width="100%"
            outlined
            @click="onClose(false)"
          >
            <span class="input-label text-capitalize decline">{{ roles[0] === 'faskes' ? $t('label.canceled') : $t('label.decline') }}</span>
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-btn
            color="#2ead64"
            width="100%"
            @click="onClose(true)"
          >
            <span class="text-capitalize verify">{{ roles[0] === 'faskes' ? $t('label.update_case') : $t('label.verify_case') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { mapGetters } from 'vuex'
export default {
  name: 'VerificationForm',
  props: {
    showForm: {
      type: Boolean,
      default: false
    },
    caseData: {
      type: Object,
      default: null
    },
    lastCaseData: {
      type: Object,
      default: null
    },
    closeContactCase: {
      type: Array,
      default: null
    },
    queryData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      caseDetail: null,
      query: null,
      show: false,
      listNameCases: [],
      listCountry: [],
      hospitalWestJavaList: [],
      hospitalNonWestJavaList: [],
      relatedCaseObject: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    showActionButton() {
      if (this.roles[0] !== 'faskes') {
        return true
      } else {
        return this.caseDetail && this.caseDetail.verified_status === 'declined'
      }
    },
    required() {
      return {
        'required': this.caseDetail && this.caseDetail.verified_status === 'declined'
      }
    },
    maxWidthDialog() {
      return this.$vuetify.breakpoint.xl ? '50%' : '70%'
    }
  },
  watch: {
    async showForm(value) {
      this.query = this.queryData
      this.show = value
      if (value) {
        this.caseDetail = this.caseData
        if (this.lastCaseData) {
          Object.assign(this.caseDetail, { 'last_history': this.lastCaseData })
        }
        this.caseDetail.yearsOld = Math.floor(this.caseDetail.age)
        this.caseDetail.monthsOld = Math.ceil((this.caseDetail.age - Math.floor(this.caseDetail.age)) * 12)
        if (this.caseDetail.birth_date) {
          if (this.caseDetail.verified_status !== 'declined') {
            this.caseDetail.birth_date = formatDatetime(this.caseDetail.birth_date, 'DD MMMM YYYY')
          } else {
            this.caseDetail.birth_date = formatDatetime(this.caseDetail.birth_date, 'YYYY/MM/DD')
          }
        }
        if (this.caseDetail.last_history.first_symptom_date) {
          if (this.caseDetail.verified_status !== 'declined') {
            this.caseDetail.last_history.first_symptom_date = formatDatetime(this.caseDetail.last_history.first_symptom_date, 'DD MMMM YYYY')
          } else {
            this.caseDetail.last_history.first_symptom_date = formatDatetime(this.caseDetail.last_history.first_symptom_date, 'YYYY/MM/DD')
          }
        }
        if (this.caseDetail.verified_status !== 'declined') {
          this.caseDetail.gender = this.caseDetail.gender === 'L' ? this.$t('label.male') : this.$t('label.female')
          if (this.caseDetail.last_history.current_location_type === 'RUMAH') {
            this.caseDetail.last_history.current_location_type = this.$t('label.home')
          } else if (this.caseDetail.last_history.current_location_type === 'RS') {
            this.caseDetail.last_history.current_location_type = this.$t('label.hospital')
          } else {
            this.caseDetail.last_history.current_location_type = this.$t('label.other')
          }
          if (this.caseDetail.stage === '0') {
            this.caseDetail.stage = this.$t('label.process')
          } else if (this.caseDetail.stage === '1') {
            this.caseDetail.stage = this.$t('label.done')
          }
          if (this.caseDetail.final_result === '0') {
            this.caseDetail.final_result = this.$t('label.negatif')
          } else if (this.caseDetail.final_result === '1') {
            this.caseDetail.final_result = this.$t('label.recovery')
          } else if (this.caseDetail.final_result === '2') {
            this.caseDetail.final_result = this.$t('label.dead')
          }
          this.caseDetail.last_history.historyList = []
          if (this.caseDetail.last_history.is_went_abroad) {
            this.caseDetail.last_history.historyList.push(this.$t('label.from_abroad'))
          }
          if (this.caseDetail.last_history.is_went_other_city) {
            this.caseDetail.last_history.historyList.push(this.$t('label.trip_outside_the_city'))
          }
          if (this.caseDetail.last_history.is_contact_with_positive) {
            this.caseDetail.last_history.historyList.push(this.$t('label.contact_with_positive_patients'))
          }
          this.caseDetail.new_address = `${this.caseDetail.address_village_name}, ${this.caseDetail.address_subdistrict_name}, ${this.caseDetail.address_district_name}`
          if (this.caseDetail.last_history.current_location_type === 'Rumah') {
            const responseDistrict = await this.$store.dispatch('region/getDetailDistrict', this.caseDetail.last_history.current_location_district_code)
            const responseSubDistrict = await this.$store.dispatch('region/getDetailSubDistrict', this.caseDetail.last_history.current_location_subdistrict_code)
            const responseVillage = await this.$store.dispatch('region/getDetailVillage', this.caseDetail.last_history.current_location_village_code)
            this.caseDetail.last_history.current_location_address = `${this.caseDetail.last_history.current_location_address}, ${responseVillage.data[0].desa_nama}, ${responseSubDistrict.data[0].kecamatan_nama}, ${responseDistrict.data[0].kota_nama}`
          }
        } else {
          this.relatedCaseObject = {
            'relateds': `${this.caseDetail.name_case_related} (${this.caseDetail.id_case_related})`
          }
          this.listNameCases.push(this.relatedCaseObject)
          const response = await this.$store.dispatch('region/listCountry')
          this.listCountry = response.data
          const paramHospitalWestJava = { 'rs_jabar': true }
          const paramHospitalNonWestJava = { 'rs_jabar': false }
          const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
          this.hospitalWestJavaList = responseWestJava.data
          const responseNonWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalNonWestJava)
          this.hospitalNonWestJavaList = responseNonWestJava.data
        }
      }
    },
    show(value) {
      this.$emit('update:show', value)
    },
    queryData(val) {
      console.log(val)
    }
  },
  methods: {
    formatDatetime,
    async onClose(isVerified) {
      if (this.roles[0] !== 'faskes') {
        this.query.id = this.caseDetail._id
        this.query.data.verified_status = isVerified ? 'verified' : 'declined'
        this.$emit('update:query', this.query)
        this.$emit('update:showConfirmation', true)
      }
      this.show = false
    },
    async updateCase() {
      const reportData = {
        'id': this.caseDetail._id,
        'data': {
          'nik': this.caseDetail.nik,
          'name': this.caseDetail.name,
          'birth_date': this.caseDetail.birth_date,
          'age': this.caseDetail.age,
          'gender': this.caseDetail.gender,
          'phone_number': this.caseDetail.phone_number,
          'address_street': this.caseDetail.address_street,
          'nationality': this.caseDetail.nationality,
          'nationality_name': this.caseDetail.nationality_name,
          'id_case_national': this.caseDetail.id_case_national,
          'id_case_related': this.caseDetail.id_case_related,
          'name_case_related': this.caseDetail.name_case_related,
          'occupation': this.caseDetail.occupation,
          'office_address': this.caseDetail.office_address,
          'address_district_code': this.caseDetail.address_district_code,
          'address_district_name': this.caseDetail.address_district_name,
          'address_subdistrict_code': this.caseDetail.address_subdistrict_code,
          'address_subdistrict_name': this.caseDetail.address_subdistrict_name,
          'address_village_code': this.caseDetail.address_village_code,
          'address_village_name': this.caseDetail.address_village_name
        }
      }
      const historyData = {
        'case': this.caseDetail._id,
        'stage': this.caseDetail.stage,
        'final_result': this.caseDetail.final_result,
        'status': this.caseDetail.status,
        'current_location_type': this.caseDetail.last_history.current_location_type,
        'current_location_address': this.caseDetail.last_history.current_location_address,
        'is_went_abroad': this.caseDetail.last_history.is_went_abroad,
        'visited_country': this.caseDetail.last_history.visited_country,
        'is_went_other_city': this.caseDetail.last_history.is_went_other_city,
        'visited_city': this.caseDetail.last_history.visited_city,
        'is_contact_with_positive': this.caseDetail.last_history.is_contact_with_positive,
        'other_notes': this.caseDetail.last_history.other_notes,
        'first_symptom_date': this.caseDetail.last_history.first_symptom_date,
        'diagnosis': this.caseDetail.last_history.diagnosis,
        'current_hospital_id': this.caseDetail.last_history.current_hospital_id,
        'history_notes': this.caseDetail.last_history.history_notes,
        'diseases_other': this.caseDetail.last_history.diseases_other,
        'diagnosis_other': this.caseDetail.last_history.diagnosis_other,
        'diseases': this.caseDetail.last_history.diseases,
        'report_source': this.caseDetail.last_history.report_source,
        'current_location_district_code': this.caseDetail.last_history.current_location_district_code,
        'current_location_subdistrict_code': this.caseDetail.last_history.current_location_subdistrict_code,
        'current_location_village_code': this.caseDetail.last_history.current_location_village_code
      }
      const verificationData = {
        'id': this.caseDetail._id,
        'data': {
          'verified_status': 'pending'
        }
      }
      const responseReport = await this.$store.dispatch('reports/updateReportCase', reportData)
      const responseHistory = await this.$store.dispatch('reports/createHistoryCase', historyData)
      const responseVerification = await this.$store.dispatch('reports/verifyCase', verificationData)
      if (responseReport.status === 200 && responseHistory.status === 200 && responseVerification.status === 200) {
        await this.$store.dispatch('toast/successToast', this.$t('success.update_success'))
      }
      this.$emit('update:refreshPage', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.subtitle {
  font-size: 1.2rem !important;
  font-family: "Roboto", sans-serif !important;
  margin-bottom: 10px;
}
.extra-margin-top {
  margin-top: 65px;
}
.input-label {
  color: #a0a0a0 !important;
  font-weight: 500 !important;
}
.verify {
  color: white;
  font-size: 16px;
}
.decline {
  font-size: 16px;
}
.status-label {
  width: 100%;
  padding: 11px 0px;
  text-align: center;
  border-width: thin;
  border-style: solid;
  border-radius: 10px;
}
.positif {
  background-color: #ffe5e5;
  color: #EB5757;
  border-color: #EB5757;
}
.pdp {
  background-color: #fffee5;
  color: #ffce4f;
  border-color: #ffce4f;
}
.odp {
  background-color: #e5f2ff;
  color: #528fc4;
  border-color: #528fc4;
}
.otg {
  background-color: #dedede;
  color: rgba(0, 0, 0, 0.87);
  border-color: rgba(0, 0, 0, 0.87);
}
.required::after {
  content: " *";
  color: red;
}
.full-width {
  width: 100% !important;
}
.rejection {
  background-color: #fdeded;
  width: 100%;
  border-radius: 10px;
  color: #EB5757;
}
</style>
