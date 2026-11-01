import { useState, type FC, type FormEvent } from 'react'
import { useAuth } from '../context/useAuth'
import { updateUserPoints } from '../services/authService'
import { Mail, Lock, User as UserIcon, Sparkles, LogOut, CheckCircle, AlertCircle } from 'lucide-react'

export const AuthForm: FC = () => {
  const { user, profile, loading, signIn, signUp, logOut, refreshProfile } = useAuth()

  // Form state
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [pointsLoading, setPointsLoading] = useState<boolean>(false)

  // Handle form submission for both Sign In and Sign Up
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      if (isSignUp) {
        // Validation: require display name when registering
        if (!displayName.trim()) {
          setErrorMessage('Please enter your name.')
          setIsSubmitting(false)
          return
        }
        await signUp(email, password, displayName)
      } else {
        await signIn(email, password)
      }
      // Reset input fields on success
      setPassword('')
    } catch (err: unknown) {
      // Provide beginner-friendly error messages
      const error = err as { code?: string; message?: string }
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already registered. Please sign in instead.')
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Password must be at least 6 characters.')
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid email or password. Please try again.')
      } else {
        setErrorMessage(error.message || 'An error occurred during authentication.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Demonstration: Add 10 craft points to the user document in Firestore database
  const handleEarnPoints = async () => {
    if (!user || !profile) return
    setPointsLoading(true)
    try {
      const nextPoints = (profile.points || 0) + 10
      await updateUserPoints(user.uid, nextPoints)
      await refreshProfile()
    } catch (err) {
      console.error('Failed to update points in Firestore:', err)
    } finally {
      setPointsLoading(false)
    }
  }

  // Show a loading spinner while checking initial auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-amber-700">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 font-medium">Checking authentication...</span>
      </div>
    )
  }

  // 1. Logged In View
  if (user) {
    return (
      <div className="w-full max-w-md mx-auto bg-amber-50/80 border border-amber-200 rounded-3xl p-6 shadow-md text-right" dir="rtl">
        <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-700 font-semibold text-sm">מחובר בהצלחה / Connected</span>
          </div>
          <button
            onClick={logOut}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>התנתקות / Sign Out</span>
          </button>
        </div>

        {/* User Profile Card */}
        <div className="space-y-3">
          <div>
            <span className="text-xs text-amber-800 font-medium">שם משתמש / Name:</span>
            <p className="text-lg font-bold text-amber-950">{profile?.displayName || user.displayName || 'Craft Maker'}</p>
          </div>

          <div>
            <span className="text-xs text-amber-800 font-medium">אימייל / Email:</span>
            <p className="text-sm text-stone-700 font-mono" dir="ltr">{user.email}</p>
          </div>

          <div className="bg-amber-100/70 rounded-2xl p-4 flex items-center justify-between mt-3">
            <div>
              <span className="text-xs text-amber-800 font-medium">נקודות בבסיס הנתונים / Craft Points:</span>
              <p className="text-2xl font-black text-amber-900">{profile?.points ?? 0} ⭐</p>
            </div>
            <button
              onClick={handleEarnPoints}
              disabled={pointsLoading}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-3 py-2 rounded-xl transition-all shadow active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{pointsLoading ? 'שומר...' : '+10 נקודות'}</span>
            </button>
          </div>

          <div className="text-[11px] text-stone-500 font-mono pt-2 border-t border-amber-200" dir="ltr">
            Firestore Doc UID: {user.uid}
          </div>
        </div>
      </div>
    )
  }

  // 2. Logged Out View (Login & Signup Form)
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-lg text-right" dir="rtl">
      {/* Header and Toggle Tabs */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-amber-950 mb-1">
          {isSignUp ? 'יצירת חשבון חדש' : 'התחברות ל-CraftMaster'}
        </h2>
        <p className="text-xs text-stone-500">
          {isSignUp ? 'Create your craft profile and earn points' : 'Sign in to access your crafts and courses'}
        </p>

        {/* Tab switch */}
        <div className="flex bg-amber-50 p-1 rounded-2xl mt-4 border border-amber-200/60">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMessage('') }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              !isSignUp ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-600 hover:text-amber-900'
            }`}
          >
            התחברות (Sign In)
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMessage('') }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              isSignUp ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-600 hover:text-amber-900'
            }`}
          >
            הרשמה (Sign Up)
          </button>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input (Sign Up only) */}
        {isSignUp && (
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">שם מלא / Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="למשל: Ayala Zider"
                required={isSignUp}
                className="w-full pl-3 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white text-stone-900"
              />
              <UserIcon className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
            </div>
          </div>
        )}

        {/* Email Input */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">אימייל / Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              dir="ltr"
              className="w-full pl-3 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white text-stone-900 text-right"
            />
            <Mail className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">סיסמה / Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              dir="ltr"
              className="w-full pl-3 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white text-stone-900 text-right"
            />
            <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
          </div>
          {isSignUp && (
            <p className="text-[11px] text-stone-400 mt-1">לפחות 6 תווים (At least 6 characters)</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-98 disabled:opacity-50 mt-2"
        >
          {isSubmitting
            ? 'טוען... / Loading...'
            : isSignUp
            ? 'צור חשבון והתחל לצבור נקודות / Create Account'
            : 'התחבר / Sign In'}
        </button>
      </form>
    </div>
  )
}
