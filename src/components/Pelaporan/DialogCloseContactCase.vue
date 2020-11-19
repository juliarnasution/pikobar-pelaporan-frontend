<template>
  <v-row justify="center">
    <v-dialog
      v-model="showFormAddCloseContact"
      :fullscreen="$vuetify.mobileBreakpoint"
      max-width="90%"
    >
      <v-card>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormAddCloseContact = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <v-row class="ma-3">
          <v-container fluid>
            <ValidationObserver ref="observer">
              <v-form ref="form" lazy-validation>
                <form-single-close-contact
                  :form-close-contact="formCloseContact"
                  :form-pasien.sync="parentCase"
                  :is-edit="isEdit"
                />
              </v-form>
            </ValidationObserver>
            <v-row>
              <v-container fluid>
                <v-row>
                  <v-col class="text-right">
                    <v-btn
                      :loading="loading"
                      bottom
                      @click="handleBack"
                    >
                      {{ $t('label.cancel') }}
                    </v-btn>
                    <v-btn
                      :loading="loading"
                      class="ml-2"
                      color="success"
                      bottom
                      @click="handleSave"
                    >
                      {{ isEdit ? $t('label.edit'):$t('label.save') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-container>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import EventBus from '@/utils/eventBus'
export default {
  name: 'DialogCloseContactCase',
  components: {
    ValidationObserver
  },
  props: {
    showDialogAddCloseContact: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    formCloseContact: {
      type: Object,
      default: null
    },
    parentCase: {
      type: Object,
      default: null
    },
    idCase: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFormAddCloseContact: this.showDialogAddCloseContact,
      loading: false,
      formatDate: 'YYYY/MM/DD',
      dataCloseContact: []
    }
  },
  watch: {
    showDialogAddCloseContact(value) {
      this.showFormAddCloseContact = value
    },
    showFormAddCloseContact(value) {
      if (!value) {
        this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
      }
      this.$emit('update:showFormAddCloseContact', value)
    }
  },
  methods: {
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormAddCloseContact', false)
      }
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      delete this.formCloseContact['latest_history']
      if (!this.isEdit) {
        const updateFinalCloseContact = {
          id: this.idCase,
          data: [this.formCloseContact]
        }
        const response = await this.$store.dispatch('reports/addCloseContact', updateFinalCloseContact)
        this.loading = false
        if (response && (response.status === 200 || response.status === 201)) {
          await this.$store.dispatch('toast/successToast', this.$t('success.create_data_success'))
          this.dataCloseContact = []
        } else {
          this.dataCloseContact = []
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
        }
        await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
        this.$emit('update:showFormAddCloseContact', false)
        EventBus.$emit('refreshPageListReport', true)
      } else {
        const updateFinalCloseContact = {
          id: this.formCloseContact._id,
          data: this.formCloseContact
        }
        const response = await this.$store.dispatch('reports/updateCloseContact', updateFinalCloseContact)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
        this.$emit('update:showFormAddCloseContact', false)
        EventBus.$emit('refreshPageListReport', true)
      }
      this.$refs.observer.reset()
    }
  }
}
</script>
