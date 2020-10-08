<template>
  <v-dialog v-model="show" max-width="50%">
    <v-card>
      <v-container>
        <v-row justify="center" align="center">
          <v-icon size="80px" color="red">mdi-close-circle</v-icon>
        </v-row>
        <v-row align="center" justify="center">
          <v-card-title class="display-1 font-weight-bold pt-0 message">{{ $t('label.nik_already_registered') }}</v-card-title>
        </v-row>
        <v-row justify="center" align="center">
          <v-card-text
            class="pt-0 text-center"
          >
            <h4>{{ content }}</h4>
          </v-card-text>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn color="green darken-1 pa-4" text @click="show = false">{{ $t('label.ok') }}</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DialogDuplicatedNik',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialog
    }
  },
  watch: {
    showDialog(value) {
      this.show = this.showDialog
    },
    show(value) {
      this.$emit('update:show', value)
    }
  }
}
</script>
<style>
.message {
  color: #eb3535;
}
</style>
