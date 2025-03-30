// Use Firebase Cloud Messaging to send notifications
// to the client

import { createFirebaseApp } from '@/libs/firebase/client';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';



const useNotifications = () => {

    useEffect(() => {
        const initMessaging = async () => {
            if (await isSupported()) {
                const messaging = getMessaging(createFirebaseApp());

                onMessage(messaging, (payload) => {
                    console.log('Message received. ', payload);
                    // Show notification
                });

                return messaging;
            } else {
                throw new Error('Firebase messaging is not supported in this environment');
            }
        };

        initMessaging();
    }, []);

    return null;
}