<template>
  <v-row class="mb-6">
    <v-col>
      <v-data-table
        :headers="headers"
        :items="listHistoryTravel"
        mobile-breakpoint="0"
        :no-data-text="$t('label.data_empty')"
        :items-per-page="10"
        hide-default-footer
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ getTableRowNumbering(index) }}</td>
            <td>{{ item.travelling_type }}</td>
            <td>{{ item.travelling_visited }}</td>
            <td>{{ item.travelling_city }}</td>
            <td>
              {{ item.travelling_date ? formatDatetime(item.travelling_date, 'DD MMMM YYYY') : '-' }}
            </td>
            <td>
              {{ item.travelling_arrive ? formatDatetime(item.travelling_arrive, 'DD MMMM YYYY') : '-' }}
            </td>
            <td>
              <v-card-actions>
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
              </v-card-actions>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'TableHistoryTravel',
  props: {
    listHistoryTravel: {
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
        { text: this.$t('label.trip_type').toUpperCase(), value: 'travelling_type' },
        { text: this.$t('label.country_or_province').toUpperCase(), value: 'travelling_visited' },
        { text: this.$t('label.city').toUpperCase(), value: 'travelling_city' },
        { text: this.$t('label.start_travel').toUpperCase(), value: 'travelling_date' },
        { text: this.$t('label.end_travel').toUpperCase(), value: 'travelling_arrive' },
        { text: this.$t('label.action').toUpperCase(), width: '10%', value: 'actions' }
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
