<template>
  <v-badge
    :value="item.isRead ? 0:1"
    dot
    overlap
  >
    <v-list-item class="pl-1" @click="onRead(item._id)">
      <v-list-item-content>
        <v-list-item-title>
          <notification-status :status="item.eventType" :date="item.createdAt" />
        </v-list-item-title>
        <v-list-item-subtitle class="subtitle-2 text-wrap">{{ item.message }}</v-list-item-subtitle>
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
    },
    onRead: {
      type: Function,
      default: null
    }
  }
}
</script>
