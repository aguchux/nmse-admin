'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { getDeviceToken, storeDeviceToken } from '@/libs/actions/session';
import { createFirebaseApp } from '@/libs/firebase/client';
import { IDevice } from '@/types';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';

const messaging = getMessaging(createFirebaseApp());

const useFCMNotifications = () => {
  const [isNotificationAllowed, setIsNotificationAllowed] =
    useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { user } = useAuthContext(); // Get user context if needed

  // Request notification permission and get FCM token

  // Set up foreground notification handler
  useEffect(() => {
    const foregroundHandler = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      // Here you can display the notification inside your app, e.g., using a toast
      // alert(`Notification: ${payload.notification?.title} - ${payload.notification?.body}`);
    });

    // Cleanup the listener
    return () => {
      foregroundHandler();
    };
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // VAPID key from Firebase console
          });
          if (token) {
            // get token device from cookie and compare change
            const deviceToken = await getDeviceToken();
            if (deviceToken === token) return; // No need to update token if it hasn't changed
            await storeDeviceToken(token); // Store the new token in cookies
            // Send token to backend for storage
            setFcmToken(token);
            const device = await ApiCaller.post<IDevice>(`/users/devices`, {
              token: fcmToken,
              userId: user?.id,
            });
          } else {
            console.error('No FCM token received or user info not available');
          }
          setIsNotificationAllowed(true);
        } else {
          console.error('Notification permission denied');
        }
      } catch (error) {
        console.error('Error getting notification permission or token:', error);
      }
    };
    if (!user) return; // Ensure user info is available before proceeding
    // Call requestPermission to get token when the component mounts
    requestPermission();
  }, [user, fcmToken]);

  return { fcmToken, isNotificationAllowed };
};

export default useFCMNotifications;
