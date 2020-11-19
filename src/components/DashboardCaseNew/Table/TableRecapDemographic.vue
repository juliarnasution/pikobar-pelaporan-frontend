<template>
  <v-data-table
    :headers="headers"
    :items="listRecapDemographic"
    :mobile-breakpoint="NaN"
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
    }
  },
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'KOTA/KAB', value: '_id' },
        { text: 'WNI', value: 'wni' },
        { text: 'WNA', value: 'wna' },
        { text: 'LAKI-LAKI', value: 'male' },
        { text: 'PEREMPUAN', value: 'female' },
        { text: '<5TH', value: 'under_five' },
        { text: '6-9TH', value: 'six_nine' },
        { text: '20-29TH', value: 'twenty_twenty_nine' },
        { text: '30-39TH', value: 'thirty_thirty_nine' }
      ]
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
