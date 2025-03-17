'use client';

import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

export const createFirebaseApp = () => {
  const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Ensure all required environment variables are set
  if (
    !clientCredentials.apiKey ||
    !clientCredentials.authDomain ||
    !clientCredentials.databaseURL ||
    !clientCredentials.projectId ||
    !clientCredentials.storageBucket ||
    !clientCredentials.messagingSenderId ||
    !clientCredentials.appId
  ) {
    throw new Error('Missing Firebase configuration in environment variables');
  }

  // let app;
  // if (getApps().length === 0) {
  //   app = initializeApp(clientCredentials);
  // } else {
  //   app = getApps()[0];
  // }

  const app = initializeApp(clientCredentials);
  if (typeof window !== 'undefined') {
    if ('measurementId' in clientCredentials) {
      getAnalytics(app);
    }
  }
  return app;
};