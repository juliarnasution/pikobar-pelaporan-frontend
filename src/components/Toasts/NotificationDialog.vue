<template>
  <v-snackbar
    v-model="isShowNotification"
    color="#F0FFFFFF"
    top
    right
    dark
  >
    <v-row class="py-0">
      <v-col cols="2" class="justify">
        <v-img
          src="@/static/loader.svg"
          max-height="80"
          max-width="80"
        />
      </v-col>
      <v-col cols="8" class="justify">
        <v-list-item-title class="font-weight-bold black--text">
          {{ message.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-wrap black--text">
          {{ message.body }}
        </v-list-item-subtitle>
      </v-col>
      <v-col cols="2" class="justify">
        <v-icon
          size="16"
          color="black"
          class="icon-close-toast"
          @click="closeToast"
        >
          mdi-close-circle
        </v-icon>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationDialog',
  computed: {
    ...mapGetters('toast', [
      'notification',
      'message'
    ]),
    isShowNotification: {
      set(notification) {
        this.$store.dispatch('toast/inactiveToast')
      },
      get() {
        return this.notification
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
