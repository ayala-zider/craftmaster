import { useContext } from 'react'
import { AuthContext } from './AuthContext'

/**
 * Custom hook to consume the AuthContext anywhere in the component tree
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

