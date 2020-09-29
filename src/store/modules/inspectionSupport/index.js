import actions from './actions'
import getters from './getters'
const getDefaultState = () => {
  return {
    formInspectionSupport: {
      inspection_type: '',
      specimens_type: '',
      inspection_date: '',
      inspection_location: '',
      get_specimens_to: '',
      inspection_result: ''
    }
  }
}
const state = getDefaultState()

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}