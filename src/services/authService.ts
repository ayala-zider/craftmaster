import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '../firebase'

// Type definition for user profile data stored in Firestore
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  points: number
  createdAt?: unknown
}

/**
 * Register a new user with email and password, then save profile data to Firestore
 */
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<UserProfile> {
  // 1. Create user account in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // 2. Update display name in Firebase Auth profile
  if (displayName) {
    await updateProfile(user, { displayName })
  }

  // 3. Prepare the profile document data to store in Firestore
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || email,
    displayName: displayName || 'Craft Maker',
    points: 0, // Initial points for new users
    createdAt: serverTimestamp(),
  }

  // 4. Save to Firestore collection 'users' using the user's UID as the document ID
  const userDocRef = doc(db, 'users', user.uid)
  await setDoc(userDocRef, userProfile)

  return userProfile
}

/**
 * Log in an existing user with email and password
 */
export async function loginUser(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

/**
 * Log out the currently authenticated user
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth)
}

/**
 * Fetch the user profile data from the Firestore 'users' collection
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, 'users', uid)
  const docSnapshot = await getDoc(userDocRef)

  if (docSnapshot.exists()) {
    return docSnapshot.data() as UserProfile
  }

  return null
}

/**
 * Update points for a user in Firestore
 */
export async function updateUserPoints(uid: string, points: number): Promise<void> {
  const userDocRef = doc(db, 'users', uid)
  await updateDoc(userDocRef, { points })
}
