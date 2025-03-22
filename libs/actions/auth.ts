'use client';

import { clearSession } from "@/libs/actions/session";
import { useMutation } from '@tanstack/react-query';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { createFirebaseApp } from '../firebase/client';

const app = createFirebaseApp();
const auth: Auth = getAuth(app);

// Login Mutation Hook
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<UserCredential> => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        return userCredential as UserCredential;
      } catch (error) {
        throw new Error('Invalid email or password');
      }
    },
  });
};

// Signup Mutation Hook
export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      email: string;
      password: string;
    }): Promise<UserCredential> => {
      try {
        const { fullName, email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: fullName });
        return userCredential as UserCredential;
      } catch (error) {
        throw new Error('Signup failed. Please try again');
      }
    },
  });
};


// Logout Mutation Hook	
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await auth.signOut();
        await clearSession();
        
      } catch (error) {
        throw new Error('Logout failed');
      }
    },
  });
};