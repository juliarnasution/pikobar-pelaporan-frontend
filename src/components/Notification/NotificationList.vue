<template>
  <div>
    <v-navigation-drawer
      v-model="isShowDrawer"
      class="mt-16"
      width="320"
      right
      fixed
      temporary
      overflow
    >
      <v-list>
        <v-list-item class="font-weight-bold" @click="onClose">
          <v-icon>mdi-chevron-left</v-icon>
          {{ $t('route.notification') }}
        </v-list-item>
      </v-list>
      <v-skeleton-loader
        :loading="isLoading"
        type="list-item-three-line"
      >
        <v-list d-flex dense style="max-height: 72vh;overflow: auto;">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :style="item.isRead ? '':'background: #C0EDFF 30%;'"
            link
          >
            <notification-item :item="item" :on-read="onRead" />
          </v-list-item>
        </v-list>
      </v-skeleton-loader>
      <template v-slot:append>
        <v-list-item class="mb-16 justify-center" @click="showAllNotifications">
          <span style="color: #27AE60;">{{ $t('label.see_all_notifications') }}</span>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <verification-form
      :show-form="showVerificationForm"
      :show.sync="showVerificationForm"
      :show-confirmation.sync="showConfirmation"
      :case-data="caseDetail"
      :close-contact-case="closeContactCase"
      :query-data="verificationQuery"
      :query.sync="verificationQuery"
    />
    <verification-confirmation
      :show-dialog="showConfirmation"
      :show.sync="showConfirmation"
      :query-data="verificationQuery"
      :query.sync="verificationQuery"
      :submit-data.sync="isSubmit"
    />
    <dialog-failed
      :show-dialog="showFailedDialog"
      :show.sync="showFailedDialog"
      :title="$t('label.verification_expired_title')"
      :message="''"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationList',
  props: {
    drawerNotif: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      params: {},
      items: [],
      isLoading: false,
      showVerificationForm: false,
      closeContactCase: [],
      showConfirmation: false,
      caseDetail: null,
      showFailedDialog: false,
      isSubmit: false,
      verificationQuery: {
        'id': '',
        'data': {
          'verified_status': '',
          'verified_comment': ''
        }
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'user_id'
    ]),
    isShowDrawer: {
      set(drawerNotif) {
        this.$emit('update:notifDrawer', drawerNotif)
      },
      get() {
        return this.drawerNotif
      }
    }
  },
  watch: {
    async drawerNotif(value) {
      if (value) {
        await this.getListNotifications()
      }
    },
    async isSubmit(value) {
      if (value) {
        const response = await this.$store.dispatch('reports/verifyCase', this.verificationQuery)
        if (response.status === 200 || response.status === 201) {
          await this.$store.dispatch('toast/successToast', this.verificationQuery.data.verified_status === 'verified' ? this.$t('success.verification_success') : this.$t('success.rejection_success'))
          this.handleSearch()
        }
        this.isSubmit = false
      }
    }
  },
  methods: {
    async onRead(item) {
      if (!item.isRead) {
        await this.$store.dispatch('notifications/onReadNotification', item._id)
        item.isRead = true
      }
      this.handleDetail(item.referenceId)
    },
    onClose() {
      this.$store.dispatch('notifDrawer/notificationDrawer', !this.isShowDrawer)
    },
    async getListNotifications() {
      this.isLoading = true
      const response = await this.$store.dispatch('notifications/getListNotifications', this.params)
      this.items = response.data ? response.data.itemsList : []
      this.isLoading = false
    },
    async handleDetail(id) {
      this.$store.commit('animationLottie/SET_LOADING', true)
      const response = await this.$store.dispatch('reports/detailReportCase', id)
      const path = `/laporan/detail-report/${id}`
      if (response.data.verified_status === 'declined' && this.$route.path !== path) this.$router.push(path)
      const responseCloseContact = await this.$store.dispatch('closeContactCase/getListCloseContactByCase', id)
      if (response.data.verified_status === 'verified') {
        this.showFailedDialog = true
      } else {
        this.caseDetail = response.data
        this.closeContactDetail = responseCloseContact.data
        if (response.data.verified_status !== 'declined') this.showVerificationForm = true
      }
      this.$store.commit('animationLottie/SET_LOADING', false)
    },
    showAllNotifications() {
      const path = '/notification-list-all'
      if (this.$route.path !== path) this.$router.push(path)
    }
  }
}
</script>
