<template>
  <v-dialog
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xs"
    max-width="90%"
  >
    <v-skeleton-loader
      :loading="isLoading"
      type="table-tbody"
    >
      <v-card>
        <v-container>
          <v-card-title :class="{'subtitle-1': $vuetify.breakpoint.xs}">
            {{ titleDetail }}
            <v-spacer />
            <v-icon @click="show = false">mdi-close</v-icon>
          </v-card-title>
          <v-divider />
          <table-inspection-support
            :list-inspection-support="listInspectionSupport"
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
                  <div>{{ $t('label.add_inspection_support') }}</div>
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
    <dialog-form-inspection-support
      :show-dialog-add-inspection-support="showFormInspectionSupport"
      :show-form-add-inspection-support.sync="showFormInspectionSupport"
      :title-detail="isEditInspectionSupport ? $t('label.edit_inspection_support'):$t('label.input_inspection_support')"
      :form-data.sync="formBody"
      :is-edit.sync="isEditInspectionSupport"
      :id-case="idCase"
    />
    <dialog-delete
      :dialog="dialogDelete"
      :dialog-delete.sync="dialogDelete"
      :data-deleted="dataDelete"
      :delete-date.sync="dataDelete"
      :store-path-delete="`inspectionSupport/deleteInspectionSupport`"
    />
  </v-dialog>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'DialogInspectionSupport',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    isCompleteData: {
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
      isEditInspectionSupport: false,
      isLoading: false,
      listInspectionSupport: [],
      formBody: {},
      dialogDecline: false,
      formatDate: 'YYYY/MM/DD',
      refreshPageList: false,
      showDialogUpdateCloseContact: false,
      showFormInspectionSupport: false,
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
    ...mapState('inspectionSupport', [
      'formInspectionSupport'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      if (value) {
        this.getListInspectionSupport(this.idCase)
      }
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    },
    showFormInspectionSupport(value) {
      if (!value) {
        this.getListInspectionSupport(this.idCase)
      }
    },
    dialogDelete(value) {
      if (!value) {
        this.dataDelete = null
        this.getListInspectionSupport(this.idCase)
      }
    }
  },
  methods: {
    formatDatetime,
    async handleCreate() {
      await this.$store.dispatch('inspectionSupport/resetStateInspectionSupport')
      this.formBody = this.formInspectionSupport
      this.isEditInspectionSupport = false
      this.showFormInspectionSupport = true
    },
    async handleUpdateReport(item) {
      this.formBody = item
      this.isEditInspectionSupport = true
      this.showFormInspectionSupport = true
    },
    async getListInspectionSupport(id) {
      const response = await this.$store.dispatch('inspectionSupport/getListInspectionSupport', id)
      if (response !== undefined) {
        this.listInspectionSupport = response.data[0].inspection_support
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
