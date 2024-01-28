import React, { createContext, useContext, useEffect, useState } from "react";

import { useFetchCsrfToken } from "./AuthAPI";

export type UserType = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  csrfToken: string | null;
  setCsrfToken: (token: string) => void;
};

const AuthContent = createContext<AuthContextType>({
  user: null,
  setUser: (user: UserType | null) => {},
  csrfToken: null,
  setCsrfToken: (token: string) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchCsrfToken = useFetchCsrfToken();
  const [user, _setUser] = useState<UserType>(
    (JSON.parse(localStorage.getItem("user") as string) as UserType) || null
  );
  const csrf = JSON.parse(
    localStorage.getItem("csrfToken") as string
  ) as string;
  const [csrfToken, _setCsrfToken] = useState<string>(csrf);

  const setFunctionWithLocalStorage = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    key: string,
    value: any
  ) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      localStorage.setItem(key, "");
    }
    setter(value);
  };

  const setUser = (value: UserType | null) => {
    setFunctionWithLocalStorage(_setUser, "user", value);
  };

  const setCsrfToken = (value: string | null) => {
    setFunctionWithLocalStorage(_setCsrfToken, "csrfToken", value);
  };

  useEffect(() => {
    async function fetchCsrf() {
      const xsrf_token = await fetchCsrfToken();
      setCsrfToken(xsrf_token);
    }
    fetchCsrf();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContent.Provider value={{ user, setUser, csrfToken, setCsrfToken }}>
      {children}
    </AuthContent.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContent);
}
