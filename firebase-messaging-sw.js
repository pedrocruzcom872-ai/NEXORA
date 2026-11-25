importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "TU_API_KEY",
  authDomain: "nexora-c7a6f.firebaseapp.com",
  projectId: "nexora-c7a6f",
  storageBucket: "nexora-c7a6f.firebasestorage.app",
  messagingSenderId: "322230049221",
  appId: "1:322230049221:web:c54317e2aafd0a620053ac"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = payload.notification?.title || "NEXORA";

  const opciones = {
    body: payload.notification?.body || "Tienes una nueva notificación",
    icon: "./icon-192.png"
  };

  self.registration.showNotification(titulo, opciones);
});
