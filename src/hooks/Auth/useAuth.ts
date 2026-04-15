import { AuthContext } from "../../context/auth-context.ts";
import { useContext } from "react";


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}