import { IAppState, IAppStore } from '@/store';
import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';
import { ReactNode } from 'react';
export * from './schemas/schemas';
export * from './schemas/schemas';

export interface IDocument {
  id: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt: Date;
  updatedBy?: string;
}

export interface IAuth extends IDocument {
  id: string;
  email: string;
  role: string;
  policy: IPolicy;
  user: IUser;
  accessToken?: string;
}

export interface IUser extends IDocument {
  fullName: string;
}
export interface IPolicy extends IDocument {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface IPayload {
  authId: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  policy: Partial<IPolicy>;
}

export type DialogContentType = ReactNode | string | null;
export type DalogSize = 'sm' | 'md' | 'lg' | 'xl';
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