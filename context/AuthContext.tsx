'use client';

import { ApiCaller } from '@/api';
import { IAuthContextType, IUser } from '@/types';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState
} from 'react';

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined,
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const router = useRouter();

  useLayoutEffect(() => {
    ApiCaller.get<IUser>("/auth/me").then((authUser) => {
      alert(JSON.stringify(authUser));
      if (!authUser) {
        router.push('/auth/signin');
        return;
      }
      setUser(authUser);
      setIsLogged(true);
    }).catch((error) => {
      console.error('Failed to fetch user:', error);
      router.push('/auth/signin');
    }).finally(() => {
      setIsBusy(false);
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