<template>
  <div>
    <v-list shaped>
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
      />
      <!-- <v-list-item @click="handleHelp">
        <v-list-item-icon>
          <v-icon>mdi-help-box</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Bantuan</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  data: () => ({
    drawer: null,
    item: null
  }),
  computed: {
    ...mapGetters('permission', [
      'permission_routes'
    ]),
    ...mapGetters('user', [
      'roles'
    ])
  },
  methods: {
    async handleCreate() {
      await this.$store.dispatch('reports/resetFormPasien')
      await this.$router.push('/laporan/stepper')
    },
    handleHelp() {
      window.open(process.env.VUE_APP_GUIDELINE_BOOK_URL, '_blank')
    }
  }
}
</script>
