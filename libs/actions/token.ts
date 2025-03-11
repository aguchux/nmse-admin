'use server';

import { importX509, JWTPayload, jwtVerify, JWTVerifyResult } from 'jose';

const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebasePublicKeysUrl = process.env
  .NEXT_PUBLIC_FIREBASE_PUBLIC_KEYS_URL as string;

if (!firebaseProjectId || !firebasePublicKeysUrl) {
  throw new Error('Missing Firebase configuration in environment variables');
}

// Simple in-memory caching for public keys (optional)
let cachedKeys: Record<string, string> | null = null;
let cachedAt = 0;
const cacheDuration = 60 * 60 * 1000; // 1 hour

// Get the public keys from Firebase
async function getFirebasePublicKeys(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cachedKeys && now - cachedAt < cacheDuration) {
    return cachedKeys;
  }
  const res = await fetch(firebasePublicKeysUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch Firebase public keys');
  }
  const data = await res.json();
  cachedKeys = data;
  cachedAt = now;
  return data;
}

// Get the public key for the token
async function getKey(token: string): Promise<CryptoKey> {
  // Extract the key id (kid) from token header
  const header = decodeTokenHeader(token);
  const kid = header.kid;
  if (!kid) throw new Error('Token has no "kid" header');
  // Get Firebase public keys and select the certificate for this token
  const publicKeys = await getFirebasePublicKeys();
  const cert = publicKeys[kid];
  if (!cert) throw new Error('No matching public key found');
  // Import the X509 certificate as a key for jose
  const key = await importX509(cert, 'RS256');
  return key;
}

// Helper: Decode token header
function decodeTokenHeader(token: string) {
  const [header] = token.split('.');
  const decoded = JSON.parse(Buffer.from(header, 'base64').toString('utf-8'));
  return decoded;
}

// Verify a Firebase JWT token
export const verifyToken = async (
  token: string,
): Promise<JWTVerifyResult<JWTPayload>> => {
  // Get the public key
  const key = await getKey(token);
  // Verify the token
  const verified = await jwtVerify(token, key, {
    issuer: `https://securetoken.google.com/${firebaseProjectId}`,
    audience: firebaseProjectId,
  });
  return verified;
};
