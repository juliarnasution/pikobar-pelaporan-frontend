<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
    >
      <v-autocomplete
        v-debounce:500="handleSearch"
        :no-data-text="$t('label.internal_and_external_data_not_found')"
        :placeholder="$t('label.no_data_autocomplete_case')"
        :disabled="disabledCase"
        :error-messages="errors"
        :loading="isLoading"
        :items="listKasus"
        menu-props="auto"
        item-value="_id"
        item-text="name"
        autocomplete
        single-line
        solo
        return-object
        clearable
        @change="onSelectCase"
      >
        <template v-slot:selection="{ item }">
          {{ item.id_case }} - {{ item.name }} - {{ item.nik }}
        </template>
        <template v-slot:item="{ item }">
          {{ item.id_case }} - {{ item.name }} - {{ item.nik }}
        </template>
      </v-autocomplete>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'AutocompleteNewCase',
  components: {
    ValidationProvider
  },
  props: {
    requiredValidation: {
      type: Boolean,
      default: false
    },
    onSelectCase: {
      type: Function,
      default: null
    },
    disabledCase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      listKasus: [],
      listQuery: {
        keyword: null
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ])
  },
  methods: {
    async handleSearch(value) {
      if (!value) this.$emit('handle-source-data-info', false)
      this.isLoading = true
      this.listQuery.keyword = value
      const response = await this.$store.dispatch('reports/searchCase', this.listQuery)
      this.listKasus = response.data
      this.isLoading = false
    }
  }
}
</script>
