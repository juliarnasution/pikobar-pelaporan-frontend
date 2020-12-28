<template>
  <div>
    <v-card
      outlined
      class="mt-2"
    >
      <v-row>
        <table-notification
          :is-loading="isLoading"
          :list-notification="listNotification"
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
export default {
  name: 'Notifications',
  data() {
    return {
      listNotification: [],
      isLoading: false,
      totalPages: 0,
      listQuery: {
        page: 1,
        limit: 100,
        search: ''
      }
    }
  },
  async mounted() {
    await this.getListNotifications()
  },
  methods: {
    async getListNotifications() {
      this.isLoading = true
      const response = await this.$store.dispatch('notifications/getListNotifications', this.listQuery)
      this.listNotification = response.data ? response.data.itemsList : []
      this.totalPages = response.data ? response.data._meta.totalPages : 0
      this.isLoading = false
    },
    async onNext() {
      await this.getListNotifications()
    }
  }
}
</script>
