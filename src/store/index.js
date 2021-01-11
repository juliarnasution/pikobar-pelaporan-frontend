import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/User'
import permission from './modules/Permission'
import toast from './modules/Toast'
import region from './modules/Region'
import reports from './modules/Reports'
import occupation from './modules/Occupation'
import rdt from './modules/Rdt'
import animationLottie from './modules/AnimationLottie'
import statistic from './modules/Statistic'
import logistic from './modules/Logistic'
import closeContactCase from './modules/CloseContactCase'
import primaryDrawer from './modules/PrimaryDrawer'
import localTransmissionArea from './modules/LocalTransmissionArea'
import historyTravel from './modules/HistoryTravel'
import inspectionSupport from './modules/InspectionSupport'
import publicPlace from './modules/PublicPlace'
import hospitalReferral from './modules/HospitalReferral'
import exportReports from './modules/ExportReports'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    occupation,
    reports,
    region,
    toast,
    user,
    rdt,
    animationLottie,
    statistic,
    logistic,
    closeContactCase,
    hospitalReferral,
    primaryDrawer,
    historyTravel,
    exportReports,
    localTransmissionArea,
    inspectionSupport,
    publicPlace
  }
})

export default store
