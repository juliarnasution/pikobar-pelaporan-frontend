<template>
  <v-data-table
    :headers="headers"
    :items="listRecapCase"
    :mobile-breakpoint="NaN"
    :no-data-text="$t('label.data_empty')"
    :items-per-page="10"
    hide-default-footer
  >
    <template v-slot:item="{ item, index }">
      <tr>
        <td>{{ getTableRowNumbering(index) }}</td>
        <td>{{ item._id }}</td>
        <td>{{ item.confrimed_active }}</td>
        <td>{{ item.probable_active }}</td>
        <td>{{ item.suspect_active }}</td>
        <td>{{ item.closecontact_active }}</td>
        <td>{{ item.confrimed_recovered }}</td>
        <td>{{ item.confrimed_decease }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'TableRecap',
  props: {
    listRecapCase: {
      type: Array,
      default: function() { return [] }
    }
  },
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'KOTA/KAB', value: '_id' },
        { text: 'Total', value: 'confrimed_active' },
        { text: 'Masih Sakit', value: 'probable_active' },
        { text: 'Isolasi Mandiri', value: 'suspect_active' },
        { text: 'Isolasi RS', value: 'closecontact_active' },
        { text: 'Sembuh', value: 'confrimed_recovered' },
        { text: 'Meninggal', value: 'confrimed_decease' }
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
