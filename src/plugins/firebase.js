import { messaging } from '@/utils/firebaseConfig'
import store from '@/store'

messaging.onMessage(async(payload) => {
  const { title, body } = payload.notification
  await store.dispatch('toast/notificationToast', { title, body })
  await store.dispatch('notifications/notificationCountUnread', 1)
})

