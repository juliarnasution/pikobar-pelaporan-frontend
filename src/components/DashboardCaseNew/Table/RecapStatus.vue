<template>
  <div>
    <v-tabs
      v-model="tab"
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-container>
          <v-row v-if="item === 'Ringkasan'">
            <v-col>
              <table-recap
                :list-recap-case="listRecapCase"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-list class="ma-0">
                <v-list-item-group class="ma-0">
                  <v-list-item
                    v-for="data in dataVisualization"
                    :key="data._id"
                  >
                    <v-list-item-title style="max-width: 150px;" v-text=" data._id" />
                    <v-list-item-title>
                      <progress-bar-case
                        :loading="false"
                        :data="data"
                      />
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>

export default {
  name: 'RecapStatus',
  data() {
    return {
      tab: null,
      items: [
        'Ringkasan', 'Visualisasi Data'
      ],
      dataVisualization: {},
      params: {},
      listRecapCase: []
    }
  },
  mounted() {
    this.getVisualizationCase()
  },
  methods: {
    async getVisualizationCase() {
      const res = await this.$store.dispatch('statistic/agregateVisualizationCase', this.params)
      console.log(res.data[0].visualization)
      if (res.data) {
        this.dataVisualization = res.data[0].visualization
      }
    }
  }
}
</script>
