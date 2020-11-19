<template>
  <v-row class="ma-0">
    <v-col class="ma-0" cols="12" sm="12">
      <v-skeleton-loader
        :loading="loading"
        type="article"
      >
        <div class="progress-bar-case">
          <div class="progress-bar d-flex mb-2">
            <div
              v-if="totalData === 0"
              class="text-center"
              :style="{ width: '100%' }"
            />
            <div
              v-for="(item, index) in progress"
              :key="index"
              class="text-center"
              :class="item.class"
              :style="[
                item.percentBar,
                item.backgroundColor,
                item.zIndex,
                index > 0 ? {'margin-left': '-15px'} : {'margin-left': '0'}
              ]"
            />
          </div>
        </div>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'ProgressBarCase',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      totalData: 0,
      progress: []
    }
  },
  watch: {
    data: {
      handler(value) {
        this.getData()
      },
      deep: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const confirmed = this.data.confirmed || 10
      const probable = this.data.probable || 10
      const suspect = this.data.suspect || 10
      const closecontact = this.data.closecontact || 10

      this.totalData = confirmed + probable + suspect + closecontact

      const data = [
        {
          total: confirmed,
          background: '#EF5350'
        },
        {
          total: probable,
          background: '#FF7500'
        },
        {
          total: suspect,
          background: '#1E88E5'
        },
        {
          total: closecontact,
          background: '#16A75C'
        }
      ]
      this.progress = []
      for (let index = 0; index < data.length; index++) {
        if (data[index].total > 0) {
          const percent = (data[index].total / this.totalData) * 100
          this.progress.push({
            class: `progress-${index}`,
            percentBar: { width: Number(percent) + 10 + '%' },
            backgroundColor: { backgroundColor: data[index].background },
            zIndex: { zIndex: data.length - index }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar-case {
    .progress-bar {
        color: #ffffff;
        margin-bottom: 5px;
        background-color: #f5f5f5;
        border-radius: 13px;

        div {
            height: 20px;
            border-radius: 10px;
        }
    }
}
</style>
