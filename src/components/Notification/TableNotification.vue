<template>
  <v-col auto>
    <v-data-table
      :items="listNotification"
      :mobile-breakpoint="0"
      :no-data-text="$t('label.data_empty')"
      hide-default-footer
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ getTableRowNumbering(index) }}</td>
          <td><span>{{ timeRemain(item.createdAt) }}</span></td>
          <td><notification-status :status="item.eventType" :width-chip="'50%'" /></td>
          <td>{{ item.message }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
export default {
  name: 'TableNotification',
  props: {
    listNotification: {
      type: Array,
      default: function() { return [] }
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return (index + 1)
    },
    timeRemain(value) {
      const now = this.$moment()
      const maxVerifiedDate = this.$moment(value).add(1, 'days')

      return now.to(maxVerifiedDate)
    }
  }
}
</script>
