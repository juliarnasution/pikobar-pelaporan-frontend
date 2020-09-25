<template>
  <div>
    <v-card class="d-block pa-1 mx-auto header-survey-list">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="12" md="8" sm="8">
            <v-card-text class="font-weight-bold">
              <v-card-title class="text-header-close-contact">
                {{ detail ? detail.id_case.toUpperCase() +' • '+ detail.name+' • '+detail.nik:'' }}
              </v-card-title>
              <v-card-subtitle class="text-sub-header-close-contact">
                {{ $t('label.complete_history_and_patient_information_below') }}
              </v-card-subtitle>
            </v-card-text>
          </v-col>
          <v-col>
            <div class="background-card">
              <v-btn
                class="float-right mt-8"
                style="height: 40px;min-width: 80px;"
              >
                <div style="color: #6FCF97;">
                  <v-icon>mdi-plus</v-icon>
                  {{ $t('label.case_report_verification') }}
                </div>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Identitas Pasien</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Data petugas medis, identitas pasien & kriteria pasien</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#6FCF97"
              >
                Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Informasi Klinis</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Data riwayat kasus dan info klinis pasien</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#6FCF97"
              >
                Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleTransmissionArea"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Informasi Penunjang</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Data informasi penunjang dan hasil test pasien</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#FFD026"
              >
                Belum Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleHistoryTravel"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Riwayat Perjalanan</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Riwayat perjalanan pasien ke luar negeri / luar kota</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                Tidak Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Sosial Ekonomi</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Data informasi kondisi sosial dan ekonomi pasien</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                Tidak Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
            @click="handleInspectionSupport"
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Faktor Paparan</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Data informasi faktor paparan eksternal pasien</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                Tidak Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="3"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="h6 font-weight-bold mb-1 d-flex justify-center">Kontak Terkait</v-list-item-title>
                <v-list-item-subtitle class="text-wrap text-center">Data informasi kontak yang berkaitan dengan pasien</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-row class="justify-center pb-6">
              <v-chip
                class="ma-2"
                color="#E53935"
              >
                Tidak Lengkap
              </v-chip>
            </v-row>
          </v-card>
        </v-col>
        <v-col />
      </v-row>
    </v-container>
    <dialog-close-contact
      :show-dialog="dialogCloseContact"
      :show.sync="dialogCloseContact"
      :list-close-contact.sync="listCloseContact"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :id-unique-case="detail ? detail.id_case:''"
      :unique-case-id.sync="idUniqueCase"
      :title-detail="$t('label.close_contact_list')"
    />
    <dialog-transmission-area-local
      :show-dialog="dialogTransmissionArea"
      :show.sync="dialogTransmissionArea"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :title-detail="$t('label.local_transmission_area_history_list')"
    />
    <dialog-history-travel
      :show-dialog="dialogHistoryTravel"
      :show.sync="dialogHistoryTravel"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :title-detail="$t('label.list_history_from_abroad_outside_the_city')"
    />
    <dialog-public-place
      :show-dialog="dialogPublicPlace"
      :show.sync="dialogPublicPlace"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :title-detail="$t('label.list_public_place_history')"
    />
    <dialog-inspection-support
      :show-dialog="dialogInspectionSupport"
      :show.sync="dialogInspectionSupport"
      :id-case="this.$route.params.id"
      :case-id.sync="idCase"
      :title-detail="$t('label.list_inspection_support')"
    />
  </div>
</template>

<script>
export default {
  name: 'DetailReportCase',
  data() {
    return {
      detail: null,
      idCase: '',
      idUniqueCase: '',
      listCloseContact: [],
      dialogCloseContact: false,
      dialogTransmissionArea: false,
      dialogHistoryTravel: false,
      dialogInspectionSupport: false,
      dialogPublicPlace: false
    }
  },
  async mounted() {
    await this.detailCase()
  },
  methods: {
    async detailCase() {
      const response = await this.$store.dispatch('reports/detailReportCase', this.$route.params.id)
      this.detail = response.data
    },
    async handleHistoryTravel() {
      this.idCase = this.$route.params.id
      this.dialogHistoryTravel = true
    },
    async handleTransmissionArea() {
      this.idCase = this.$route.params.id
      this.dialogTransmissionArea = true
    },
    async handleInspectionSupport() {
      this.idCase = this.$route.params.id
      this.dialogInspectionSupport = true
    },
    async handlePublicPlace() {
      this.idCase = this.$route.params.id
      this.dialogPublicPlace = true
    }
  }
}
</script>
<style scoped>
  .text-header-close-contact {
    color: #FFFF !important;
    font-size: 1.4rem;
  }
  .text-sub-header-close-contact {
    color: #FFFF !important;
    font-size: 1rem;
  }
  .background-card {
      background-image: url('../../static/survey-list-icon.svg');
      min-height: 100%;
      float: right;
  }
</style>
