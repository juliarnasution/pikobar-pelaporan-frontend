<template>
  <form>
    <v-text-field
      v-model="listQuery.search"
      v-debounce:300="handleSearch"
      :label="$t('label.search')"
      solo-inverted
      clearable
      prepend-inner-icon="search"
    />
  </form>
</template>

<script>
export default {
  name: 'Search',
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    handleSearch: {
      type: Function,
      default: null
    }
  }
}
</script>
