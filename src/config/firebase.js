
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy9Vr4f_nllQ5ApzaEEO0LkFuK0MoesJ4",
  authDomain: "olx-clone-70f4f.firebaseapp.com",
  projectId: "olx-clone-70f4f",
  storageBucket: "olx-clone-70f4f.firebasestorage.app",
  messagingSenderId: "129345944346",
  appId: "1:129345944346:web:c13081267f7e938f804aa3",
  measurementId: "G-LKLWTLVK52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);