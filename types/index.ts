import { IAppState, IAppStore } from '@/store';
import { SetStateAction } from 'jotai';
import { Dispatch, ReactNode } from 'react';
export * from './schemas/schemas';

export interface IDocument {
  id: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
}

export interface IUser extends IDocument {
  uid?: string;
  fullName: string;
  email: string;
  mobile?: string;
  avatar?: string;
  policy: IPolicy;
  role: string;
}

export interface IPolicy extends IDocument {
  user: IUser;
  userId: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export type IAuthContextType = {
  user: IUser | null;
  isLogged: boolean;
  isBusy: boolean;
};

export type DialogContentType = ReactNode | string | null;
export type DalogSize = 'md' | 'lg' | 'xl';
export interface IAppContextType {
  theme: string;
  state: IAppState;
  setState: Dispatch<SetStateAction<IAppState>>;
  storage: IAppStore;
  setStorage: Dispatch<SetStateAction<IAppStore>>;
  loading: boolean;
  ping?: boolean;
}

export interface IOTPVerified {
  id: string;
  email: string;
  mobile?: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  verified: boolean;
}

export interface IUserExists {
  id: string;
  userId: string;
  email: string;
  mobile: string;
  firstName: string;
  lastName: string;
  role: string;
}
