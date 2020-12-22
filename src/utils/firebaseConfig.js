import firebase from 'firebase/app'
import store from '@/store'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)
const messaging = (function initMessaging() {
  let m
  if (firebase.messaging.isSupported()) {
    m = firebase.messaging()
    m.usePublicVapidKey(process.env.VUE_APP_FIREBASE_PUBLIC_VAPID_KEY)
  }
  return m
}())

function setTokenFirebase() {
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.')
    messaging.getToken().then(async(token) => {
      const user_id = await store.getters['user/user_id']
      const data = {
        'appId': 'web',
        'token': token
      }
      await store.dispatch('notifications/setNotificationToken', { user_id: user_id, data })
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err)
  })
}

function setRefreshFirebase() {
  messaging.onTokenRefresh(function() {
    messaging.getToken().then(async(newToken) => {
      const user_id = await store.getters['user/user_id']
      console.log(newToken)
      const data = {
        'appId': 'web',
        'token': newToken
      }
      await store.dispatch('notifications/setNotificationToken', { user_id: user_id, data })
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err)
    })
  })
}

export { messaging, setTokenFirebase, setRefreshFirebase, firebaseConfig }
