<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-row class="px-2">
      <v-col cols="12" md="3" sm="3">
        <search
          :list-query="listQuery"
          :handle-search="onSearch"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="listQuery.eventType"
          :items="statusList"
          :label="'Semua Kategori'"
          solo
          item-text="label"
          item-value="value"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <input-date-picker
          :format-date="formatDate"
          :label="'Tanggal Awal'"
          :date-value="listQuery.createdAt"
          :value-date.sync="listQuery.createdAt"
          @changeDate="listQuery.createdAt = $event"
        />
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn
          block
          color="#4f4f4f"
          class="btn-reset"
          @click="onReset"
        >
          {{ $t('label.reset') }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn
          block
          color="success"
          class="btn-cari"
          @click="onSearch"
        >
          {{ $t('label.look_for_it') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'FilterNotification',
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    onSearch: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      formatDate: 'YYYY-MM-DD',
      disabledDistrict: true,
      codeDistrict: '',
      nameVillage: '',
      statusList: [
        {
          label: this.$t('route.dashboard_case_new').toUpperCase(),
          value: 'CaseCreated'
        },
        {
          label: this.$t('label.waiting_for_verification').toUpperCase(),
          value: 'CasePending'
        },
        {
          label: this.$t('label.verification_expired_title').toUpperCase(),
          value: 'CaseVerified'
        },
        {
          label: this.$t('label.case_rejected').toUpperCase(),
          value: 'CaseDeclined'
        },
        {
          label: this.$t('label.close_contact_finished_quarantine').toUpperCase(),
          value: 'ClosecContactFinishedQuarantine'
        }
      ]
    }
  },
  methods: {
    onReset() {
      this.listQuery.search = ''
      this.listQuery.eventType = ''
      this.listQuery.createdAt = ''
      this.$store.dispatch('notifications/getListNotifications', this.listQuery)
    }
  }
}
</script>
