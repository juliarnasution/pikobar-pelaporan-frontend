<template>
  <v-dialog v-model="show" persistent max-width="30%">
    <v-card>
      <v-card-title class="headline">
        <v-icon x-large color="red" left>mdi-close-circle</v-icon>
        {{ failedDialogTitle }}
      </v-card-title>
      <v-card-text>{{ errorMessage }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="show = false">{{ $t('label.ok') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'FailedDialog',
  props: {
    failedDialog: {
      type: Boolean,
      default: false
    },
    failedDialogTitle: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tab: null,
      show: this.failedDialog
    }
  },
  watch: {
    failedDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:dialogFailed', value)
    }
  }
}
</script>
