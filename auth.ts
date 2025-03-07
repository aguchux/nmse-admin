export const runtime = "edge";

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';


const authHandler = NextAuth(authConfig);

const { auth, signIn, signOut } = authHandler;
export { auth, authHandler as handler, signIn, signOut };

