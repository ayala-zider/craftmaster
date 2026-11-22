import { useState, type FC, type FormEvent } from 'react'
import { useAuth } from '../context/useAuth'

interface CraftMasterLoginProps {
  onSignUpClick?: () => void
  onLoginSuccess?: () => void
}

export const CraftMasterLogin: FC<CraftMasterLoginProps> = ({ onSignUpClick, onLoginSuccess }) => {
  // Access Firebase Authentication actions from AuthContext
  const { signIn, signInWithGoogle } = useAuth()

  // Controlled form states
  const [identifier, setIdentifier] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  // Initialize rememberMe from localStorage
  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    return localStorage.getItem('craftmaster_remember_device') === 'true'
  })
  
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Handle form submission with Firebase Authentication
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.')
      return
    }

    setIsSubmitting(true)
    try {
      await signIn(identifier.trim(), password)
      
      // Save device preference if checked
      if (rememberMe) {
        localStorage.setItem('craftmaster_remember_device', 'true')
      } else {
        localStorage.removeItem('craftmaster_remember_device')
      }

      if (onLoginSuccess) {
        onLoginSuccess()
      }
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string }
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setErrorMessage('Invalid email or password. Please try again.')
      } else {
        setErrorMessage(error.message || 'Login failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Google Login click
  const handleGoogleLogin = async () => {
    setErrorMessage('')
    setIsSubmitting(true)
    try {
      await signInWithGoogle()
      
      // Save device preference if checked
      if (rememberMe) {
        localStorage.setItem('craftmaster_remember_device', 'true')
      } else {
        localStorage.removeItem('craftmaster_remember_device')
      }

      if (onLoginSuccess) {
        onLoginSuccess()
      }
    } catch (err: unknown) {
      const error = err as { message?: string }
      setErrorMessage(error.message || 'Google sign-in failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // Mobile Viewport Container mimicking tactile creative journal canvas
    <main className="w-full max-w-[430px] min-h-screen sm:min-h-0 sm:rounded-xl bg-background shadow-xl overflow-hidden flex flex-col relative border border-outline-variant/30 text-left">
      {/* TopAppBar Component */}
      <header className="bg-surface text-primary border-b border-outline-variant/30 shadow-sm flex justify-between items-center w-full px-space-md py-space-sm max-w-[430px] mx-auto z-10">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-2xl" data-icon="palette">
            palette
          </span>
          <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">
            Craft Master
          </span>
        </div>
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container-high text-primary hover:bg-surface-container transition-colors duration-150">
          <span
            className="material-symbols-outlined text-xl"
            data-icon="stars"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stars
          </span>
        </div>
      </header>

      {/* Scrollable Content Canvas */}
      <div className="flex-1 overflow-y-auto px-space-md pt-space-lg pb-space-2xl flex flex-col justify-between">
        <div>
          {/* Brand Emblem / Avatar & Welcome Header */}
          <div className="flex flex-col items-center text-center mb-space-xl">
            <div className="relative w-20 h-20 rounded-full bg-surface-container-high border-2 border-outline-variant/40 flex items-center justify-center shadow-sm mb-space-md">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center shadow-inner">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  data-icon="palette"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  palette
                </span>
              </div>
              {/* Playful small studio spark badge */}
              <div className="absolute -bottom-1 -right-1 bg-secondary-container text-on-secondary-container w-7 h-7 rounded-full flex items-center justify-center border-2 border-background shadow-xs">
                <span className="material-symbols-outlined text-sm" data-icon="brush">
                  brush
                </span>
              </div>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-primary tracking-tight mb-space-2xs">
              Craft Master
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant max-w-[280px]">
              Welcome back, crafter! Log in to continue your creative journey.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-red-600">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form Card */}
          <form
            className="bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg p-space-lg shadow-sm space-y-space-md"
            onSubmit={handleSubmit}
          >
            {/* Email / Phone Input */}
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-space-2xs" htmlFor="craft-identifier">
                Email or Phone Number
              </label>
              <div className="relative">
                <input
                  className="w-full h-12 px-space-md rounded-full bg-surface-container-low border border-outline-variant/50 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  id="craft-identifier"
                  placeholder="e.g. noa@craftmaster.art"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-4 top-3 text-outline-variant" data-icon="mail">
                  mail
                </span>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-space-2xs" htmlFor="craft-password">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full h-12 pl-space-md pr-12 rounded-full bg-surface-container-low border border-outline-variant/50 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  id="craft-password"
                  placeholder="••••••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 top-2.5 p-1 rounded-full text-on-surface-variant/70 hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  id="toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl" data-icon={showPassword ? 'visibility_off' : 'visibility'}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <div className="flex justify-end mt-space-2xs">
                <a className="text-label-md font-label-md text-primary hover:text-primary-container transition-colors" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-space-xs pt-space-2xs">
              <input
                className="w-5 h-5 rounded-lg border-2 border-outline-variant text-primary focus:ring-primary/20 focus:ring-offset-0 bg-surface-container-low cursor-pointer transition-colors"
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  const checked = e.target.checked
                  setRememberMe(checked)
                  if (checked) {
                    localStorage.setItem('craftmaster_remember_device', 'true')
                  } else {
                    localStorage.removeItem('craftmaster_remember_device')
                  }
                }}
              />
              <label className="text-body-sm font-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember-me">
                Remember this device
              </label>
            </div>

            {/* Primary Action CTA Button */}
            <button
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md hover:bg-primary-container active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
              type="submit"
            >
              <span>{isSubmitting ? 'Logging In...' : 'Log In'}</span>
              <span className="material-symbols-outlined text-lg" data-icon="arrow_forward">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Divider: OR */}
          <div className="relative my-space-lg flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <span className="relative px-space-md bg-background text-label-sm font-label-sm text-outline tracking-wider">
              OR
            </span>
          </div>

          {/* Secondary Social Login: Sign in with Google */}
          <button
            disabled={isSubmitting}
            className="w-full h-12 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:bg-surface-container-low text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-xs active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
            type="button"
            onClick={handleGoogleLogin}
          >
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                fill="#4285F4"
              />
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.14C3.26 21.36 7.33 24 12 24z"
                fill="#34A853"
              />
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.41l4.04-3.14z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Don't have an account switch text */}
          <div className="text-center mt-space-lg">
            <p className="text-body-md font-body-md text-on-surface-variant">
              Don&apos;t have an account?{' '}
              <a
                className="font-bold text-primary hover:text-primary-container transition-colors inline-block ml-1 underline decoration-primary/40 underline-offset-4"
                href="#signup"
                onClick={(e) => {
                  if (onSignUpClick) {
                    e.preventDefault()
                    onSignUpClick()
                  }
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Footer Tagline & Creative Studio Touch */}
        <footer className="mt-space-xl pt-space-md text-center">
          <div className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-full bg-surface-container-high/60 border border-outline-variant/20 mb-space-xs">
            <span className="material-symbols-outlined text-tertiary text-xs" data-icon="auto_awesome">
              auto_awesome
            </span>
            <span className="text-label-sm font-label-sm text-tertiary">
              Warm &amp; gentle DIY space • Free &amp; joyful crafting
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default CraftMasterLogin
