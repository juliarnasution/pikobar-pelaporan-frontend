<template>
  <v-row class="ml-4 mr-4 mb-6">
    <v-col>
      <v-data-table
        :headers="headers"
        :items="listHistoryCase"
        :mobile-breakpoint="NaN"
        :no-data-text="$t('label.data_empty')"
        :items-per-page="10"
        hide-default-footer
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ getTableRowNumbering(index) }}</td>
            <td><status :status="item.status" /></td>
            <td><final-result :final-result="item.final_result" /></td>
            <td>{{ item.current_location_type === 'RUMAH' ?
              completeAddress(item.current_location_district, item.current_location_subdistrict, item.current_location_village, item.current_location_address)
              : item.current_location_address }}</td>
            <td>
              {{ item.first_symptom_date ? formatDatetime(item.first_symptom_date, 'DD MMMM YYYY') : '-' }}
            </td>
            <td>{{ item.diagnosis.toString() }}</td>
            <td>{{ item.diseases.toString() }}</td>
            <td><final-result :final-result="item.final_result" /></td>
            <td>
              {{ item.last_date_status_patient ? formatDatetime(item.last_date_status_patient, 'DD MMMM YYYY') : '-' }}
            </td>
            <td>
              <v-btn
                v-if="listHistoryCase.length > 1"
                class="ma-1"
                color="#828282"
                style="text-transform: none;height: 30px;min-width: 80px;color: #EB5757 !important;"
                tile
                outlined
                @click="handleDelete(item)"
              >
                {{ $t('label.delete_history') }}
              </v-btn>
              <!-- <v-card-actions>
                <v-menu
                  :close-on-content-click="true"
                  :nudge-width="100"
                  :nudge-left="220"
                  :nudge-top="40"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-1"
                      color="#828282"
                      style="text-transform: none;height: 30px;min-width: 80px;"
                      tile
                      outlined
                      v-on="on"
                    >
                      {{ $t('label.choose_action') }}
                      <v-icon style="color: #009D57;font-size: 2rem;" right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list-item @click="handleUpdateReport(item)">
                      {{ $t('label.edit_history') }}
                    </v-list-item>
                    <v-divider class="mt-0 mb-0" />
                    <v-list-item
                      style="color: #EB5757 !important;"
                      @click="handleDelete(item)"
                    >
                      {{ $t('label.delete_history') }}
                    </v-list-item>
                  </v-card>
                </v-menu>
              </v-card-actions> -->
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { completeAddress } from '@/utils/utilsFunction'

export default {
  name: 'TableHistoryCase',
  props: {
    listHistoryCase: {
      type: Array,
      default: function() { return [] }
    },
    handleUpdateReport: {
      type: Function,
      default: null
    },
    handleDelete: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.criteria').toUpperCase(), value: 'status' },
        { text: this.$t('label.latest_patient_status').toUpperCase(), value: 'final_result' },
        { text: this.$t('label.current_location_address').toUpperCase(), value: 'current_location_address' },
        { text: this.$t('label.date_symptoms').toUpperCase(), value: 'symptoms' },
        { text: this.$t('label.symptoms').toUpperCase(), value: 'diagnosis' },
        { text: this.$t('label.additional_condition').toUpperCase(), value: 'diseases' },
        { text: this.$t('label.patient_status').toUpperCase(), value: 'stage' },
        { text: this.$t('label.last_updated_date_patient_status').toUpperCase(), value: 'createdAt' },
        { text: this.$t('label.action').toUpperCase(), width: '10%', value: 'actions' }
      ]
    }
  },
  methods: {
    formatDatetime,
    completeAddress,
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
