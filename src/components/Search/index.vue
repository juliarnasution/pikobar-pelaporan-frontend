<template>
  <form @submit.prevent="handleSearch">
    <v-text-field
      v-model="listQuery.search"
      v-debounce:500="handleSearch"
      :label="$t('label.search')"
      name="search"
      solo-inverted
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
