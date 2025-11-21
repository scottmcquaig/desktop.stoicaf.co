import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase/config';

export const firestore = getFirestore(firebaseApp);
export const db = firestore; // Alias for convenience
