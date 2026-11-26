importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);

// CONFIGURACIÓN DE FIREBASE
firebase.initializeApp({
  apiKey: "AIzaSyAbLF8HxEFCGkn00Mzn_Q3JOPOc2lSkk7Y",
  authDomain: "nexora-c7a6f.firebaseapp.com",
  projectId: "nexora-c7a6f",
  storageBucket: "nexora-c7a6f.firebasestorage.app",
  messagingSenderId: "322230049221",
  appId: "1:322230049221:web:c54317e2aafd0a620053ac"
});

// FIREBASE CLOUD MESSAGING
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = payload.notification?.title || "NEXORA";

  const opciones = {
    body: payload.notification?.body || "Tienes una nueva notificación",
    icon: "./icon-192.png"
  };

  return self.registration.showNotification(titulo, opciones);
});

// SISTEMA DE CACHÉ DE NEXORA
const CACHE_NAME = "nexora-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, copy);
          });
        }

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

