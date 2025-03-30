// Import Firebase SDKs for service worker
importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js");

// Firebase configuration (dynamically sent from the app)
let firebaseConfig = {};

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "INIT_FIREBASE") {
      self.firebaseConfig = event.data.config;
      firebase.initializeApp(self.firebaseConfig);
      const messaging = firebase.messaging();
  
      messaging.onBackgroundMessage((payload) => {
        console.log("Background message received:", payload);
        self.registration.showNotification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/firebase-logo.png",
        });
      });
    }
  });
  