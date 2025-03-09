import { createFirebaseApp } from '@/libs/firebase/client';
import { IAuthContextType } from '@/types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

  useEffect(() => {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          // pull user information from api/me
          setUser(user);
          // pull user information from api/me
          setIsLogged(true);
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
  }, [setUser, setIsBusy, setIsLogged]);

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
