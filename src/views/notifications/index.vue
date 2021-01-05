<template>
  <div>
    <v-card
      outlined
      class="mt-2"
    >
      <v-card-title class="pb-0">
        {{ $t('route.notification') }}
        <v-spacer />
      </v-card-title>
      <v-divider />
      <filter-notification
        :list-query="listQuery"
        :on-search="getListNotifications"
      />
      <v-row>
        <table-notification
          :is-loading="isLoading"
          :list-query="listQuery"
          :list-notification="notificationList"
        />
      </v-row>
    </v-card>
    <pagination
      :total="totalPages"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Notifications',
  data() {
    return {
      listNotification: [],
      isLoading: false,
      listQuery: {
        page: 1,
        limit: 30,
        search: '',
        eventType: '',
        createdAt: ''
      }
    }
  },
  computed: {
    ...mapGetters('notifications', [
      'totalPages',
      'notificationList'
    ])
  },
  watch: {
    'listQuery': {
      handler: function(value) {
        if ((value !== undefined) && (value.length >= 2)) {
          this.listQuery.page = 1
          this.getListNotifications()
        } else if (value.length === 0) {
          this.listQuery.page = 1
          this.getListNotifications()
        }
      },
      deep: true
    }
  },
  async mounted() {
    await this.getListNotifications()
  },
  methods: {
    async getListNotifications() {
      this.isLoading = true
      await this.$store.dispatch('notifications/getListNotifications', this.listQuery)
      this.isLoading = false
    },
    async onNext() {
      await this.getListNotifications()
    }
  }
}
</script>
