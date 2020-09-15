<template>
  <v-dialog v-model="showFormAddHistoryTravel" max-width="70%">
    <v-card>
      <v-container>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormAddHistoryTravel = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <ValidationObserver ref="observer">
          <v-form ref="form" lazy-validation>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label class="required">{{ $t('label.trip_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-radio-group
                      v-model="formData.travelling_type"
                      :error-messages="errors"
                      row
                    >
                      <v-radio :label="$t('label.from_abroad')" value="Dari Luar Negeri" />
                      <v-radio :label="$t('label.from_outside_city')" value="Dari Luar Kota" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <form-travelling-visited
                :form-pasien="formData"
              />
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.start_travel') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="formData.travelling_date"
                      :value-date.sync="formData.travelling_date"
                      :label="$t('label.choose_date')"
                      @changeDate="formData.travelling_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.end_travel') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="formData.travelling_arrive"
                      :value-date.sync="formData.travelling_arrive"
                      :label="$t('label.choose_date')"
                      @changeDate="formData.travelling_arrive = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'DialogFormHistoryTravel',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    showDialogAddHistoryTravel: {
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
      showFormAddHistoryTravel: this.showFormAddHistoryTravel,
      loading: false,
      formatDate: 'YYYY/MM/DD',
      dataCloseContact: []
    }
  },
  watch: {
    showDialogAddHistoryTravel(value) {
      this.showFormAddHistoryTravel = value
    },
    showFormAddHistoryTravel(value) {
      this.$emit('update:showFormAddHistoryTravel', value)
    }
  },
  methods: {
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormAddHistoryTravel', false)
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
        const response = await this.$store.dispatch('historyTravel/postListHistoryTravel', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('historyTravel/resetStateHistoryTravel')
        this.$emit('update:showFormAddHistoryTravel', false)
      } else {
        const idHistoryTravel = this.formData._id
        delete this.formData['_id']
        const data = {
          idHistoryTravel: idHistoryTravel,
          body: this.formData
        }
        const response = await this.$store.dispatch('historyTravel/updateDetailHistoryTravel', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('historyTravel/resetStateHistoryTravel')
        this.$emit('update:showFormAddHistoryTravel', false)
      }
      this.$refs.observer.reset()
    }
  }
}
</script>
