import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import toast from './modules/toast'
import region from './modules/region'
import reports from './modules/reports'
import occupation from './modules/occupation'
import rdt from './modules/rdt'
import animationLottie from './modules/animationLottie'
import statistic from './modules/statistic'
import logistic from './modules/logistic'
import closeContactCase from './modules/closeContactCase'
import primaryDrawer from './modules/primaryDrawer'
import localTransmissionArea from './modules/localTransmissionArea'
import historyTravel from './modules/historyTravel'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /index.js$/)

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   console.log(value.default)
//   modules[moduleName] = value.default
//   return value.default
// }, {})

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
    primaryDrawer,
    historyTravel,
    localTransmissionArea
  }
})

export default store
