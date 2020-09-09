import firebase from 'firebase/app'
import 'firebase/messaging'
import {
  getToken
} from '@/utils/cookies'

var config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_APP_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
} // 4をコピペ
firebase.initializeApp(config)

const messaging = firebase.messaging()
messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_PUBLIC_VAPID_KEY)

export function getFCMNotifToken() {
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.')
    messaging.getToken().then((token) => {
      // console.log('New token created: ', token)
      //   this.saveNotificationToken(token)
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err)
  })
}

export function refreshFCMNotifToken() {
  messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(newToken) {
      // console.log('Token refreshed: ', newToken)
      //   this.saveNotificationToken(newToken)
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err)
    })
  })
}

if (getToken()) {
  getFCMNotifToken()
  refreshFCMNotifToken()
}
