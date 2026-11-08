import { createContext } from 'react'
import type { User } from 'firebase/auth'
import type { UserProfile } from '../services/authService'

export interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

// Create Context to share authentication state across the application
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

