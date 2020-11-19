<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <div>
        <v-container fluid>
          <v-row align="start" class="mb-2">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.travel_history_label_1') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-radio-group
                  v-model="formPasien.travelling_history_before_sick_14_days"
                  row
                  @change="handleTravellingHistory"
                >
                  <v-radio :label="$t('label.yes')" :value="true" />
                  <v-radio :label="$t('label.no')" :value="false" />
                </v-radio-group>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div
        v-for="(data, indexTraveling) in formPasien.travelling_history"
        :key="`traveling-${indexTraveling}`"
        :class="`traveling-form-${indexTraveling + 1}`"
      >
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.travel_history')} ${indexTraveling+1}` }}
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormCloseContact(indexTraveling)">
                  <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
                </v-btn>
              </v-col>
            </v-row>
            <hr class="table-divider">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label :class="formPasien.travelling_history_before_sick_14_days ? 'required' : ''">{{ $t('label.trip_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" :rules="formPasien.travelling_history_before_sick_14_days ? 'required' : ''">
                    <v-radio-group
                      v-model="data.travelling_type"
                      :error-messages="errors"
                      row
                    >
                      <v-radio :label="$t('label.from_abroad')" value="Dari Luar Negeri" />
                      <v-radio :label="$t('label.from_outside_city')" value="Dari Luar Kota" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <form-travelling-visited
                :form-pasien="data"
                :is-travelling-sick="formPasien.travelling_history_before_sick_14_days"
              />
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.start_travel') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.travelling_date"
                      :value-date.sync="data.travelling_date"
                      :label="$t('label.choose_date')"
                      @changeDate="data.travelling_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.end_travel') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.travelling_arrive"
                      :value-date.sync="data.travelling_arrive"
                      :label="$t('label.choose_date')"
                      @changeDate="data.travelling_arrive = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container
        v-if="formPasien.travelling_history_before_sick_14_days"
        fluid
      >
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormTravelingHistory">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_travel_history') }}</p>
        </v-card>
      </v-container>
      <div>
        <v-container fluid>
          <v-row align="start" class="mb-2">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.travel_history_label_2') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-radio-group v-model="formPasien.visited_local_area_before_sick_14_days" row>
                  <v-radio :label="$t('label.yes')" :value="true" />
                  <v-radio :label="$t('label.no')" :value="false" />
                </v-radio-group>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-for="(data, indexArea) in formPasien.visited_local_area" :key="`area-${indexArea}`" :class="`area-form-${indexArea + 1}`">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${ $t('label.transmission_area') } ${indexArea+1}` }}
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormAreaTransmisi(indexArea)">
                  <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
                </v-btn>
              </v-col>
            </v-row>
            <hr class="table-divider">
            <v-container fluid>
              <form-transmission-area :form-pasien="data" />
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container
        v-if="formPasien.visited_local_area_before_sick_14_days"
        fluid
      >
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormAreaTransmisi">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_transmission_area') }}</p>
        </v-card>
      </v-container>
      <div>
        <v-container fluid>
          <v-row align="start" class="mb-2">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label class="required">{{ $t('label.travel_history_label_3') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-radio-group
                  v-model="formPasien.has_visited_public_place"
                  :error-messages="errors"
                  row
                >
                  <v-radio :label="$t('label.yes')" :value="true" />
                  <v-radio :label="$t('label.no')" :value="false" />
                </v-radio-group>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-for="(data, indexVisited) in formPasien.visited_public_place" :key="`visited-${indexVisited}`" :class="`visited-form-${indexVisited + 1}`">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.travel_history_2')} ${indexVisited+1}` }}
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormTravelHistory(indexVisited)">
                  <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
                </v-btn>
              </v-col>
            </v-row>
            <hr class="table-divider">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label :class="formPasien.has_visited_public_place ? 'required' : ''">{{ $t('label.place_category') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="formPasien.has_visited_public_place ? 'required' : ''"
                  >
                    <v-select
                      v-model="data.public_place_category"
                      :items="listPlaceCategory"
                      :error-messages="errors"
                      solo
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label :class="formPasien.has_visited_public_place ? 'required' : ''">{{ $t('label.name_place_visited') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider
                    v-slot="{ errors }"
                    :rules="formPasien.has_visited_public_place ? 'required' : ''"
                  >
                    <v-text-field
                      v-model="data.public_place_name"
                      :label="$t('label.enter_place')"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.address_place_visited') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="data.public_place_address"
                      :label="$t('label.enter_place')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.date_time_visit') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.public_place_date_visited"
                      :value-date.sync="data.public_place_date_visited"
                      :label="$t('label.choose_date')"
                      @changeDate="data.public_place_date_visited = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.length_visit_duration') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider v-slot="{ errors }" rules="noAlphabet">
                    <v-text-field
                      v-model.number="data.public_place_duration_visited"
                      :error-messages="errors"
                      class="input-append-btn"
                      solo-inverted
                    >
                      <template v-slot:append>
                        <v-btn depressed tile min-width="20">
                          {{ $t('label.minutes') }}
                        </v-btn>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container
        v-if="formPasien.has_visited_public_place"
        fluid
      >
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormTravelHistory">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_travel_history_2') }}</p>
        </v-card>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { specimenType, listPlaceCategory } from '@/utils/constantVariable'
import { scrollUp } from '@/utils/utilsFunction'
export default {
  name: 'FormMultipleTravelHistoryFactor',
  components: {
    ValidationProvider
  },
  props: {
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isAddCloseContactForm: false,
      specimenType: specimenType,
      listPlaceCategory: listPlaceCategory,
      totalCloseContact: 0,
      isValid: false,
      showAlert: false,
      formatDate: 'YYYY/MM/DD',
      prov: '',
      city: ''
    }
  },
  mounted() {
    // this.handleAddFormTravelingHistory()
  },
  methods: {
    handleAddFormTravelingHistory() {
      this.isValid = true
      this.showAlert = false
      this.formPasien.travelling_history.push({
        travelling_type: '',
        travelling_visited: '',
        travelling_city: '',
        travelling_date: '',
        travelling_arrive: ''
      })
      if (this.formPasien.travelling_history.length > 0) {
        const index = this.formPasien.travelling_history.length
        setTimeout(function() {
          const key = `.traveling-form-${index}`
          scrollUp(key)
        }, 500)
      }
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.travelling_history.splice(index, 1)
      this.isValid = this.formPasien.travelling_history.length !== 0
    },
    handleAddFormAreaTransmisi() {
      this.isValid = true
      this.showAlert = false
      this.formPasien.visited_local_area.push({
        visited_local_area_province: '',
        visited_local_area_city: ''
      })
      if (this.formPasien.visited_local_area.length > 0) {
        const index = this.formPasien.visited_local_area.length
        setTimeout(function() {
          const key = `.area-form-${index}`
          scrollUp(key)
        }, 500)
      }
    },
    handleDeleteFormAreaTransmisi(index) {
      this.formPasien.visited_local_area.splice(index, 1)
      this.isValid = this.formPasien.visited_local_area.length !== 0
    },
    handleAddFormTravelHistory() {
      this.isValid = true
      this.showAlert = false
      this.formPasien.visited_public_place.push({
        public_place_category: '',
        public_place_name: '',
        public_place_address: '',
        public_place_date_visited: '',
        public_place_duration_visited: ''
      })
      if (this.formPasien.visited_public_place.length > 0) {
        const index = this.formPasien.visited_public_place.length
        setTimeout(function() {
          const key = `.visited-form-${index}`
          scrollUp(key)
        }, 500)
      }
    },
    handleDeleteFormTravelHistory(index) {
      this.formPasien.visited_public_place.splice(index, 1)
      this.isValid = this.formPasien.visited_public_place.length !== 0
    },
    handleTravellingHistory(value) {
      if ((value) && (this.formPasien.travelling_history.length < 1)) {
        this.handleAddFormTravelingHistory()
      }
    }
  }
}
</script>
