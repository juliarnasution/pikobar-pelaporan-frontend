<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.travel_history_label_1') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.travelling_history_before_sick_14_days ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="travelHistoryPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.travel_history') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <div v-if="detail.last_history.travelling_history.length > 0">
                <div v-for="(data, index) in detail.last_history.travelling_history" :key="index">
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.trip_type') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.travelling_type === 'Dari Luar Negeri' ? $t('label.from_abroad'):$t('label.from_outside_city') }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ data.travelling_type === "Dari Luar Kota" ? $t('label.province'):$t('label.country') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.travelling_visited }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.city') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.travelling_city }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.start_travel') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ handlerDate(data.travelling_date) }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.end_travel') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ handlerDate(data.travelling_arrive) }}</p>
                    </v-col>
                  </v-row>
                  <v-divider />
                </div>
              </div>
              <div v-else class="text-center">
                -
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.travel_history_label_2') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.visited_local_area_before_sick_14_days ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="transmissionAreaPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.transmission_area') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <div v-if="detail.last_history.visited_local_area.length > 0">
                <div v-for="(data, index) in detail.last_history.visited_local_area" :key="index">
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.province') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.visited_local_area_province }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.city') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.visited_local_area_city }}</p>
                    </v-col>
                  </v-row>
                  <v-divider />
                </div>
              </div>
              <div v-else class="text-center">
                -
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.travel_history_label_3') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.has_visited_public_place ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="travelhistoryTwoPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.travel_history_2') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <div v-if="detail.last_history.visited_public_place.length > 0">
                <div v-for="(data, index) in detail.last_history.visited_public_place" :key="index">
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.place_category') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.public_place_category }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.name_place_visited') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.public_place_name }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.address_place_visited') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.public_place_address }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.date_time_visit') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ handlerDate(data.public_place_date_visite) }}</p>
                    </v-col>
                  </v-row>
                  <v-row class="row-detail">
                    <v-col
                      cols="12"
                      md="3"
                      sm="12"
                    >
                      <p>{{ $t('label.length_visit_duration') }}</p>
                    </v-col>
                    <v-col>
                      <p>{{ data.public_place_duration_visited }} {{ data.public_place_duration_visited ? $t('label.minutes'):'' }}</p>
                    </v-col>
                  </v-row>
                  <v-divider />
                </div>
              </div>
              <div v-else class="text-center">
                -
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'DetailTravelHistoryFactor',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      travelHistoryPanel: [0],
      transmissionAreaPanel: [0],
      travelhistoryTwoPanel: [0]
    }
  },
  methods: {
    handlerDate(date) {
      date = this.$moment(date).format('DD MMMM YYYY')
      return date
    }
  }
}
</script>
