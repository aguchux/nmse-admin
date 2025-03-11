'use client';

import { ApiCaller } from '@/api';
import { createFirebaseApp } from '@/libs/firebase/client';
import { IAuthContextType, IUser } from '@/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  const [user, setUser] = useState<unknown>(null);
  const [isBusy, setIsBusy] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          // pull user information from api/me
          setIsBusy(true);
          ApiCaller.get<IUser>(`/users/me`).then((authUser) => {
            if (!authUser) {
              // logout firebase user
              auth.signOut();
              // redirect to login
              router.push('/auth/signin');
              return;
            }
            setUser({
              ...authUser,
              uid,
              email,
              fullName: displayName,
              avatar: photoURL
            });
            setIsLogged(true);
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsBusy(false);
      }
    });
    return () => unsubscriber();
  }, [setUser, setIsBusy, setIsLogged, router]);

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
