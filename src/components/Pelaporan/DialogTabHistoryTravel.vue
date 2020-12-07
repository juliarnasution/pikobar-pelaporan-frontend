<template>
  <v-row justify="center">
    <v-dialog v-model="show" :fullscreen="$vuetify.breakpoint.xs" max-width="90%">
      <v-card>
        <v-toolbar
          flat
          color="primary"
          dark
        >
          <v-toolbar-title>{{ titleDetail }}</v-toolbar-title>
          <v-spacer />
          <v-icon @click="show = false">mdi-close</v-icon>
        </v-toolbar>
        <v-row class="ma-2">
          <v-tabs
            centered
            hide-slider
            background-color="#F5F5F5"
            class="ml-6 mr-6 rounded-pill"
          >
            <v-tab class="text-left">
              {{ $t('label.from_abroad_or_out_town') }}
            </v-tab>
            <v-tab class="text-left">
              {{ $t('label.to_local_transmission') }}
            </v-tab>
            <v-tab class="text-left">
              {{ $t('label.to_public_place') }}
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <table-history-travel
                  :list-history-travel="listHistoryTravel"
                  :handle-update-report="handleUpdateReportHistoryTravel"
                  :handle-delete="handleDeleteHistoryTravel"
                />
                <v-card
                  min-height="100"
                  class="mx-auto mt-2 border-card"
                  @click="handleCreateHistoryTravel"
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
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <table-transmission-area-local
                  :list-transmission-area="listTransmissionArea"
                  :handle-update-report="handleUpdateReportTransmission"
                  :handle-delete="handleDeleteTransmission"
                />
                <v-card
                  min-height="100"
                  class="mx-auto ml-6 mr-6 mt-2 border-card"
                  @click="handleCreateTransmission"
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
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <table-public-place
                  :list-public-place="listPublicPlace"
                  :handle-update-report="handleUpdateReportPublicPlace"
                  :handle-delete="handleDeletePublicPlace"
                />
                <v-card
                  min-height="100"
                  class="mx-auto mt-2 border-card"
                  @click="handleCreatePublicPlace"
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
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-row>
        <v-row class="ml-3 mr-3 mb-3">
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
      </v-card>
      <dialog-form-history-travel
        :show-dialog-add-history-travel="showFormHistoryTravel"
        :show-form-add-history-travel.sync="showFormHistoryTravel"
        :title-detail="isEditHistoryTravel ? $t('label.edit_history'):$t('label.input_history')"
        :form-data.sync="formBody"
        :is-edit.sync="isEditHistoryTravel"
        :id-case="idCase"
      />
      <dialog-form-public-place
        :show-dialog-add-public-place="showFormPublicPlace"
        :show-form-add-public-place.sync="showFormPublicPlace"
        :title-detail="isEditPublicPlace ? $t('label.edit_history'):$t('label.input_history')"
        :form-data.sync="formBody"
        :is-edit.sync="isEditPublicPlace"
        :id-case="idCase"
      />
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
        :store-path-delete="storePathDelete"
      />
    </v-dialog>
  </v-row>
</template>
<script>
import { ResponseRequest } from '@/utils/constantVariable'
import { mapState } from 'vuex'
export default {
  name: 'DialogTabHistoryTravel',
  props: {
    titleDetail: {
      type: String,
      default: ''
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    idCase: {
      type: String,
      default: ''
    },
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialog,
      isLoading: false,
      showFormHistoryTravel: false,
      isEditHistoryTravel: false,
      showFormPublicPlace: false,
      isEditPublicPlace: false,
      showTransmissionAreaLokal: false,
      isEditTransmissionAreaLokal: false,
      dialogDelete: false,
      dataDelete: null,
      storePathDelete: '',
      formBody: {},
      listHistoryTravel: [],
      listTransmissionArea: [],
      listPublicPlace: []
    }
  },
  computed: {
    ...mapState('historyTravel', [
      'formHistoryTravel'
    ]),
    ...mapState('publicPlace', [
      'formPublicPlace'
    ])
  },
  watch: {
    showDialog(value) {
      if (value) {
        this.getListHistoryTravel(this.idCase)
        this.getListTransmissionArea(this.idCase)
        this.getListPublicPlace(this.idCase)
      }
      this.show = value
    },
    dialogDelete(value) {
      if (!value) {
        this.getListHistoryTravel(this.idCase)
        this.getListTransmissionArea(this.idCase)
        this.getListPublicPlace(this.idCase)
      }
    },
    show(value) {
      this.$emit('update:show', value)
    },
    showFormHistoryTravel(value) {
      if (!value) {
        this.getListHistoryTravel(this.idCase)
      }
    },
    showFormPublicPlace(value) {
      if (!value) {
        this.getListPublicPlace(this.idCase)
      }
    },
    showTransmissionAreaLokal(value) {
      if (!value) {
        this.getListTransmissionArea(this.idCase)
      }
    }
  },
  methods: {
    handleCreateHistoryTravel() {
      this.$store.dispatch('historyTravel/resetStateHistoryTravel')
      this.formBody = this.formHistoryTravel
      this.isEditHistoryTravel = false
      this.showFormHistoryTravel = true
    },
    handleUpdateReportHistoryTravel(item) {
      this.formBody = item
      this.isEditHistoryTravel = true
      this.showFormHistoryTravel = true
    },
    async getListHistoryTravel(id) {
      const response = await this.$store.dispatch('historyTravel/getListHistoryTravel', id)
      if (response !== undefined) {
        this.listHistoryTravel = response.data[0].travelling_history
      }
    },
    handleCreateTransmission() {
      this.$store.dispatch('localTransmissionArea/resetStateLocalTransmissionArea')
      this.formBody = {}
      this.isEditTransmissionAreaLokal = false
      this.showTransmissionAreaLokal = true
    },
    handleUpdateReportTransmission(item) {
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
    handleCreatePublicPlace() {
      this.$store.dispatch('publicPlace/resetStatePublicPlace')
      this.formBody = this.formPublicPlace
      this.isEditPublicPlace = false
      this.showFormPublicPlace = true
    },
    handleUpdateReportPublicPlace(item) {
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
    handleDeleteHistoryTravel(item) {
      if (item) {
        this.storePathDelete = 'historyTravel/deleteHistoryTravel'
        this.dialogDelete = true
        this.dataDelete = item
      } else {
        this.$store.dispatch('toast/errorToast', this.$t('errors.contact_data_cannot_be_deleted'))
      }
    },
    handleDeleteTransmission(item) {
      if (item) {
        this.storePathDelete = 'localTransmissionArea/deleteLocalTransmissionArea'
        this.dialogDelete = true
        this.dataDelete = item
      } else {
        this.$store.dispatch('toast/errorToast', this.$t('errors.contact_data_cannot_be_deleted'))
      }
    },
    handleDeletePublicPlace(item) {
      if (item) {
        this.storePathDelete = 'publicPlace/deletePublicPlace'
        this.dialogDelete = true
        this.dataDelete = item
      } else {
        this.$store.dispatch('toast/errorToast', this.$t('errors.contact_data_cannot_be_deleted'))
      }
    },
    async updateCase() {
      this.isLoading = true
      const updateCase = {
        id: this.idCase,
        data: this.formPasien
      }
      const response = await this.$store.dispatch('reports/updateReportCase', updateCase)
      if (response.status !== ResponseRequest.UNPROCESSABLE) {
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        await this.$store.dispatch('reports/resetFormPasien')
        await this.$store.dispatch('reports/resetRiwayatFormPasien')
        this.isLoading = false
      } else {
        this.isLoading = false
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
      }
    }
  }
}
</script>
<style scoped>
    .v-tab {
        width: 80% !important;
        max-width: 100% !important;
        color: #828282 !important;
    }
    .v-tab--active {
        background: #27AE60 !important;
        border-radius: 8px !important;
        color: #FFFFFF !important;
    }
   .border-card {
      color: #828282;
      border: 1px dashed #E0E0E0 !important;
      box-sizing: border-box !important;
      border-radius: 8px !important;
   }
</style>
