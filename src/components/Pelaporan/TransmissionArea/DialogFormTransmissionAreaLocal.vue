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
          <form-transmission-area
            :form-pasien="formData"
          />
        </ValidationObserver>
        <v-row>
          <v-col cols="12" lg="6" sm="6">
            <v-btn
              :loading="loading"
              bottom
              block
              @click="handleBack"
            >
              {{ $t('label.cancel') }}
            </v-btn>
          </v-col>
          <v-col cols="12" lg="6" sm="6">
            <v-btn
              :loading="loading"
              color="success"
              bottom
              block
              @click="handleSave"
            >
              {{ isEdit ? $t('label.edit'):$t('label.save') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
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
      this.$emit('update:formData', {})
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true

      if (!this.isEdit) {
        const data = {
          idCase: this.idCase,
          body: this.formData
        }
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
        const idTransmissionArea = this.formData._id
        delete this.formData['_id']
        const data = {
          idTransmissionArea: idTransmissionArea,
          body: this.formData
        }
        const response = await this.$store.dispatch('localTransmissionArea/updateDetailLocalTransmissionArea', data)
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
