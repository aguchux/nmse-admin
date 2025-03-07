import { atom, createStore, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const jotaiStore = createStore();

export interface IAppState {
  loading: boolean;
  ping?: number;
}

const initialState: IAppState = {
  loading: false,
  ping: 0,
};

export interface IAppStore {
  theme?: string;
  accessToken: string | null;
  lastSeen: Date | string;
  otpTimer: number;
}

const initialStore: IAppStore = {
  theme: 'light',
  accessToken: null,
  lastSeen: new Date().toISOString(),
  otpTimer: 0,
};

const appStateAtom = atom(initialState);
const appStoreAtom = atomWithStorage('storage', initialStore);

export const useAppState = () => {
  return useAtom(appStateAtom, {
    store: jotaiStore,
  });
};

export const useAppStore = () => {
  return useAtom(appStoreAtom, {
    store: jotaiStore,
  });
};
