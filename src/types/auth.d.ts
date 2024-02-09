type UserType = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  csrfToken: string | null;
  setCsrfToken: (token: string) => void;
  config: AuthContextConfigType | null;
};

type AuthContextConfigType = {
  baseUrl: string;
  csrfCookieUrl: string;
  loginUrl: string;
  logoutUrl: string;
  registerUrl: string;
};

type AuthContextProps = {
  config: AuthContextConfigType;
  children: React.ReactNode;
};
