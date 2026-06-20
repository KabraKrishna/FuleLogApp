const CACHE_NAME = 'fuel-tracker-v2.9.4';
const CORE_ASSETS = [
  './',
  './index.html',
  './firebase-messaging-sw.js',
  './backup.json',
  './car-profile.png',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
const OPTIONAL_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging.js'
];

try {
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
} catch (error) {
  console.warn('Firebase Messaging service worker setup skipped.', error);
}

// Install: Cache core assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).then(() => {
        return Promise.allSettled(OPTIONAL_ASSETS.map((asset) => cache.add(asset)));
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Keep HTML fresh; cache successful asset/module requests for later offline use.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html').then((cached) => cached || caches.match('./')))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) return response;
      return fetch(e.request).then((networkResponse) => {
        if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return networkResponse;
      });
    })
  );
});
