'use client';

import { firebaseConfig } from '@/config';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
export const createFirebaseApp = () => {
  // Ensure all required environment variables are set
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.databaseURL ||
    !firebaseConfig.projectId ||
    !firebaseConfig.storageBucket ||
    !firebaseConfig.messagingSenderId ||
    !firebaseConfig.appId
  ) {
    throw new Error('Missing Firebase configuration in environment variables');
  }

  // let app;
  // if (getApps().length === 0) {
  //   app = initializeApp(firebaseConfig);
  // } else {
  //   app = getApps()[0];
  // }

  const app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    if ('measurementId' in firebaseConfig) {
      getAnalytics(app);
    }
  }
  return app;
};