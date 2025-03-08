import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const {
    auth,
    signIn,
    signOut,
    handler: { GET, POST }
} = NextAuth(authConfig);
