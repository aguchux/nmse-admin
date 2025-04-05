import { IAppState, IAppStore } from '@/store';
import { SetStateAction } from 'jotai';
import { Dispatch, ReactNode } from 'react';
export * from './schemas/schemas';

export type IAuthContextType = {
  user: IUser | null;
  isLogged: boolean;
  isBusy: boolean;
  policy: Partial<IPolicy>;
  wallet: Partial<IWallet> | null;
};

export type DialogContentType = ReactNode;
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
export interface IDocument {
  id: string;
  enabled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IDocument {
  uid?: string;
  fullName: string;
  email: string;
  mobile?: string;
  avatar?: string;
  policy: IPolicy;
  role: UserRole;
  wallet: IWallet;
  notifications: INotification[];
  subscriptions: ISubscription[];
  payments: IPayment[];
  devices: IDevice[];
}

export interface IDevice extends IDocument {
  deviceId: string;
  deviceType: string;
  deviceToken: string;
  user: IUser;
  userId: string;
}

export interface IPolicy extends IDocument {
  user: IUser;
  userId: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface ICollege extends IDocument {
  collegeCode: string;
  collegeName: string;
  specialties: ISpecialty[];
  description: string;
  examinations: IExamination[];
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
  role: UserRole;
}

export interface ILog extends IDocument {
  level: string;
  message: string;
  timestamp: Date;
  metadata?: Record<string, string>;
  user?: IUser;
  userId?: string;
  authId?: string;
}

export interface IEmailOtp extends IDocument {
  email: string;
  otp: string;
  otpExpiry: Date;
  verified: boolean;
}

export interface IMobileOtp extends IDocument {
  otp: string;
  mobile: string;
  otpExpiry: Date;
  verified: boolean;
}

export interface IPasswordResetOtp extends IDocument {
  email: string;
  otp: string;
  otpExpiry: Date;
  used: boolean;
}

export interface IPolicy extends IDocument {
  user: IUser;
  userId: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface IUser extends IDocument {
  email: string;
  mobile?: string;
  fullName: string;
  role: UserRole;
  policy: IPolicy;
  notifications: INotification[];
  subscriptions: ISubscription[];
  payments: IPayment[];
  wallet: IWallet;
  logs: ILog[];
}

export interface INotification extends IDocument {
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  userId: string;
  user: IUser;
}

export interface IExaminationCountry extends IDocument {
  examination: IExamination;
  examinationId: string;
  country: ICountry;
  countryId: string;
}

export interface ICollege extends IDocument {
  collegeCode: string;
  collegeName: string;
  description: string;
  specialties: ISpecialty[];
  examinations: IExamination[];
}

export interface IExamination extends IDocument {
  title: string;
  description: string;
  subscriptions: ISubscription[];
  college: ICollege;
  collegeId: string;
  specialty: ISpecialty;
  specialtyId: string;
}

export interface ISpecialty extends IDocument {
  name: string;
  description: string;
  college: ICollege;
  collegeId: string;
  subjects: ISubject[];
}

export interface ISubject extends IDocument {
  name: string;
  description: string;
  specialty: ISpecialty;
  specialtyId: string;
  cases: ICase[];
  questions: IQuestion[];
}

export interface ICase extends IDocument {
  description?: string;
  source: CaseSource;
  subject: ISubject;
  subjectId: string;
  questions: IQuestion[];
}

export interface IQuestion extends IDocument {
  question: string;
  case: ICase;
  caseId: string;
  subject: ISubject;
  subjectId: string;
  questionOptions: IQuestionOptions[];
  questionAnswers: IQuestionAnswer[];
}

export interface IQuestionOptions extends IDocument {
  option: string;
  isCorrect: boolean;
  correctStatement?: string;
  incorrectStatement?: string;
  question: IQuestion;
  questionId: string;
  questionAnswers: IQuestionAnswer[];
}

export interface IQuestionAnswer extends IDocument {
  answer: string;
  question?: IQuestion;
  questionId?: string;
  correctOption: IQuestionOptions;
  correctOptionId: string;
}

export interface IStandardReference extends IDocument {
  title: string;
  headNote?: string;
  footNote?: string;
  referenceRanges: IReferenceRange[];
}

export interface IReferenceRange extends IDocument {
  referenceName: string;
  referenceValue: string;
  standardReference: IStandardReference;
  standardReferenceId: string;
}

export interface ISubscription extends IDocument {
  user: IUser;
  userId: string;
  examination: IExamination;
  examinationId: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  subscribed: boolean;
  payments: IPayment[];
}

export interface IPayment extends IDocument {
  user: IUser;
  userId: string;
  subscription: ISubscription;
  subscriptionId: string;
  amount: number;
  currency: string;
  recurring: boolean;
  paymentDate: Date;
  paymentStatus: PaymentStatus;
}

export interface ICountry extends IDocument {
  name: string;
  code: string;
  examinationCountries: IExaminationCountry[];
}

export interface IWallet extends IDocument {
  balance: number;
  user: IUser;
  userId: string;
  transactions: ITransaction[];
}

export interface ITransaction extends IDocument {
  amount: number;
  currency: string;
  type: TransactionType;
  status: string;
  metadata?: Record<string, string>;
  wallet: IWallet;
  walletId: string;
}

// Enums
export enum TransactionType {
  NONE = 'NONE',
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum UserRole {
  SUPERSDMIN = 'SUPERSDMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export enum NotificationType {
  INFO = 'INFO',
  SYSTEM = 'SYSTEM',
  NEWS = 'NEWS',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum CaseSource {
  AI = 'AI',
  SYSTEM = 'SYSTEM',
}
