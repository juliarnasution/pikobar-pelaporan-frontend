<template>
  <v-dialog v-model="show" max-width="70%">
    <v-skeleton-loader
      :loading="isLoading"
      type="table-tbody"
    >
      <v-card>
        <v-container>
          <v-card-title>
            {{ titleDetail }}
            <v-spacer />
            <v-icon @click="show = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <v-row class="mb-6">
            <v-col>
              <v-data-table
                :headers="headers"
                :items="listTransmissionArea"
                :mobile-breakpoint="NaN"
                :no-data-text="$t('label.data_empty')"
                :items-per-page="10"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.visited_local_area_province }}</td>
                    <td>{{ item.visited_local_area_city }}</td>
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
    <dialog-form-transmission-area-local
      :show-dialog-add-transmission-area-lokal="showTransmissionAreaLokal"
      :show-form-add-transmission-area-lokal.sync="showTransmissionAreaLokal"
      :title-detail="isEditTransmissionAreaLokal ? $t('label.edit_history'):$t('label.input_history')"
      :form-data.sync="formBody"
      :is-edit.sync="isEditTransmissionAreaLokal"
      :id-case="idCase"
    />
    <dialog-delete
      :dialog="dialogDelete"
      :dialog-delete.sync="dialogDelete"
      :data-deleted="dataDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`localTransmissionArea/deleteLocalTransmissionArea`"
    />
  </v-dialog>
</template>
<script>
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
    }
  },
  data() {
    return {
      show: this.showDialog,
      isEdit: false,
      isEditTransmissionAreaLokal: false,
      isLoading: false,
      listTransmissionArea: [],
      formBody: {},
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.province').toUpperCase(), width: '30%', value: 'visited_local_area_province' },
        { text: this.$t('label.city').toUpperCase(), width: '30%', value: 'visited_local_area_city' },
        { text: this.$t('label.action').toUpperCase(), width: '30%', value: 'actions' }
      ],
      dialogDecline: false,
      formatDate: 'YYYY/MM/DD',
      refreshPageList: false,
      showDialogUpdateCloseContact: false,
      showTransmissionAreaLokal: false,
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
    ...mapState('localTransmissionArea', [
      'formLocalTransmissionArea'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
      if (value) {
        this.getListTransmissionArea(this.idCase)
      }
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    },
    showTransmissionAreaLokal(value) {
      if (!value) {
        console.log('ss')
        this.getListTransmissionArea(this.idCase)
      }
    },
    dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        this.getListTransmissionArea(this.idCase)
      }
    }
  },
  methods: {
    async handleCreate() {
      await this.$store.dispatch('localTransmissionArea/resetStateLocalTransmissionArea')
      this.formBody = {}
      this.isEditTransmissionAreaLokal = false
      this.showTransmissionAreaLokal = true
    },
    async handleUpdateReport(item) {
      this.formBody = item
      this.isEditTransmissionAreaLokal = true
      this.showTransmissionAreaLokal = true
    },
    async getListTransmissionArea(id) {
      const response = await this.$store.dispatch('localTransmissionArea/getListLocalTransmissionArea', id)
      if (response !== undefined) {
        this.listTransmissionArea = response.data[0].visited_local_area
      }
    },
    getTableRowNumbering(index) {
      return (index + 1)
    },
    async handleDelete(item) {
      if (item) {
        this.dialogDelete = true
        this.dataDelete = item
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.contact_data_cannot_be_deleted'))
      }
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
