'use server';

import { importX509, JWTPayload, jwtVerify, JWTVerifyResult } from 'jose';

const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID; // Ensure this is set in your env variables!
const firebasePublicKeysUrl = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_KEYS_URL as string; // Ensure this is set in your env variables!

// Simple in-memory caching for public keys (optional)
let cachedKeys: Record<string, string> | null = null;
let cachedAt = 0;
const cacheDuration = 60 * 60 * 1000; // 1 hour

async function getFirebasePublicKeys() {
    const now = Date.now();
    if (cachedKeys && now - cachedAt < cacheDuration) {
        return cachedKeys;
    }
    const res = await fetch(firebasePublicKeysUrl);
    const data = await res.json();
    cachedKeys = data;
    cachedAt = now;
    return data;
}

// Helper: Decode token header (Edge supports atob)
function decodeTokenHeader(token: string) {
    const [header] = token.split('.');
    const decoded = JSON.parse(atob(header));
    return decoded;
}

export const verifyToken = async (
    token: string,
): Promise<JWTVerifyResult<JWTPayload>> => {
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

    // Verify the token
    const verified = await jwtVerify(token, key, {
        issuer: `https://securetoken.google.com/nmse-exam-prep/${firebaseProjectId}`,
        audience: firebaseProjectId,
    });
    return verified;
};
