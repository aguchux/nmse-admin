'use client';

import { ApiCaller } from '@/api';
import { createFirebaseApp } from '@/libs/firebase/client';
import { IAuthContextType, IUser } from '@/types';
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const app = createFirebaseApp();
    const auth = getAuth(app);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        const unsubscriber = onAuthStateChanged(auth, async (firebaseUser) => {
          setIsBusy(true);
          if (firebaseUser) {
            firebaseUser.reload().then(async () => {
              try {
                const { uid, email, displayName, photoURL } = firebaseUser;

                alert(JSON.stringify({ uid, email, displayName, photoURL }));
                
                const authUser = await ApiCaller.get<IUser>(`/users/me`);

                if (!authUser) {
                  await signOut(auth); // logout firebase user
                  router.push('/auth/signin'); // redirect to login
                  return;
                }
                alert(JSON.stringify(authUser));

                setUser({
                  ...authUser,
                  uid: uid as string,
                  email: email || authUser.email,
                  fullName: displayName || authUser.fullName,
                  avatar: photoURL || authUser.avatar,
                });

                setIsLogged(true);
              } catch (error) {
                console.error('Failed to fetch user:', error);
              }
            });
          } else {
            setUser(null);
            setIsLogged(false);
          }
          setIsBusy(false);
        });

        return () => unsubscriber();
      })
      .catch((error) => {
        console.error('Failed to set persistence:', error);
      });
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isBusy,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
};
