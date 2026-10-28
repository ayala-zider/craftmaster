# craftMaster

A modern web application built with:
- **Node.js** - Runtime environment
- **TypeScript** - Type safety and developer experience
- **React 19** - UI library
- **Vite** - Fast frontend tooling and bundler
- **Tailwind CSS v4** - Styling via `@tailwindcss/vite`
- **Lucide React** (`lucide-react`) - Modern icon library
- **Firebase** - Backend services (Auth, Firestore, Storage)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase Environment Variables
Copy `.env.example` to `.env` and fill in your Firebase project credentials:
```bash
cp .env.example .env
```

Firebase credentials in `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

The Firebase initialization is set up in `src/firebase.ts` exporting:
- `auth`: Firebase Authentication
- `db`: Firestore Database
- `storage`: Firebase Storage
- `app`: Firebase App instance

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Lint
```bash
npm run lint
```
