# Authentication

This document explains how authentication is implemented in this project.

## Overview
- Firebase Auth is used for login and logout.
- Google sign-in is implemented with a popup.
- Auth state is exposed globally via React Context.
- Protected routes block unauthenticated access.

## Files Involved
- `src/config/firebase.js`
  - Initializes Firebase.
  - Exports `auth` and `provider` (GoogleAuthProvider).
- `src/context/authContext.js`
  - Defines `AuthContext`.
- `src/context/AuthProvider.jsx`
  - Uses `useAuthState(auth)` to track the logged-in user.
  - Provides `{ user, loading }` to the app.
- `src/hooks/useAuth.js`
  - Convenience hook to read `AuthContext`.
- `src/components/LoginModal.jsx`
  - Runs `signInWithPopup(auth, provider)` for Google login.
- `src/components/Header.jsx`
  - Shows login or user avatar.
  - Handles `signOut(auth)` for logout.
- `src/App.jsx`
  - Defines `ProtectedRoute` for route guarding.
- `src/main.jsx`
  - Wraps the app with `AuthProvider`.

## Auth State Flow
1. `AuthProvider` subscribes to Firebase Auth state using `useAuthState(auth)`.
2. It provides `{ user, loading }` via `AuthContext`.
3. Any component can access the auth state via `useAuth()`.

## Login Flow
1. User clicks Login in the header.
2. `LoginModal` opens.
3. Clicking “Continue with Google” triggers:
   - `signInWithPopup(auth, provider)`
4. On success, Firebase updates the auth state and the UI updates automatically.

Note: The “Continue with phone” and “Login with Email” buttons are UI only.

## Logout Flow
1. User opens the avatar menu in the header.
2. Clicking “Logout” calls `signOut(auth)`.
3. Firebase clears the session and `user` becomes `null`.

## Protected Routes
`ProtectedRoute` (in `src/App.jsx`) blocks access when `user` is null.

Protected routes:
- `/create-ad`
- `/My-Ads`
- `/edit-ad/:id`

## Security Note
This is client-side protection. Firestore rules should also enforce access control.
