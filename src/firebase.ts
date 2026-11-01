import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Load configuration keys securely from environment variables (.env file)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// 1. Initialize the Firebase application instance
export const app = initializeApp(firebaseConfig)

// 2. Initialize and export Firebase Authentication (for login/signup)
export const auth = getAuth(app)

// 3. Initialize and export Firestore Database (for storing user profiles and craft data)
export const db = getFirestore(app)

// 4. Initialize and export Cloud Storage (for uploading craft images/videos)
export const storage = getStorage(app)

export default app
