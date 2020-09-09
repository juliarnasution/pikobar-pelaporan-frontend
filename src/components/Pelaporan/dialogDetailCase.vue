<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-card-title>
        {{ titleDetail }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-container>
        <v-row>
          <v-tabs
            v-model="tab"
            background-color="#F5F5F5"
            centered
            hide-slider
            class="tab-detail-case"
          >
            <v-tab href="#tab-1">
              <v-icon class="mr-2">mdi-account</v-icon>
              {{ $t('label.detail_profile_history') }}
            </v-tab>

            <v-tab href="#tab-2">
              <v-icon class="mr-2">library_books</v-icon>
              {{ $t('label.case_history') }}
            </v-tab>

            <v-tab href="#tab-3">
              <v-icon class="mr-2">mdi-account-switch</v-icon>
              {{ $t('label.referral_history') }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="i in 3"
              :key="i"
              :value="'tab-' + i"
              style="min-width: 100%"
            >
              <v-card v-if="tab === 'tab-1'" class="pa-7">
                <new-case-detail
                  :detail="detailCase"
                  :close-contact-case="closeContactCase"
                />
              </v-card>
              <v-card v-if="tab === 'tab-2'">
                <v-container>
                  <v-card
                    outlined=""
                  >
                    <case-history-list
                      :list-history-case="listHistoryCase"
                    />
                  </v-card>
                </v-container>
              </v-card>
              <v-card v-if="tab === 'tab-3'">
                <v-container>
                  <v-card
                    outlined=""
                  >
                    <referral-history-list
                      :referral-history-case="referralHistoryCase"
                    />
                  </v-card>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-row>
        <v-row
          v-if="userUnitType === 'rumahsakit' && detailTransfer.transfer_status !== 'approved' && detailTransfer.transfer_status !== 'declined'"
          class="ma-2"
        >
          <v-col
            auto
          >
            <v-btn
              color="#EB5757"
              outlined
              block
              @click="handleDecline"
            >
              <span style="color: #EB5757;">{{ $t('label.reject_reference') }}</span>
            </v-btn>
          </v-col>
          <v-col
            auto
          >
            <v-btn
              color="primary"
              block
              @click="handleApprove"
            >
              <span>{{ $t('label.receive_references') }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <dialog-referral-decline
        :dialog-decline="dialogDecline"
        :show-decline.sync="dialogDecline"
        :detail-case="detailCase"
        :detail-transfer="detailTransfer"
      />
    </v-card>
  </v-dialog>
</template>
<script>
import EventBus from '@/utils/eventBus'
import { formatDatetime } from '@/utils/parseDatetime'
import { completeAddress } from '@/utils/utilsFunction'
export default {
  name: 'DialogDetailCase',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    userUnitType: {
      type: String,
      default: null
    },
    detailTransfer: {
      type: Object,
      default: null
    },
    detailCase: {
      type: Object,
      default: null
    },
    closeContactCase: {
      type: Array,
      default: null
    },
    listHistoryCase: {
      type: Array,
      default: null
    },
    referralHistoryCase: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tab: null,
      show: this.showDialog,
      dialogDecline: false,
      refreshPageList: false,
      birthDate: '',
      detailGender: '',
      detailAddress: ''
    }
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    },
    async detailCase(value) {
      if (value.birth_date) {
        this.birthDate = await formatDatetime(this.detailCase.birth_date, 'DD-MM-YYYY')
      }
      this.detailGender = value.gender === 'L' ? this.$t('label.male') : this.$t('label.female')
      this.detailAddress = completeAddress(
        value.address_district_name,
        value.address_subdistrict_name,
        value.address_village_name,
        value.address_street
      )
    }
  },
  methods: {
    async handleApprove() {
      const data = {
        idCase: this.detailCase._id,
        idTransfer: this.detailTransfer._id,
        actions: 'approve',
        body: {
          transfer_comment: null
        }
      }
      const response = await this.$store.dispatch('reports/actionHospitalReferral', data)
      if (response) {
        this.$emit('update:caseDetail', {})
        this.$emit('update:transferDetail', {})
        this.$emit('update:show', false)
        EventBus.$emit('refreshPageListReferral', true)
        await this.$store.dispatch('toast/successToast', this.$t('success.reference_successfully_verified'))
      }
    },
    async handleDecline() {
      this.dialogDecline = true
      this.$emit('update:show', false)
    }
  }
}
</script>
<style scoped>
    .v-window.v-item-group.v-tabs-items {
      min-width: 100%;
    }
    .tab-detail-case {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      border-radius: 8px;
    }
    .v-tab {
        width: 50% !important;
        color: #828282 !important;
    }
    .v-tab--active {
        background: #27AE60 !important;
        border-radius: 8px !important;
        color: #FFFFFF !important;
    }
    .popup-detail-case-title {
        font-weight: bold;
        font-size: 16px;
        color: #333333;
    }
</style>>
