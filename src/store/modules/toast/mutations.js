export default {
  NOTIFICATION_TOAST: (state, message) => {
    state.notification = true
    state.message = message
  },
  INFO_TOAST: (state, message) => {
    state.show = true
    state.color = 'info'
    state.message = message
  },
  SUCCESS_TOAST: (state, message) => {
    state.show = true
    state.color = 'success'
    state.message = message
  },
  WARNING_TOAST: (state, message) => {
    state.show = true
    state.color = 'warning'
    state.message = message
  },
  ERROR_TOAST: (state, message) => {
    state.show = true
    state.color = 'error'
    state.message = message
  },
  INACTIVE_TOAST: (state) => {
    state.show = false
    state.notification = false
  }
}
