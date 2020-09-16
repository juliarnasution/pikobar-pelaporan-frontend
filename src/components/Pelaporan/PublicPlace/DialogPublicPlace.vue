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
                :items="listPublicPlace"
                :mobile-breakpoint="NaN"
                :no-data-text="$t('label.data_empty')"
                :items-per-page="10"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ getTableRowNumbering(index) }}</td>
                    <td>{{ item.public_place_category }}</td>
                    <td>{{ item.public_place_name }}</td>
                    <td>{{ item.public_place_address }}</td>
                    <td>
                      {{ item.public_place_date_visited ? formatDatetime(item.public_place_date_visited, 'DD MMMM YYYY') : '-' }}
                    </td>
                    <td>
                      {{ item.public_place_duration_visited }} {{ item.public_place_duration_visited ? $t('label.minutes') : '-' }}
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
    <dialog-form-public-place
      :show-dialog-add-public-place="showFormPublicPlace"
      :show-form-add-public-place.sync="showFormPublicPlace"
      :title-detail="isEditPublicPlace ? $t('label.edit_history'):$t('label.input_history')"
      :form-data.sync="formBody"
      :is-edit.sync="isEditPublicPlace"
      :id-case="idCase"
    />
    <dialog-delete
      :dialog="dialogDelete"
      :dialog-delete.sync="dialogDelete"
      :data-deleted="dataDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`publicPlace/deletePublicPlace`"
    />
  </v-dialog>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'DialogPublicPlace',
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
      isEditPublicPlace: false,
      isLoading: false,
      listPublicPlace: [],
      formBody: {},
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.category').toUpperCase(), value: 'public_place_category' },
        { text: this.$t('label.name_place').toUpperCase(), value: 'public_place_name' },
        { text: this.$t('label.address').toUpperCase(), value: 'public_place_address' },
        { text: this.$t('label.date').toUpperCase(), value: 'public_place_date_visited' },
        { text: this.$t('label.duration').toUpperCase(), value: 'public_place_duration_visited' },
        { text: this.$t('label.action').toUpperCase(), width: '10%', value: 'actions' }
      ],
      dialogDecline: false,
      formatDate: 'YYYY/MM/DD',
      refreshPageList: false,
      showDialogUpdateCloseContact: false,
      showFormPublicPlace: false,
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
    ...mapState('publicPlace', [
      'formPublicPlace'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
      if (value) {
        this.getListPublicPlace(this.idCase)
      }
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    },
    showFormPublicPlace(value) {
      if (!value) {
        this.getListPublicPlace(this.idCase)
      }
    },
    dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        this.getListPublicPlace(this.idCase)
      }
    }
  },
  methods: {
    formatDatetime,
    async handleCreate() {
      await this.$store.dispatch('publicPlace/resetStatePublicPlace')
      this.formBody = this.formPublicPlace
      this.isEditPublicPlace = false
      this.showFormPublicPlace = true
    },
    async handleUpdateReport(item) {
      this.formBody = item
      this.isEditPublicPlace = true
      this.showFormPublicPlace = true
    },
    async getListPublicPlace(id) {
      const response = await this.$store.dispatch('publicPlace/getListPublicPlace', id)
      if (response !== undefined) {
        this.listPublicPlace = response.data[0].visited_public_place
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
