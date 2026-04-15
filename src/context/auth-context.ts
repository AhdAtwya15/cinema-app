import { createContext } from "react";

export type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  role: string | null;
};

export type AuthContextType = AuthState & {
  login: (token: string, role: string) => void;
  logout: () => void;
};

export const AuthContext =
  createContext<AuthContextType | undefined>(undefined);