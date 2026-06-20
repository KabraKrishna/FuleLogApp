importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAc_OjXWuMB6zDuKXi5xGNI_a30o2J5aoY",
  authDomain: "fuel-tracker-pro-2d87d.firebaseapp.com",
  projectId: "fuel-tracker-pro-2d87d",
  storageBucket: "fuel-tracker-pro-2d87d.firebasestorage.app",
  messagingSenderId: "1083986513796",
  appId: "1:1083986513796:web:c8cbd5e0047e49093c97d1",
  measurementId: "G-DFPYH0YLM9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  self.registration.showNotification(notification.title || 'Fuel Tracker alert', {
    body: notification.body || 'You have a vehicle reminder.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {}
  });
});
