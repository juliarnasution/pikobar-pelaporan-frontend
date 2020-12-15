<template>
  <v-col auto>
    <v-data-table
      v-model="selectedCase"
      :headers="headers"
      :items="listKasus"
      :no-data-text="$t('label.data_empty')"
      :items-per-page="listQuery.limit"
      :options.sync="optionsDataTable"
      :loading="loadingTable"
      :single-select="!multipleSelect"
      :show-select="multipleSelect"
      mobile-breakpoint="0"
      item-key="_id"
      hide-default-footer
    >
      <template v-slot:item="{ isSelected, select, item, index }">
        <tr>
          <td v-if="multipleSelect">
            <v-checkbox
              :value="isSelected"
              :input-value="isSelected"
              primary
              hide-details
              @change="select($event)"
            />
          </td>
          <td>{{ getTableRowNumbering(index) }}</td>
          <td>{{ item.id_case ? item.id_case.toUpperCase() : '-' }}</td>
          <td>{{ item.name }}</td>
          <td>{{ getAge(item.age) }}</td>
          <td>
            <div v-if="item.gender ==='P'">
              {{ $t('label.female_initials') }}
            </div>
            <div v-else>
              {{ $t('label.male_initials') }}
            </div>
          </td>
          <td>{{ item.phone_number }}</td>
          <td><status :status="item.status" /> </td>
          <td><final-result :final-result="item.final_result" /></td>
          <td>{{ item.author.username }}</td>
          <td>{{ item.last_history ? formatDatetime(item.last_history.last_changed, 'DD MMMM YYYY') : '-' }}</td>
          <td>
            <v-card-actions>
              <v-menu
                :close-on-content-click="false"
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
                  <v-list-item @click="handleDetail(item, item._id)">
                    {{ $t('label.edit_and_detail') }}
                  </v-list-item>
                  <div v-if="rolesWidget['all'].includes(roles[0])">
                    <v-list-item @click="handlePrintPEForm(item._id, item.id_case)">
                      {{ $t('label.print_pe_form') }}
                    </v-list-item>
                    <v-divider class="mt-0 mb-0" />
                    <v-list-item
                      v-if="rolesWidget['dinkeskota'].includes(roles[0])"
                      style="color: #EB5757 !important;"
                      @click="handleDeleteCase(item)"
                    >
                      {{ $t('label.deleted_case') }}
                    </v-list-item>
                  </div>
                </v-card>
              </v-menu>
            </v-card-actions>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-col>
</template>
<script>
import { mapGetters } from 'vuex'
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'TableCase',
  props: {
    listKasus: {
      type: Array,
      default: function() { return [] }
    },
    rolesWidget: {
      type: Object,
      default: null
    },
    loadingTable: {
      type: Boolean,
      default: false
    },
    multipleSelect: {
      type: Boolean,
      default: false
    },
    handleDetail: {
      type: Function,
      default: null
    },
    handlePrintPEForm: {
      type: Function,
      default: null
    },
    handleDeleteCase: {
      type: Function,
      default: null
    },
    selected: {
      type: Array,
      default: function() { return [] }
    },
    listQuery: {
      type: Object,
      default: null
    },
    optionsTable: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.case_code').toUpperCase(), value: 'id_case' },
        { text: this.$t('label.name').toUpperCase(), value: 'name' },
        { text: this.$t('label.age').toUpperCase(), value: 'age' },
        { text: this.$t('label.gender_abbreviation').toUpperCase(), value: 'gender' },
        { text: this.$t('label.short_phone_number').toUpperCase(), value: 'phone_number' },
        { text: this.$t('label.criteria').toUpperCase(), value: 'status' },
        { text: this.$t('label.latest_patient_status').toUpperCase(), value: 'final_result' },
        { text: this.$t('label.author').toUpperCase(), value: 'author' },
        { text: this.$t('label.last_updated_date').toUpperCase(), value: 'updatedAt' },
        { text: this.$t('label.action'), value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    optionsDataTable: {
      get: function() {
        return this.optionsTable
      },
      set: function(value) {
        this.$emit('update:optionsDataTable', value)
      }
    },
    selectedCase: {
      get: function() {
        return this.selected
      },
      set: function(value) {
        this.$emit('update:selectedCase', value)
      }
    }
  },
  watch: {
    //
  },
  async mounted() {
    //
  },
  methods: {
    formatDatetime,
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    getAge(value) {
      const yearsOld = Math.floor(value)
      const age = `${yearsOld} ${this.$t('label.year')}`
      return age
    }
  }
}
</script>
