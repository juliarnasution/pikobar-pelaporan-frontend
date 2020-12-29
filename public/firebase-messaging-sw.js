// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('env-vars.js')
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js')

const firebaseConfig = ENVERYWHERE_FIREBASE_CRED

firebase.initializeApp(firebaseConfig)

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()
  messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/img/icons/android-chrome-192x192.png'
    }

    return self.registration.showNotification(notificationTitle,
      notificationOptions)
  })
}
