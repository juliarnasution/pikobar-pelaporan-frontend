<template>
  <v-data-table
    :headers="headers"
    :items="referralHistoryCase"
    :mobile-breakpoint="0"
    :no-data-text="$t('label.data_empty')"
    :items-per-page="100"
    fixed-header
    height="500px"
    hide-default-footer
  >
    <template v-slot:item="{ item, index }">
      <tr>
        <td>{{ getTableRowNumbering(index) }}</td>
        <td>{{ formatDatetime(item.createdAt, "DD MMMM YYYY") }}</td>
        <td><status :status="item.transfer_last_history.status" /></td>
        <td>
          <div v-if="item.transfer_last_history.stage === '0'">
            {{ $t('label.process') }}
          </div>
          <div v-else>
            {{ $t('label.done') }}
          </div>
        </td>
        <td>{{ item.transfer_to_unit_name }}</td>
        <td><status-referral :status="item.transfer_status" /></td>
        <td>{{ item.transfer_comment }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'ReferralHistoryList',
  props: {
    referralHistoryCase: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.transfer_date').toUpperCase(), value: 'transfer_date' },
        { text: this.$t('label.criteria').toUpperCase(), value: 'criteria' },
        { text: this.$t('label.stages').toUpperCase(), value: 'stages' },
        { text: this.$t('label.hospital').toUpperCase(), value: 'hospital' },
        { text: this.$t('label.transfer_status').toUpperCase(), value: 'transfer_status' },
        { text: this.$t('label.information').toUpperCase(), value: 'information' }
      ]
    }
  },
  methods: {
    formatDatetime,
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
