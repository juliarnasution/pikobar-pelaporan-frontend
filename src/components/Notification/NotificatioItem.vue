<template>
  <v-badge
    dot
    overlap
  >
    <v-list-item class="pl-1">
      <v-list-item-content>
        <v-list-item-title>
          <v-chip
            color="#EB5757"
            label
            small
          >
            {{ item.status }}
          </v-chip>
          <span class="ml-1">{{ timeRemain(item.time) }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>{{ item.body }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-badge>
</template>
<script>

export default {
  name: 'NotificationItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    timeRemain(value) {
      const now = this.$moment()
      const maxVerifiedDate = this.$moment(value).add(1, 'days')

      return now.to(maxVerifiedDate)
    }
  }
}
</script>
