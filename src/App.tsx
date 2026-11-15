import { useState } from 'react'
import { AuthProvider } from './context/AuthProvider'
import { useAuth } from './context/useAuth'
import { CraftMasterLogin } from './components/CraftMasterLogin'
import { CraftMasterRegister } from './components/CraftMasterRegister'
import { CraftMasterHomeScreen } from './components/CraftMasterHomeScreen'
import { CraftMasterCourseInsite } from './components/CraftMasterCourseInsite'
import { CraftMasterCoursesScreen } from './components/CraftMasterCoursesScreen'
import { CraftMasterCreateCourse } from './components/CraftMasterCreateCourse'

// Inner component to access authentication state from AuthProvider
function AppContent() {
  const { user, profile, loading, logOut } = useAuth()
  
  // Navigation state between screens: 'home', 'courses', 'course-insite', 'create-course', 'login', or 'register'
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'courses' | 'course-insite' | 'create-course' | 'login' | 'register'
  >('create-course')

  // 1. Loading State while Firebase verifies active session
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-[#834e3e]">
        <div className="w-10 h-10 border-4 border-[#834e3e] border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-3 font-semibold text-sm">Loading Craft Master...</span>
      </div>
    )
  }

  // 2. Authenticated User View
  if (user) {
    if (currentScreen === 'create-course') {
      return (
        <CraftMasterCreateCourse
          onClose={() => setCurrentScreen('courses')}
          onPublish={() => setCurrentScreen('courses')}
          onNavigate={(tab) => {
            if (tab === 'home') setCurrentScreen('home')
            if (tab === 'courses') setCurrentScreen('courses')
          }}
        />
      )
    }

    if (currentScreen === 'course-insite') {
      return (
        <CraftMasterCourseInsite
          onBack={() => setCurrentScreen('courses')}
          onComplete={() => setCurrentScreen('courses')}
        />
      )
    }

    if (currentScreen === 'courses') {
      return (
        <CraftMasterCoursesScreen
          onNavigate={(tab) => {
            if (tab === 'home') setCurrentScreen('home')
          }}
          onCourseClick={() => setCurrentScreen('course-insite')}
        />
      )
    }

    return (
      <CraftMasterHomeScreen
        userName={profile?.displayName || user.displayName || user.email?.split('@')[0] || 'Noa Crafty'}
        userStars={profile?.points ?? 15}
        onSignOut={logOut}
        onNavigate={(tab) => {
          if (tab === 'courses') setCurrentScreen('courses')
          if (tab === 'my-courses') setCurrentScreen('course-insite')
        }}
      />
    )
  }

  // 3. Logged-Out Views: Allows previewing any screen for testing
  return (
    <div className="flex flex-col items-center w-full">
      {/* Screen switcher pill bar for easy student preview & testing */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 bg-[#fff8f4] px-3 py-1.5 rounded-full shadow-sm border border-[#d7c2bc]/40 text-xs font-semibold">
        <span className="text-[#52443f] mr-1">Preview:</span>
        <button
          type="button"
          onClick={() => setCurrentScreen('create-course')}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            currentScreen === 'create-course'
              ? 'bg-[#834e3e] text-white shadow-xs'
              : 'text-[#834e3e] hover:bg-[#fdebd9]'
          }`}
        >
          Create Course Modal
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('courses')}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            currentScreen === 'courses'
              ? 'bg-[#834e3e] text-white shadow-xs'
              : 'text-[#834e3e] hover:bg-[#fdebd9]'
          }`}
        >
          Courses Catalog
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('course-insite')}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            currentScreen === 'course-insite'
              ? 'bg-[#834e3e] text-white shadow-xs'
              : 'text-[#834e3e] hover:bg-[#fdebd9]'
          }`}
        >
          Course Lesson View
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('home')}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            currentScreen === 'home'
              ? 'bg-[#834e3e] text-white shadow-xs'
              : 'text-[#834e3e] hover:bg-[#fdebd9]'
          }`}
        >
          Home Screen
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            currentScreen === 'login'
              ? 'bg-[#834e3e] text-white shadow-xs'
              : 'text-[#834e3e] hover:bg-[#fdebd9]'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('register')}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            currentScreen === 'register'
              ? 'bg-[#834e3e] text-white shadow-xs'
              : 'text-[#834e3e] hover:bg-[#fdebd9]'
          }`}
        >
          Register
        </button>
      </div>

      {/* Render selected screen */}
      {currentScreen === 'create-course' && (
        <CraftMasterCreateCourse
          onClose={() => setCurrentScreen('courses')}
          onPublish={() => setCurrentScreen('courses')}
          onNavigate={(tab) => {
            if (tab === 'home') setCurrentScreen('home')
            if (tab === 'courses') setCurrentScreen('courses')
          }}
        />
      )}

      {currentScreen === 'courses' && (
        <CraftMasterCoursesScreen
          onNavigate={(tab) => {
            if (tab === 'home') setCurrentScreen('home')
          }}
          onCourseClick={() => setCurrentScreen('course-insite')}
        />
      )}

      {currentScreen === 'course-insite' && (
        <CraftMasterCourseInsite
          onBack={() => setCurrentScreen('courses')}
          onComplete={() => setCurrentScreen('courses')}
        />
      )}

      {currentScreen === 'home' && (
        <CraftMasterHomeScreen
          userName="Noa Crafty"
          userStars={15}
          onNavigate={(tab) => {
            if (tab === 'courses') setCurrentScreen('courses')
            if (tab === 'my-courses') setCurrentScreen('course-insite')
          }}
        />
      )}

      {currentScreen === 'login' && (
        <CraftMasterLogin onSignUpClick={() => setCurrentScreen('register')} />
      )}

      {currentScreen === 'register' && (
        <CraftMasterRegister onLoginClick={() => setCurrentScreen('login')} />
      )}
    </div>
  )
}

function App() {
  return (
    // Wrap entire app in AuthProvider to share Firebase session state
    <AuthProvider>
      <div className="min-h-screen w-full flex justify-center items-center p-0 sm:p-4 bg-surface-dim">
        <AppContent />
      </div>
    </AuthProvider>
  )
}

export default App
