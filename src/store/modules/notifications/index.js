import getters from './getters'
import requestServer from '@/api'

const getDefaultState = () => {
  return {
    notificationTotalUnread: 0,
    notificationList: []
  }
}
const state = getDefaultState()

const actions = {
  async setNotificationToken({ commit }, { user_id, data }) {
    try {
      const response = await requestServer(`/api/users/${user_id}/devices`, 'POST', data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getListNotifications({ commit }, params) {
    try {
      const response = await requestServer(`/api/notifications`, 'GET', params)
      commit('NOTIFICATION_TOTAL_UNREAD', response.data._meta.itemCount)
      return response
    } catch (error) {
      return error.response
    }
  },
  async onReadNotification({ commit }, id) {
    try {
      const response = await requestServer(`/api/notifications/read?id=${id}`, 'PUT')
      return response
    } catch (error) {
      return error.response
    }
  },
  notificationCountUnread({ commit }, data) {
    commit('NOTIFICATION_COUNT_UNREAD', data)
  },
  notificationList({ commit }, data) {
    commit('NOTIFICATION_LIST', data)
  }
}
const mutations = {
  NOTIFICATION_TOTAL_UNREAD: (state, data) => {
    state.notificationTotalUnread = data
  },
  NOTIFICATION_COUNT_UNREAD: (state, data) => {
    state.notificationTotalUnread += data
  },
  NOTIFICATION_LIST: (state, data) => {
    state.notificationList = data
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
