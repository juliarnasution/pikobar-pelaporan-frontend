<template>
  <v-dialog v-model="show" max-width="70%">
    <v-skeleton-loader
      :loading="isLoading"
      type="table-tbody"
    >
      <v-card>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="show = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <v-container>
          <v-row class="mb-6">
            <v-col>
              <v-data-table
                :headers="headers"
                :items="listCloseContact"
                :mobile-breakpoint="NaN"
                :no-data-text="$t('label.data_empty')"
                :items-per-page="10"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.visited_local_area_province }}</td>
                    <td>{{ item.visited_local_area_city }} Th</td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-card
            min-height="100"
            class="mx-auto mt-2 border-card"
            @click="handleCreate"
          >
            <v-container
              fill-height
              fluid
            >
              <v-row
                align="center"
                justify="center"
              >
                <div align="center" class="mt-2">
                  <div>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </div>
                  <div>{{ $t('label.add_history') }}</div>
                </div>
              </v-row>
            </v-container>
          </v-card>
          <v-row class="mb-3">
            <v-col>
              <v-btn
                color="#FFFFFF"
                block
                @click="show = false"
              >
                {{ $t('label.back') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-skeleton-loader>
  </v-dialog>
</template>
<script>
import { completeAddress } from '@/utils/utilsFunction'
import EventBus from '@/utils/eventBus'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DialogTransmissionAreaLocal',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    idCase: {
      type: String,
      default: ''
    },
    titleDetail: {
      type: String,
      default: ''
    },
    listCloseContact: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialog,
      showReportCloseContact: false,
      isEdit: false,
      isEditCloseContact: false,
      isLoading: false,
      formBody: {},
      parentCase: {},
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.province').toUpperCase(), value: 'visited_local_area_province' },
        { text: this.$t('label.city').toUpperCase(), value: 'visited_local_area_city' },
        { text: this.$t('label.action').toUpperCase(), value: 'actions' }
      ],
      dialogDecline: false,
      formatDate: 'YYYY/MM/DD',
      refreshPageList: false,
      showDialogUpdateCloseContact: false,
      showCloseContact: false,
      idCloseContact: null,
      dialogDelete: false,
      dataDelete: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName',
      'district_user',
      'district_name_user'
    ]),
    ...mapState('closeContactCase', [
      'formCloseContact'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
        this.$emit('update:uniqueCaseId', '')
      }
    },
    dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        EventBus.$emit('refreshPageListReport', true)
      }
    }
  },
  methods: {
    completeAddress,
    async handleCreate() {
      await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
      const response = await this.$store.dispatch('reports/detailReportCase', this.idCase)
      this.parentCase = response.data
      this.isEditCloseContact = false
      this.showCloseContact = true
    },
    async handleUpdateReport(id) {
      this.formBody = this.formCloseContact
      const data = {
        idCloseContact: id
      }
      this.isLoading = true
      const response = await this.$store.dispatch('closeContactCase/getDetailCloseContactByCase', data)
      if (response.data !== null) {
        this.formBody = response.data
        this.isEdit = true
        this.showReportCloseContact = true
        this.isLoading = false
      }
    },
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
<style scoped>
   .border-card {
      color: #828282;
      border: 1px dashed #E0E0E0 !important;
      box-sizing: border-box !important;
      border-radius: 8px !important;
   }
</style>
