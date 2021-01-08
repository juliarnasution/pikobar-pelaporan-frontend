<template>
  <v-dialog v-model="show" max-width="40%">
    <v-card class="container">
      <v-row class="mx-0" align="center" justify="center">
        <v-card-title>
          <v-icon size="80px" color="success">mdi-checkbox-marked-circle</v-icon>
        </v-card-title>
      </v-row>
      <v-row class="mx-0" align="center" justify="center">
        <v-card-title class="display-1 font-weight-bold pt-0 success-message">
          {{ successDialogTitle }}
        </v-card-title>
      </v-row>
      <v-row class="mx-0" align="center" justify="center">
        <v-card-text
          :class="{'subtitle-1': $vuetify.breakpoint. mdAndDown, 'headline': $vuetify.breakpoint. lgAndUp}"
          class="pt-0 text-center success-message"
        >
          {{ successMessage }}
        </v-card-text>
      </v-row>
      <v-row class="mx-0" align="center" justify="center">
        <v-btn color="green darken-1" text @click="show = false">{{ $t('label.ok') }}</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'SuccessDialog',
  props: {
    successDialog: {
      type: Boolean,
      default: false
    },
    successDialogTitle: {
      type: String,
      default: ''
    },
    successMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tab: null,
      show: this.successDialog
    }
  },
  watch: {
    successDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:dialogSuccess', value)
    }
  }
}
</script>
