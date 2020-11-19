<template>
  <div>
    <breadcrumb />
    <div class="container-network-detail">
      <div class="header d-flex mb-3">
        <h3 class="title mb-0 mr-3"><strong>COVID-1025200329</strong></h3>
        <div class="status odp">ODP</div>
      </div>
      <!-- {{ $route.params.id }} -->
      <v-row class="content mb-3">
        <v-col>
          <v-card
            class="card mx-auto"
            outlined
          >
            <div class="c-label mb-1">Status</div>
            <div class="text recovery">Sembuh</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="card mx-auto"
            outlined
          >
            <div class="c-label mb-1">Jenis Kelamin</div>
            <div class="text">Laki-laki</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="card mx-auto"
            outlined
          >
            <div class="c-label mb-1">Usia</div>
            <div class="text">10 Tahun 5 Bulan</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="card mx-auto"
            outlined
          >
            <div class="c-label mb-1">Tanggal Muncul Gejala</div>
            <div class="text">20 September 2020</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="card mx-auto"
            outlined
          >
            <div class="c-label mb-1">Lokasi Saat Ini</div>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="text limit"
                  v-bind="attrs"
                  v-on="on"
                >RS SINGAPARNA MEDIKA CITRAUTAMA</span>
              </template>
              <span>RS SINGAPARNA MEDIKA CITRAUTAMA</span>
            </v-tooltip>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="content">
        <v-col
          cols="12"
          lg="8"
          md="12"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-card-title class="title ml-0 mb-0 black--text">
              Informasi Kasus
            </v-card-title>
            <v-divider class="mt-0 mb-0" />
            <v-card-text>asd</v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          md="12"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-card-title class="title ml-0 mb-0 black--text">
              Riwayat Kasus
            </v-card-title>
            <v-divider class="mt-0 mb-0" />
            <v-card-text>asd</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DistributionCaseNetworkDetail'
}
</script>

<style lang="scss">
$otg-color: #616161;
$odp-color: #2d9cdb;
$pdp-color: #f2c94c;
$positive-color: #eb5757;
$active-color: #eb5757;
$recovery-color: #27ae60;
$dead-color: #333333;

.container-network-detail {
  padding: 5px 20px;

  .header {
    .title {
      line-height: 36px;
    }

    .status {
      border: 1px solid;
      border-radius: 8px;
      padding: 8px 32px;
      font-size: 12px;
      text-align: center;
    }

    .otg {
      background-color: #ffffff;
      border-color: $otg-color;
      color: $otg-color;
    }

    .odp {
      background-color: #ffffff;
      border-color: $odp-color;
      color: $odp-color;
    }

    .pdp {
      background-color: #ffffff;
      border-color: $pdp-color;
      color: $pdp-color;
    }

    .positive {
      background-color: #ffffff;
      border-color: $positive-color;
      color: $positive-color;
    }
  }

  .content {
    .card {
      padding: 20px;

      .c-label {
        font-size: 12px;
      }

      .text {
        font-weight: bold;
      }

      .limit {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .active {
        color: $active-color;
      }

      .recovery {
        color: $recovery-color;
      }

      .dead {
        color: $dead-color;
      }
    }
  }
}
</style>
