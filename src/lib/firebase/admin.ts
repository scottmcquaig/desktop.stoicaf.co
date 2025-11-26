import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App | null = null;
let adminDb: Firestore | null = null;
let adminAuth: Auth | null = null;
let initError: Error | null = null;
let initialized = false;

function initializeFirebaseAdmin(): { app: App; adminDb: Firestore; adminAuth: Auth } | null {
  try {
    if (getApps().length === 0) {
      // Use service account credentials from environment
      let serviceAccount: object | undefined;

      // Support both base64-encoded and raw JSON formats
      const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
      const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

      if (base64Key) {
        try {
          const decoded = Buffer.from(base64Key, 'base64').toString('utf-8');
          serviceAccount = JSON.parse(decoded);
        } catch (parseError) {
          console.error('Failed to decode FIREBASE_SERVICE_ACCOUNT_KEY_BASE64:', parseError);
          initError = new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 format');
          return null;
        }
      } else if (rawKey) {
        try {
          serviceAccount = JSON.parse(rawKey);
        } catch (parseError) {
          console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', parseError);
          initError = new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY format');
          return null;
        }
      }

      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      if (!projectId) {
        console.error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured');
        initError = new Error('Firebase project ID is not configured');
        return null;
      }

      if (serviceAccount) {
        app = initializeApp({
          credential: cert(serviceAccount),
          projectId,
        });
      } else {
        // Fallback for development - use application default credentials
        console.warn('No FIREBASE_SERVICE_ACCOUNT_KEY found, using default credentials');
        app = initializeApp({
          projectId,
        });
      }
    } else {
      app = getApps()[0];
    }

    adminDb = getFirestore(app);
    adminAuth = getAuth(app);

    if (!initialized) {
      const credentialSource = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64
        ? 'serviceAccount (base64)'
        : process.env.FIREBASE_SERVICE_ACCOUNT_KEY
          ? 'serviceAccount (raw)'
          : 'defaultCredentials';
      console.info(
        'Firebase Admin initialized successfully',
        JSON.stringify({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          credentialSource,
          appName: app.name,
        })
      );
      initialized = true;
    }

    return { app, adminDb, adminAuth };
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    initError = error instanceof Error ? error : new Error('Unknown initialization error');
    return null;
  }
}

// Initialize on module load
initializeFirebaseAdmin();

// Helper to check if admin is available
export function isAdminInitialized(): boolean {
  return adminDb !== null && adminAuth !== null;
}

// Helper to get initialization error
export function getAdminInitError(): Error | null {
  return initError;
}

// Getter functions for accessing admin instances with null checks
export function getAdminDb(): Firestore {
  if (!adminDb) {
    throw new Error(initError?.message || 'Firebase Admin not initialized');
  }
  return adminDb;
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    throw new Error(initError?.message || 'Firebase Admin not initialized');
  }
  return adminAuth;
}

// Legacy exports for backward compatibility (may be null)
export { adminDb, adminAuth };
