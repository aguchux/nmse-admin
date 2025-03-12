// Code: Firebase session storage
import { getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';
// import { encrypt, Payload } from '../jwt';

export const storeSession = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    // const payLoad = {
    //   uid: user.uid,
    //   email: user.email,
    //   fullName: user.displayName,
    //   idToken: token
    // };
    // const customToken = await encrypt(payLoad as Payload);
    Cookies.set('__session', token, { secure: true, sameSite: 'Strict' });
  }
};

export const clearSession = async () => {
  const auth = getAuth();
  await auth.signOut();
  Cookies.remove('__session');
};

export const getSession = async () => {
  return Cookies.get('__session');
};
