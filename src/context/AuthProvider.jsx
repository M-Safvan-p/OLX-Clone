import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}