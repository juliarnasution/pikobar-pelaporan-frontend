import actions from './actions'
import getters from './getters'
const getDefaultState = () => {
  return {
    formLocalHistoryTravel: {
      travelling_type: '',
      travelling_visited: '',
      travelling_city: '',
      travelling_date: '',
      travelling_arrive: ''
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
