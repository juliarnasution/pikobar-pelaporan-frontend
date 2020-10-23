<template>
  <v-row justify="center">
    <v-dialog v-model="show" max-width="90%">
      <v-skeleton-loader
        :loading="isLoading"
        type="table-tbody"
      >
        <v-card>
          <v-card-title :class="{'subtitle-1': $vuetify.breakpoint.xs}">
            {{ titleDetail }}
            <v-spacer />
            <v-icon @click="show = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <table-history-travel
            :list-history-travel="listHistoryTravel"
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
        </v-card>
      </v-skeleton-loader>
      <dialog-form-history-travel
        :show-dialog-add-history-travel="showFormHistoryTravel"
        :show-form-add-history-travel.sync="showFormHistoryTravel"
        :title-detail="isEditHistoryTravel ? $t('label.edit_history'):$t('label.input_history')"
        :form-data.sync="formBody"
        :is-edit.sync="isEditHistoryTravel"
        :id-case="idCase"
      />
      <dialog-delete
        :dialog="dialogDelete"
        :dialog-delete.sync="dialogDelete"
        :data-deleted="dataDelete"
        :delete-date.sync="dataDelete"
        :store-path-delete="`historyTravel/deleteHistoryTravel`"
      />
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DialogHistoryTravel',
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
      isEditHistoryTravel: false,
      isLoading: false,
      listHistoryTravel: [],
      formBody: {},
      dialogDecline: false,
      formatDate: 'YYYY/MM/DD',
      refreshPageList: false,
      showDialogUpdateCloseContact: false,
      showFormHistoryTravel: false,
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
    ...mapState('historyTravel', [
      'formHistoryTravel'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
      if (value) {
        this.getListHistoryTravel(this.idCase)
      }
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    },
    showFormHistoryTravel(value) {
      if (!value) {
        this.getListHistoryTravel(this.idCase)
      }
    },
    dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        this.getListHistoryTravel(this.idCase)
      }
    }
  },
  methods: {
    async handleCreate() {
      await this.$store.dispatch('historyTravel/resetStateHistoryTravel')
      this.formBody = this.formHistoryTravel
      this.isEditHistoryTravel = false
      this.showFormHistoryTravel = true
    },
    async handleUpdateReport(item) {
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
