<template>
  <v-dialog
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xs"
    max-width="90%"
  >
    <v-card>
      <v-card-title>
        {{ $t('label.exposure_factor') }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-container>
        <ValidationObserver ref="observer">
          <form-contact-factor :form-pasien="formPasien" />
        </ValidationObserver>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-btn
                :loading="isLoading"
                bottom
                block
                @click="handleCancel"
              >
                {{ $t('label.cancel') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                :loading="isLoading"
                class="ml-2"
                color="success"
                bottom
                block
                @click="handleUpdate"
              >
                {{ $t('label.change_exposure_factor') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { ResponseRequest } from '@/utils/constantVariable'
import { validateScrollUp } from '@/utils/utilsFunction'
import { mapGetters } from 'vuex'

export default {
  name: 'DialogContactFactor',
  components: {
    ValidationObserver
  },
  props: {
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
      isLoading: false,
      show: this.showDialog
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  async mounted() {
  },
  methods: {
    validateScrollUp,
    async handleCancel() {
      this.$emit('update:show', false)
    },
    async handleUpdate() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.validateScrollUp()
        return
      }
      this.isLoading = true
      this.formPasien._meta.status_exposurecontact = 1
      const updateCase = {
        id: this.idCase,
        data: this.formPasien
      }
      const response = await this.$store.dispatch('reports/updateReportCase', updateCase)
      if (response.status !== ResponseRequest.UNPROCESSABLE) {
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
        await this.$store.dispatch('reports/resetFormPasien')
        await this.$store.dispatch('reports/resetRiwayatFormPasien')
        this.$emit('update:show', false)
        this.isLoading = false
      } else {
        this.isLoading = false
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
        this.$emit('update:show', false)
      }
    }
  }
}
</script>
