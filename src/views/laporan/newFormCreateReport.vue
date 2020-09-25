<template>
  <div>
    <ValidationObserver ref="observer">
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="volunteerPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_volunteer_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-volunteer :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="criteriaPatientPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.patient_criteria') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-criteria-patient :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="patientPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_patient_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-patient :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </ValidationObserver>
    <v-container fluid>
      <v-row class="survey-bottom-form">
        <v-col class="text-right">
          <v-btn color="success" :loading="loading" bottom class="ml-2" @click="onSave">
            {{ isFixCase ? $t('label.fix_case'):$t('label.save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  components: {
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      isFixCase: false,
      volunteerPanel: [0],
      criteriaPatientPanel: [0],
      patientPanel: [0]
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formPasien'
    ]),
    ...mapGetters('user', [
      'district_user'
    ])
  },
  methods: {
    onSave() {
      this.$router.push('/laporan/detail-report')
    }
  }
}
</script>
