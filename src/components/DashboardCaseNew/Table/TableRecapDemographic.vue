<template>
  <v-data-table
    :headers="headersTable"
    :items="listRecapDemographic"
    :loading="isLoading"
    :mobile-breakpoint="0"
    :no-data-text="$t('label.data_empty')"
    :items-per-page="100"
    hide-default-footer
  >
    <template v-slot:item="{ item, index }">
      <tr>
        <td>{{ getTableRowNumbering(index) }}</td>
        <td>{{ item._id }}</td>
        <td>{{ item.wni }}</td>
        <td>{{ item.wna }}</td>
        <td>{{ item.male }}</td>
        <td>{{ item.female }}</td>
        <td>{{ item.under_five }}</td>
        <td>{{ item.six_nine }}</td>
        <td>{{ item.twenty_twenty_nine }}</td>
        <td>{{ item.thirty_thirty_nine }}</td>
        <td>{{ item.forty_forty_nine }}</td>
        <td>{{ item.fifty_fifty_nine }}</td>
        <td>{{ item.sixty_sixty_nine }}</td>
        <td>{{ item.seventy_seventy_nine }}</td>
        <td>{{ item.greater_eighty }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'TableRecapDemographic',
  props: {
    listRecapDemographic: {
      type: Array,
      default: function() { return [] }
    },
    headersTable: {
      type: Array,
      default: function() { return [] }
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
