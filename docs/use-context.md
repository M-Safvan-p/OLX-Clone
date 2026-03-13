# useContext in This Project

This document explains how `useContext` is used in this project, with a focus on authentication.

## Why useContext here
The app needs authentication state (`user`, `loading`) in multiple places (routes, header, pages).  
`useContext` lets the app share that state without prop drilling.

## Files Involved
- `src/context/authContext.js`
  - Creates the `AuthContext`.
- `src/context/AuthProvider.jsx`
  - Provides the auth state to the app.
- `src/hooks/useAuth.js`
  - Exposes a clean `useAuth()` hook that wraps `useContext`.
- `src/main.jsx`
  - Wraps the app with `AuthProvider`.
- `src/App.jsx`
  - Consumes auth state to protect routes.
- `src/pages/CreateAd.jsx`
  - Uses auth state to block posting if not logged in.
- `src/pages/MyAds.jsx`
  - Uses auth state to fetch ads for the logged-in user.
- `src/components/Header.jsx`
  - Uses auth state to show login or user avatar.

## Authentication Context Structure

### 1) Context Creation
File: `src/context/authContext.js`
- `AuthContext = createContext();`

### 2) Provider
File: `src/context/AuthProvider.jsx`
- Uses Firebase hook `useAuthState(auth)` to get `{ user, loading }`.
- Passes `{ user, loading }` to the entire app.

### 3) App-Wide Wiring
File: `src/main.jsx`
- Wraps `<App />` with `<AuthProvider>`.

### 4) Consumption Helper
File: `src/hooks/useAuth.js`
- `useAuth()` is a clean wrapper around `useContext(AuthContext)`.
- This keeps components simple and consistent.

## Where It’s Used

### 1) Route Protection
File: `src/App.jsx`
- `ProtectedRoute` reads `{ user, loading }` from `useAuth()`.
- If `loading`, it shows a spinner.
- If `user` is null, it redirects to `/`.
- If `user` exists, it renders the protected page.

### 2) Create Ad Validation
File: `src/pages/CreateAd.jsx`
- Uses `useAuth()` to check if the user is logged in.
- If not logged in, it shows a warning and blocks posting.

### 3) My Ads Fetching
File: `src/pages/MyAds.jsx`
- Uses `useAuth()` to get the current user.
- Only fetches ads for `user.uid`.

### 4) Header UI
File: `src/components/Header.jsx`
- Uses Firebase `useAuthState(auth)` directly.
- Shows login button if not authenticated.
- Shows avatar + logout menu if authenticated.

## Why This Pattern Works Well
- Centralizes auth state in one provider.
- Keeps UI consistent across pages.
- Makes protected routes easy to control.

## Notes / Possible Improvement
- The header uses `useAuthState(auth)` directly, while other files use `useAuth()`.
- For consistency, you could replace it with `useAuth()` in the header.
  - Not required, just a style preference.
