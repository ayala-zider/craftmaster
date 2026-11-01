import { useEffect, useState, type ReactNode, type FC } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  type UserProfile,
} from '../services/authService'
import { AuthContext } from './AuthContext'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Helper function to fetch the Firestore profile document for the current user
  const fetchProfile = async (uid: string) => {
    try {
      const data = await getUserProfile(uid)
      setProfile(data)
    } catch (error) {
      console.error('Error fetching user profile from Firestore:', error)
    }
  }

  // Listen to authentication changes when the app mounts
  useEffect(() => {
    // onAuthStateChanged triggers automatically whenever user logs in, signs up, or logs out
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        // Fetch user document from Firestore
        await fetchProfile(currentUser.uid)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    // Clean up subscription when component unmounts
    return () => unsubscribe()
  }, [])

  // User actions
  const signUp = async (email: string, password: string, displayName: string) => {
    const newProfile = await registerUser(email, password, displayName)
    setProfile(newProfile)
  }

  const signIn = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password)
    await fetchProfile(loggedInUser.uid)
  }

  const logOut = async () => {
    await logoutUser()
    setUser(null)
    setProfile(null)
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.uid)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        logOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

