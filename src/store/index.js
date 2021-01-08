import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/User'
import Permission from './modules/Permission'
import Toast from './modules/Toast'
import Region from './modules/Region'
import Reports from './modules/Reports'
import Occupation from './modules/Occupation'
import Rdt from './modules/Rdt'
import AnimationLottie from './modules/AnimationLottie'
import Statistic from './modules/Statistic'
import Logistic from './modules/Logistic'
import CloseContactCase from './modules/CloseContactCase'
import PrimaryDrawer from './modules/PrimaryDrawer'
import LocalTransmissionArea from './modules/LocalTransmissionArea'
import HistoryTravel from './modules/HistoryTravel'
import InspectionSupport from './modules/InspectionSupport'
import PublicPlace from './modules/PublicPlace'
import HospitalReferral from './modules/HospitalReferral'
import ExportReports from './modules/ExportReports'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    User,
    Permission,
    Toast,
    Region,
    Reports,
    Occupation,
    Rdt,
    AnimationLottie,
    Statistic,
    Logistic,
    CloseContactCase,
    PrimaryDrawer,
    LocalTransmissionArea,
    HistoryTravel,
    InspectionSupport,
    PublicPlace,
    HospitalReferral,
    ExportReports
  }
})

export default store
