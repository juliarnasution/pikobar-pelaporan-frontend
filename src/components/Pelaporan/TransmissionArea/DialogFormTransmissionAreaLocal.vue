<template>
  <v-dialog v-model="showFormAddTransmissionAreaLokal" max-width="70%">
    <v-card>
      <v-container>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormAddTransmissionAreaLokal = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <ValidationObserver ref="observer">
          <v-form ref="form" lazy-validation>
            <form-transmission-area :form-pasien="formData" />
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
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
// import EventBus from '@/utils/eventBus'
export default {
  name: 'DialogFormTransmissionAreaLocal',
  components: {
    ValidationObserver
  },
  props: {
    showDialogAddTransmissionAreaLokal: {
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
    formData: {
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
      showFormAddTransmissionAreaLokal: this.showFormAddTransmissionAreaLokal,
      loading: false,
      formatDate: 'YYYY/MM/DD',
      dataCloseContact: []
    }
  },
  watch: {
    showDialogAddTransmissionAreaLokal(value) {
      this.showFormAddTransmissionAreaLokal = value
    },
    showFormAddTransmissionAreaLokal(value) {
      this.$emit('update:showFormAddTransmissionAreaLokal', value)
    }
  },
  methods: {
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormAddTransmissionAreaLokal', false)
      }
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      const data = {
        idCase: this.idCase,
        body: this.formData
      }
      if (!this.isEdit) {
        const response = await this.$store.dispatch('localTransmissionArea/postListLocalTransmissionArea', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('localTransmissionArea/resetStateLocalTransmissionArea')
        this.$emit('update:showFormAddTransmissionAreaLokal', false)
      } else {
        const response = await this.$store.dispatch('localTransmissionArea/postListLocalTransmissionArea', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('localTransmissionArea/resetStateLocalTransmissionArea')
        this.$emit('update:showFormAddTransmissionAreaLokal', false)
      }
      this.$refs.observer.reset()
    }
  }
}
</script>
