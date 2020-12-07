<template>
  <v-dialog v-model="showFormAddPublicPlace" max-width="70%">
    <v-card>
      <v-container>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormAddPublicPlace = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <ValidationObserver ref="observer">
          <v-form ref="form" lazy-validation>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.place_category') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                  >
                    <v-select
                      v-model="formData.public_place_category"
                      :items="listPlaceCategory"
                      :error-messages="errors"
                      solo
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.name_place_visited') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="formData.public_place_name"
                      :label="$t('label.enter_place')"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.address_place_visited') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="formData.public_place_address"
                      :label="$t('label.enter_place')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.date_time_visit') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="formData.public_place_date_visited"
                      :value-date.sync="formData.public_place_date_visited"
                      :label="$t('label.choose_date')"
                      @changeDate="formData.public_place_date_visited = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.length_visit_duration') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" rules="noAlphabet">
                    <v-text-field
                      v-model.number="formData.public_place_duration_visited"
                      :error-messages="errors"
                      class="input-append-btn"
                      solo-inverted
                    >
                      <template v-slot:append>
                        <v-btn depressed tile min-width="20">
                          {{ $t('label.minutes') }}
                        </v-btn>
                      </template>
                    </v-text-field>
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
import { listPlaceCategory } from '@/utils/constantOption'
export default {
  name: 'DialogFormPublicPlace',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    showDialogAddPublicPlace: {
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
      showFormAddPublicPlace: this.showFormAddPublicPlace,
      loading: false,
      listPlaceCategory: listPlaceCategory,
      formatDate: 'YYYY/MM/DD',
      dataCloseContact: []
    }
  },
  watch: {
    showDialogAddPublicPlace(value) {
      this.showFormAddPublicPlace = value
    },
    showFormAddPublicPlace(value) {
      this.$emit('update:showFormAddPublicPlace', value)
    }
  },
  methods: {
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormAddPublicPlace', false)
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
        const response = await this.$store.dispatch('publicPlace/postListPublicPlace', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('publicPlace/resetStatePublicPlace')
        this.$emit('update:showFormAddPublicPlace', false)
      } else {
        const idPublicPlace = this.formData._id
        delete this.formData['_id']
        const data = {
          idPublicPlace: idPublicPlace,
          body: this.formData
        }
        const response = await this.$store.dispatch('publicPlace/updateDetailPublicPlace', data)
        this.loading = false
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        } else {
          await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
        }
        await this.$store.dispatch('publicPlace/resetStatePublicPlace')
        this.$emit('update:showFormAddPublicPlace', false)
      }
      this.$refs.observer.reset()
    }
  }
}
</script>
