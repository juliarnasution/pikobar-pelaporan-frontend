<template>
  <v-data-table
    :headers="headersTable"
    :items="listRecapCase"
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
        <td>{{ amountData(item) }}</td>
        <td>{{ item.active }}</td>
        <td>{{ item.sick_home }}</td>
        <td>{{ item.sick_hospital }}</td>
        <td>{{ item.recovered }}</td>
        <td>{{ item.decease }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'TableRecapCase',
  props: {
    listRecapCase: {
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
    },
    amountData(item) {
      const active = item.active || 0
      const sick_home = item.sick_home || 0
      const sick_hospital = item.sick_hospital || 0
      const recovered = item.recovered || 0
      const decease = item.decease || 0
      const sum = active + sick_home + sick_hospital + recovered + decease
      return sum
    }
  }
}
</script>
