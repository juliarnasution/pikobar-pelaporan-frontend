import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  show: false,
  notification: false,
  color: '',
  message: '',
  totalNoReadNotif: 0
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
