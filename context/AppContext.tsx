'use client';

import { IAppContextType } from '@/types';
import { createContext, ReactNode, useContext } from 'react';
import { useAppState, useAppStore } from '../store';

export const AppContext = createContext<IAppContextType | undefined>(undefined);

// Create a provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [storage, setStorage] = useAppStore();
  const [state, setState] = useAppState();

  return (
    <AppContext.Provider
      value={{
        theme: storage.theme as string,
        state,
        setState,
        storage,
        setStorage,
        loading: false,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
