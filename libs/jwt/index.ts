'use server';

import { SignJWT, jwtVerify } from 'jose';
export type Payload = {
  fullName: string;
  email: string;
  uid: string;
  idToken: string;
};

const sessionJwtSecret = process.env.NEXTAUTH_JWT_SECRET || 'secrete';

export async function encrypt(payload: Payload): Promise<string> {
  const key = new TextEncoder().encode(sessionJwtSecret);
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    // .setIssuer('nextjs-auth')
    // .setAudience('nextjs-auth')
    .setExpirationTime('1h')
    .sign(key);
  return jwt;
}

export async function decrypt(token: string): Promise<Payload | null> {
  try {
    const key = new TextEncoder().encode(sessionJwtSecret);
    const result = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    if (!result) {
      return null;
    }
    const { payload } = result;
    return payload as Payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
