import { useState, type FC, type FormEvent } from 'react'

export const CraftMasterLogin: FC = () => {
  // Tab toggle state: 'login' or 'signup' (from setAuthTab in source)
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup')

  // Contact toggle state: 'email' or 'phone' (from toggleContactMode in source)
  const [contactMode, setContactMode] = useState<'email' | 'phone'>('email')

  // Form input states with defaults from source code.html
  const [firstName, setFirstName] = useState<string>('Noa')
  const [familyName, setFamilyName] = useState<string>('Crafty')
  const [gender, setGender] = useState<string>('Female')
  const [email, setEmail] = useState<string>('noa@craftmaster.art')
  const [phone, setPhone] = useState<string>('')
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true)

  // Handle form submission
  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', {
      authTab,
      firstName,
      familyName,
      gender,
      contactMode,
      email: contactMode === 'email' ? email : undefined,
      phone: contactMode === 'phone' ? phone : undefined,
      termsAccepted,
    })
  }

  // Handle Google Login
  const handleGoogleLogin = () => {
    console.log('Google login clicked')
  }

  return (
    // Mobile Shell Device Wrapper (max-w-[430px])
    <main className="w-full max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[920px] bg-surface sm:rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden border border-outline-variant/30">
      {/* Top Bar Component */}
      <header className="bg-surface z-40 border-b border-outline-variant/30 shadow-sm transition-all duration-200" id="topAppBar">
        <div className="flex justify-between items-center w-full px-space-md py-space-sm max-w-[430px] mx-auto">
          <div className="flex items-center gap-space-xs">
            <span
              className="material-symbols-outlined text-primary text-[26px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              palette
            </span>
            <span className="text-headline-sm font-headline-sm font-bold text-primary">Craft Master</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <div className="flex items-center gap-1 bg-surface-container px-space-sm py-1 rounded-full border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                stars
              </span>
              <span className="text-label-md font-label-md text-primary" id="globalStarCountBadge">
                14
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Screen Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative" id="screenViewport">
        {/* ============================================== */}
        {/* SCREEN 1: LOGIN / ONBOARDING SCREEN           */}
        {/* ============================================== */}
        <section className="px-space-md py-space-lg flex flex-col justify-between min-h-[760px]" id="screen-login">
          {/* Logo and Greeting Header */}
          <div className="text-center pt-space-md">
            <div className="w-20 h-20 mx-auto rounded-full bg-surface-container flex items-center justify-center shadow-md mb-space-md border border-secondary-container">
              <span
                className="material-symbols-outlined text-primary text-[36px]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                palette
              </span>
            </div>
            <h1 className="text-headline-lg font-headline-lg text-primary tracking-tight">Craft Master</h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-space-xs px-space-sm">
              Discover joyful DIY crafts, learn at your pace, and share your creative spark.
            </p>
          </div>

          {/* Auth Card Container */}
          <div className="bg-surface-container-low rounded-xl p-space-lg border border-outline-variant/30 shadow-sm mt-space-md">
            {/* Switch Tabs */}
            <div className="flex bg-surface-container rounded-full p-1 mb-space-md border border-outline-variant/20">
              <button
                type="button"
                id="tab-login"
                onClick={() => setAuthTab('login')}
                className={`flex-1 py-1.5 rounded-full text-label-md font-label-md transition-all ${
                  authTab === 'login'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                id="tab-signup"
                onClick={() => setAuthTab('signup')}
                className={`flex-1 py-1.5 rounded-full text-label-md font-label-md transition-all ${
                  authTab === 'signup'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Auth Form */}
            <form className="space-y-space-md" id="authForm" onSubmit={handleAuthSubmit}>
              {/* Name Fields (First & Family Name) */}
              <div className="grid grid-cols-2 gap-space-xs">
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1" htmlFor="firstNameInput">
                    First Name
                  </label>
                  <input
                    className="w-full px-space-md py-2 rounded-full bg-surface border border-outline-variant text-on-surface text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    id="firstNameInput"
                    placeholder="Noa"
                    required
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1" htmlFor="familyNameInput">
                    Family Name
                  </label>
                  <input
                    className="w-full px-space-md py-2 rounded-full bg-surface border border-outline-variant text-on-surface text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                    id="familyNameInput"
                    placeholder="Crafty"
                    required
                    type="text"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1">Gender</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Female', 'Male', 'Other'] as const).map((item) => (
                    <label
                      key={item}
                      id={`gender-${item.toLowerCase()}-label`}
                      className={`cursor-pointer border border-outline-variant/60 rounded-full py-1.5 px-2 text-center text-label-sm font-label-sm hover:bg-surface-container flex items-center justify-center gap-1 transition ${
                        gender === item ? 'bg-surface-container border-primary' : 'bg-surface'
                      }`}
                    >
                      <input
                        checked={gender === item}
                        onChange={() => setGender(item)}
                        className="text-primary focus:ring-0 w-3.5 h-3.5"
                        name="gender"
                        type="radio"
                        value={item}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Option Segmented Toggle (Email or Phone) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-label-sm font-label-sm text-on-surface-variant">Contact Info</label>
                  <div className="inline-flex bg-surface-container rounded-full p-0.5 border border-outline-variant/30 text-label-sm font-label-sm">
                    <button
                      type="button"
                      id="contactTypeEmail"
                      onClick={() => setContactMode('email')}
                      className={`px-space-xs py-0.5 rounded-full transition-all text-[11px] ${
                        contactMode === 'email'
                          ? 'bg-primary text-on-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      id="contactTypePhone"
                      onClick={() => setContactMode('phone')}
                      className={`px-space-xs py-0.5 rounded-full transition-all text-[11px] ${
                        contactMode === 'phone'
                          ? 'bg-primary text-on-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                {/* Email input view */}
                {contactMode === 'email' && (
                  <div id="emailContactGroup">
                    <input
                      className="w-full px-space-md py-2 rounded-full bg-surface border border-outline-variant text-on-surface text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      id="emailInput"
                      placeholder="noa@craftmaster.art"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}

                {/* Phone input view */}
                {contactMode === 'phone' && (
                  <div id="phoneContactGroup">
                    <input
                      className="w-full px-space-md py-2 rounded-full bg-surface border border-outline-variant text-on-surface text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      id="phoneInput"
                      placeholder="+1 (555) 234-5678"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-start gap-2 pt-0.5">
                <input
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded text-primary focus:ring-primary mt-0.5 w-4 h-4 cursor-pointer border-outline-variant"
                  id="termsCheckbox"
                  required
                  type="checkbox"
                />
                <label className="text-label-sm font-label-sm text-on-surface-variant cursor-pointer select-none" htmlFor="termsCheckbox">
                  I agree to the{' '}
                  <a className="text-primary underline hover:text-primary-container font-bold" href="#">
                    Terms &amp; Conditions
                  </a>{' '}
                  and{' '}
                  <a className="text-primary underline hover:text-primary-container font-bold" href="#">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Primary CTA Button */}
              <button
                className="w-full py-space-sm px-space-lg rounded-full bg-primary text-on-primary text-label-lg font-label-lg shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-space-xs mt-1"
                type="submit"
              >
                <span>{authTab === 'signup' ? 'Create Account' : 'Log In'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>

            {/* Divider OR */}
            <div className="flex items-center my-space-md">
              <div className="flex-1 border-t border-outline-variant/30"></div>
              <span className="px-space-sm text-label-sm font-label-sm text-outline">OR</span>
              <div className="flex-1 border-t border-outline-variant/30"></div>
            </div>

            {/* Google Sign In Button */}
            <button
              className="w-full py-space-sm px-space-md rounded-full bg-surface border border-outline-variant text-on-surface text-label-md font-label-md hover:bg-surface-container flex items-center justify-center gap-space-sm active:scale-95 transition"
              onClick={handleGoogleLogin}
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
                <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" fill="#4285F4" />
                <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z" fill="#FBBC05" />
                <path d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.4 7.5 23.5 12 23.5z" fill="#34A853" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-label-sm font-label-sm text-outline mt-space-md">
            Warm &amp; gentle DIY space • Free &amp; joyful crafting
          </p>
        </section>
      </div>
    </main>
  )
}
