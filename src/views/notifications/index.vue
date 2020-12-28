<template>
  <div>
    <v-card
      outlined
      class="mt-2"
    >
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
        limit: 100,
        search: ''
      }
    }
  },
  computed: {
    ...mapGetters('notifications', [
      'totalPages',
      'notificationList'
    ])
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
