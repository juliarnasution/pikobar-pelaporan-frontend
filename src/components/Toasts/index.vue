<template>
  <v-snackbar
    v-model="isShow"
    :color="color"
    :top="top"
    dark
  >
    <v-icon
      color="white"
      class="mr-3"
    >
      mdi-bell-plus
    </v-icon>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-icon
        size="16"
        class="icon-close-toast"
        v-bind="attrs"
        @click="closeToast"
      >
        mdi-close-circle
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ToastDialog',
  data: () => ({
    top: true
  }),
  computed: {
    ...mapGetters('toast', [
      'show',
      'color',
      'message'
    ]),
    isShow: {
      set(show) {
        this.$store.dispatch('toast/inactiveToast')
      },
      get() {
        return this.show
      }
    }
  },
  methods: {
    closeToast() {
      this.$store.dispatch('toast/inactiveToast')
    }
  }
}
</script>

<style>
.v-alert--notification {
  border-radius: 4px !important;
  border-top: none !important;
}
</style>
