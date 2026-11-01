import { AuthProvider } from './context/AuthProvider'
import { AuthForm } from './components/AuthForm'
import { Palette, Sparkles, Compass, Heart } from 'lucide-react'

function App() {
  return (
    // Wrap entire application with AuthProvider to supply user & authentication state
    <AuthProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900 py-8 px-4 flex flex-col items-center" dir="rtl">
        {/* App Header */}
        <header className="max-w-xl w-full text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>CraftMaster • לומדים ויוצרים ביחד</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 tracking-tight">
            CraftMaster 🎨
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            פלטפורמה לשיתוף ולמידת כישורי יצירה, צבירת נקודות והשראה
          </p>
        </header>

        {/* Authentication Card (Sign in, Sign up, or Logged In User Card) */}
        <main className="w-full max-w-md">
          <AuthForm />
        </main>

        {/* Platform Feature Highlights */}
        <footer className="max-w-md w-full mt-10 grid grid-cols-3 gap-3 text-center text-xs text-stone-600">
          <div className="bg-white p-3 rounded-2xl border border-stone-200/70 shadow-sm flex flex-col items-center gap-1">
            <Compass className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-stone-800">גלה הדרכות</span>
            <span className="text-[10px] text-stone-400">Find DIY Guides</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-stone-200/70 shadow-sm flex flex-col items-center gap-1">
            <Palette className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-stone-800">שתף יצירות</span>
            <span className="text-[10px] text-stone-400">Share Crafts</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-stone-200/70 shadow-sm flex flex-col items-center gap-1">
            <Heart className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-stone-800">צבור נקודות</span>
            <span className="text-[10px] text-stone-400">Earn Rewards</span>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}

export default App
