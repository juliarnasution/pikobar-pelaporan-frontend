import requestServer from '@/api'

export default {
  async getListOccuption({ commit }) {
    try {
      const response = await requestServer('/api/occupations', 'GET')
      commit('SET_LIST_OCCUPTION', response.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async listMedicalFacility({ commit }, params) {
    try {
      const response = await requestServer('/api/users-listid', 'GET', params)
      return response
    } catch (error) {
      return error.response
    }
  }
}
