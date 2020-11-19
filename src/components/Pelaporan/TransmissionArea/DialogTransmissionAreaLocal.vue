<template>
  <v-dialog v-model="show" max-width="70%">
    <v-skeleton-loader
      :loading="isLoading"
      type="table-tbody"
    >
      <v-card>
        <v-container>
          <v-card-title :class="{'h5': $vuetify.breakpoint.xs}">
            {{ titleDetail }}
            <v-spacer />
            <v-icon @click="show = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <table-transmission-area-local
            :list-transmission-area="listTransmissionArea"
            :handle-update-report="handleUpdateReport"
            :handle-delete="handleDelete"
          />
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
