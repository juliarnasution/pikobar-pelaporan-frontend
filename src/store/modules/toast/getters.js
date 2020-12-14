export default {
  show: (state, getters) => {
    return state.show
  },
  notification: (state, getters) => {
    return state.notification
  },
  color: (state, getters) => {
    return state.color
  },
  message: (state, getters) => {
    return state.message
  },
  totalNoReadNotif: (state, getters) => {
    return state.totalNoReadNotif
  }
}
