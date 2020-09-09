import requestServer from '@/api'

export default {
  async getListLocalTransmissionArea({
    commit
  }, idCase) {
    try {
      const response = await requestServer(`/api/local-transmission/${idCase}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async getDetailLocalTransmissionArea({
    commit
  }, data) {
    const {
      idCase
    } = data
    try {
      const response = await requestServer(`/api/local-transmission/${idCase}`, 'GET')
      return response
    } catch (error) {
      return error.response
    }
  },
  async postListLocalTransmissionArea({
    commit
  }, data) {
    const {
      idCase,
      body
    } = data
    try {
      const response = await requestServer(`/api/local-transmission/${idCase}`, 'POST', body)
      return response
    } catch (error) {
      return error.response
    }
  },
  async updateDetailLocalTransmissionArea({
    commit
  }, data) {
    const {
      idCase,
      body
    } = data
    try {
      const response = await requestServer(`/api/local-transmission/${idCase}`, 'PUT', body)
      return response
    } catch (error) {
      return error.response
    }
  },
  async deleteLocalTransmissionArea({
    commit
  }, id) {
    try {
      const response = await requestServer(`/api/local-transmission/${id}`, 'DELETE')
      return response
    } catch (error) {
      return error.response
    }
  },
  resetStateLocalTransmissionArea({
    commit
  }) {
    commit('resetState')
  }
}
