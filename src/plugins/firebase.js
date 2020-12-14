import { messaging } from '@/utils/firebaseConfig'
import store from '@/store'

import {
  getToken
} from '@/utils/cookies'

if (getToken()) {
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.')
    messaging.getToken().then((token) => {
      // console.log('New token created: ', token)
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err)
  })

  messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(newToken) {
      // console.log('Token refreshed: ', newToken)
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err)
    })
  })

  messaging.onMessage(async(payload) => {
    const { title, body } = payload.notification
    await store.dispatch('toast/notificationToast', { title, body })
  })
}
