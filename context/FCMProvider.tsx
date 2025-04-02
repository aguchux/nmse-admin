'use client';

import { firebaseConfig } from '@/config';
import {
  onMessageListener,
  requestNotificationPermission,
} from '@/libs/firebase/messaging';
import { useEffect } from 'react';

const FCMProvider = (): null => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          // Send Firebase Config to Service Worker
          if (registration.active) {
            registration.active.postMessage({
              type: 'INIT_FIREBASE',
              config: firebaseConfig,
            });
          }
        })
        .catch((err) =>
          console.error('Service Worker registration failed:', err),
        );
    }
    requestNotificationPermission().then((token) => {
      if (token) {
        console.log('FCM Token saved:', token);
        // Send the token to your backend for notifications
      }
    });
    onMessageListener().then((payload) => {
      const { notification } = payload as { notification?: { title?: string } };
      console.log('Foreground notification received:', payload);
      alert(`New Notification: ${notification?.title}`);
    });
  }, []);
  return null;
};

export default FCMProvider;
