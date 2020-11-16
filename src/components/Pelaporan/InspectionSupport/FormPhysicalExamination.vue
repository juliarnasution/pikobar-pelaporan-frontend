<template>
  <v-form ref="form" lazy-validation>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.physical_check') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider v-slot="{ errors }" rules="noAlphabet">
              <v-text-field
                v-model.number="formPasien.physical_check_temperature"
                name="physical_check_temperature"
                class="input-append-btn"
                :disabled="!isEdit"
                solo-inverted
                :placeholder="$t('label.temperature')"
                :error-messages="errors"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    &#778;C
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_blood_pressure"
                name="physical_check_blood_pressure"
                class="input-append-btn"
                solo-inverted
                :disabled="!isEdit"
                :placeholder="$t('label.blood_pressure')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    mmHg
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_pulse"
                name="physical_check_pulse"
                class="input-append-btn"
                solo-inverted
                :disabled="!isEdit"
                :placeholder="$t('label.pulse')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.x_minute') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_respiration"
                name="physical_check_respiration"
                class="input-append-btn"
                solo-inverted
                :disabled="!isEdit"
                :placeholder="$t('label.respiration')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.x_minute') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_height"
                name="physical_check_height"
                class="input-append-btn"
                solo-inverted
                :disabled="!isEdit"
                :placeholder="$t('label.height')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Cm
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field
                v-model.number="formPasien.physical_check_weight"
                name="physical_check_weight"
                class="input-append-btn"
                solo-inverted
                :disabled="!isEdit"
                :placeholder="$t('label.weight')"
              >
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Kg
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-row>
        <v-col cols="9" />
        <v-col>
          <v-btn
            :loading="isLoading"
            color="success"
            @click="handleChange"
          >
            {{ isEdit ? 'Simpan':'Edit' }}
          </v-btn>
        </v-col>
      </v-row> -->
  </v-form>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
// import { ResponseRequest } from '@/utils/constantVariable'
export default {
  name: 'FormPhysicalExamination',
  components: {
    ValidationProvider
  },
  props: {
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
      isLoading: false,
      isEdit: true
    }
  },
  methods: {
    // async handleChange() {
    //   this.isEdit = !this.isEdit
    //   if (!this.isEdit) {
    //     this.isLoading = true
    //     const updateCase = {
    //       id: this.idCase,
    //       data: this.formPasien
    //     }
    //     const response = await this.$store.dispatch('reports/updateReportCase', updateCase)
    //     if (response.status !== ResponseRequest.UNPROCESSABLE) {
    //       await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
    //       await this.$store.dispatch('reports/resetFormPasien')
    //       await this.$store.dispatch('reports/resetRiwayatFormPasien')
    //       this.isLoading = false
    //     } else {
    //       this.isLoading = false
    //       await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
    //     }
    //   }
    // }
  }
}
</script>
