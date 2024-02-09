import React from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { useLogin } from "./AuthAPI";

export default {
  title: "Auth Test",
};

function Child() {
  const { config } = useAuth();
  const { login } = useLogin();
  console.log(config);

  const handleLogin = async () => {
    const result = await login({
      email: "test@example.com",
      password: "password",
    });
    console.log(result);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export function AuthTest() {
  return (
    <AuthProvider
      config={{
        baseUrl: "http://localhost:80/",
        csrfCookieUrl: "http://localhost:80/sanctum/csrf-cookie",
        loginUrl: "api/login",
        logoutUrl: "api/logout",
        registerUrl: "api/register",
      }}
    >
      <Child />
    </AuthProvider>
  );
}
