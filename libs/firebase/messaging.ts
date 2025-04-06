import { ApiCaller } from "@/api";
import { IDevice } from "@/types";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { createFirebaseApp } from "./client";

let messaging: Messaging | null = null;

if (typeof window !== "undefined") {
    messaging = getMessaging(createFirebaseApp());
}


export const sendTokenToServer = async (token: string) => {
    try {
        const device = await ApiCaller.post<IDevice>("/device", {token});
        if (!device) {
            throw new Error("Failed to store token");
        }
        console.log("FCM Token stored successfully",device);
    } catch (error) {
        console.error("Error storing FCM Token:", error);
    }
};
export const requestNotificationPermission = async (): Promise<string | null> => {
    
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted" && messaging) {
            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });

            if (token) {
                console.log("FCM Token:", token);
                await sendTokenToServer(token); // Store token in backend
                return token;
            }

            console.warn("No FCM token received");
            return null;

        } else {
            console.warn("Notification permission denied");
            return null;
        }
    } catch (error) {
        console.error("Error getting FCM token:", error);
        return null;
    }
};

export const onMessageListener = (): Promise<unknown> =>
    new Promise((resolve) => {
        if (messaging) {
            onMessage(messaging, (payload) => {
                console.log("Foreground message received:", payload);
                resolve(payload);
            });
        }
    });




    