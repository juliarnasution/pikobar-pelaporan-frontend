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
      idCTransmissionArea
    } = data
    try {
      const response = await requestServer(`/api/local-transmission/${idCTransmissionArea}`, 'GET')
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
      idCloseContact,
      body
    } = data
    try {
      const response = await requestServer(`/api/local-transmission/${idCloseContact}`, 'PUT', body)
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
  resetStateCloseContactCase({
    commit
  }) {
    commit('resetState')
  }
}
