import { useState, useCallback, type ReactNode } from "react";
import { AuthContext, type AuthState } from "./auth-context";
import CookieService from "../services/CookieService";  


const TOKEN_KEY = "client_token";
const ROLE_KEY = "client_role";


function getInitialAuth(): AuthState {
  const token = CookieService.get(TOKEN_KEY);
  const role = CookieService.get(ROLE_KEY);

  if (!token) {
    return { isLoggedIn: false, token: null, role: null };
  }

  return {
    isLoggedIn: true,
    token,
    role: role || null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(getInitialAuth);

  const login = useCallback((token: string, role: string) => {

    const date=new Date();
   const IN_DAYS=7
   const EXPIRE_AT_DAYS=1000*60*60*24*IN_DAYS
   date.setTime(date.getTime() + EXPIRE_AT_DAYS)

    const options = {
      path: "/",
      expires:date,
    };

    CookieService.set(TOKEN_KEY, token, options);
    CookieService.set(ROLE_KEY, role, options);

    setAuth({
      isLoggedIn: true,
      token,
      role,
    });
  }, []);

  const logout = useCallback(() => {
    const options = { path: "/" };
    CookieService.remove(TOKEN_KEY, options);
    CookieService.remove(ROLE_KEY, options);
    // navigate("/login", { replace: true });
    window.location.href = "/login";


    setAuth({
      isLoggedIn: false,
      token: null,
      role: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}