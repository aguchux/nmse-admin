// Code: Firebase session storage
import { getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';

export const storeSession = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    Cookies.set('__session', token, { secure: true, sameSite: 'Strict' });
  }
};

export const clearSession = async () => {
  Cookies.remove('__session');
};

export const getSession = () => {
  return Cookies.get('__session');
};
