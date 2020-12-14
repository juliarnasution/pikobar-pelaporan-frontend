<template>
  <v-navigation-drawer
    v-model="isShowDrawer"
    right
    absolute
    temporary
  >
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :style="item.read ? 'background: #C0EDFF 30%':''"
        link
      >
        <notification-item :item="item" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

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
      items: [
        { status: 'Kasus Ditolak', time: '2020-12-12 15:00:00', body: 'test aja', read: false },
        { status: 'Kasus Ditolak', time: '2020-12-11 15:00:00', body: 'test aja', read: true }
      ]
    }
  },
  computed: {
    isShowDrawer: {
      set(drawerNotif) {
        this.$emit('update:notifDrawer', drawerNotif)
      },
      get() {
        return this.drawerNotif
      }
    }
  }
}
</script>
