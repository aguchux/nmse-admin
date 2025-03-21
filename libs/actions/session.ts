"use client"

// Code: Firebase session storage
import { getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
import { encrypt, Payload } from '../jwt';

const timeInHrs: number = 24; // 24 hours

export const storeSession = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    const payLoad = {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName,
      idToken: token
    };
    const customToken = await encrypt(payLoad as Payload);
    Cookies.set('__session', customToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * timeInHrs),
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? '.nmseprep.com' : 'localhost',
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'Lax',
    });
  }
};

export const storeToken = async (accessToken: string) => {
  Cookies.set('__session', accessToken, {
    expires: timeInHrs,
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.nmseprep.com' : undefined,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
};


export const clearSession = async () => {
  const auth = getAuth();
  await auth.signOut();
  Cookies.remove('__session');
};

export const getSession = async (): Promise<string | undefined> => {
  return Cookies.get('__session');
};
