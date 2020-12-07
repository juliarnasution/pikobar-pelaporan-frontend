<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.physical_activity') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-radio-group v-model="formPasien.pysichal_activity" row>
            <v-row v-for="itemPhysicalActivity in listPhysicalActivity" :key="itemPhysicalActivity.value">
              <v-col cols="12" md="12" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <v-radio :label="itemPhysicalActivity.text" :value="itemPhysicalActivity.value" />
              </v-col>
            </v-row>
          </v-radio-group>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.smoking') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.smoking" row>
                <span v-for="(item, index) in answerList" :key="index">
                  <v-radio :label="item.text" :value="item.value" />
                </span>
              </v-radio-group>
            </v-row>
          </v-container>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.consume_alcohol') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.consume_alcohol" row>
                <span v-for="(item, index) in answerList" :key="index">
                  <v-radio :label="item.text" :value="item.value" />
                </span>
              </v-radio-group>
            </v-row>
          </v-container>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.income') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.income" row>
                <span v-for="(item, index) in incomeList" :key="index">
                  <v-radio :label="item.text" :value="item.value" />
                </span>
              </v-radio-group>
            </v-row>
          </v-container>
        </ValidationProvider>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { answerList, incomeList, listPhysicalActivity } from '@/utils/constantOption'
export default {
  name: 'FormSocioeconomicHistory',
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
      formatDate: 'YYYY/MM/DD',
      answerList: answerList,
      listPhysicalActivity: listPhysicalActivity,
      incomeList: incomeList
    }
  }
}
</script>
