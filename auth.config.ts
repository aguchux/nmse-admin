export const runtime = "edge";

import type { AuthOptions, DefaultSession, User } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';
import { axiosInstance } from './api/apiCaller';
import { signInSchema } from './libs';

// import { createStorage } from "unstorage"
// import memoryDriver from "unstorage/drivers/memory"
// import vercelKVDriver from "unstorage/drivers/vercel-kv"
// import { UnstorageAdapter } from "@auth/unstorage-adapter"

declare module 'next-auth' {
    interface Session {
        user: {
            authId: string;
            userId: string;
            fullName: string;
            email: string;
            role: string;
            token: string;
        } & DefaultSession['user'];
        accessToken: string;
    }
}

// declare module "next-auth/jwt" {
//     interface JWT {
//         accessToken?: string
//     }
// }

export type AuthUser = User & {
    authId: string;
    userId: string;
    fullName: string;
    email: string;
    role: string;
    token: string;
};

export const authConfig = {
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Email Address',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } =
                        await signInSchema.parseAsync(credentials);
                    const result = await axiosInstance.post<AuthUser>('/auth/login', {
                        email,
                        password,
                    });
                    if (!result.data) {
                        throw new Error('Invalid credentials.');
                    }
                    return result.data as User;
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null;
                    }
                    throw new Error('Invalid credentials.');
                }
            },
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async session({ session, token, user }) {
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user, account, profile }) {
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
} satisfies AuthOptions;