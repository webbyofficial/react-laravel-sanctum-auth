# React Laravel Sanctum Authentication Package

## Introduction

This package provides a set of React hooks and components for implementing authentication in a React application using Laravel Sanctum as the backend authentication mechanism.

### Features

- Seamless integration with Laravel Sanctum authentication.
- Hooks for performing login, registration, and logout actions.
- Context provider for managing user authentication state.
- Automatic retrieval and management of CSRF tokens.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install react-laravel-sanctum-auth
```

## Usage

1. Setup AuthProvider
   Wrap your application with the AuthProvider component provided by this package. This component should be placed at the root of your React application to manage authentication state globally.

jsx
Copy code
import { AuthProvider } from "react-laravel-sanctum-auth";

function App() {
return (
<AuthProvider config={/_ provide configuration _/}>
{/_ Your application components _/}
</AuthProvider>
);
} 2. Use Authentication Hooks
useAuth

The useAuth hook allows you to access the authentication context anywhere in your application.

jsx
Copy code
import { useAuth } from "react-laravel-sanctum-auth";

function MyComponent() {
const { user, logout } = useAuth();

return (

<div>
{user ? (
<button onClick={logout}>Logout</button>
) : (
<button onClick={login}>Login</button>
)}
</div>
);
}
useLogin, useRegister, useLogout

These hooks provide functions for performing login, registration, and logout actions respectively.

jsx
Copy code
import { useLogin, useRegister, useLogout } from "react-laravel-sanctum-auth";

function LoginForm() {
const { login } = useLogin();

const handleLogin = async (credentials) => {
const result = await login(credentials);
if (result.success) {
// Handle successful login
} else {
// Handle login failure
}
};

return (
{/_ Your login form _/}
);
} 3. Customize Configuration
You can customize the configuration of the authentication provider by passing an object with the following properties:

baseUrl: The base URL of your Laravel API.
loginUrl: The endpoint for user login.
registerUrl: The endpoint for user registration.
logoutUrl: The endpoint for user logout.
csrfCookieUrl: The URL where the CSRF token cookie is set. 4. Interceptors
The package automatically adds the CSRF token to all outgoing requests using Axios interceptors.

Example

jsx
Copy code
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "react-laravel-sanctum-auth";

const config = {
baseUrl: "https://example.com/api",
loginUrl: "/login",
registerUrl: "/register",
logoutUrl: "/logout",
csrfCookieUrl: "/sanctum/csrf-cookie",
};

ReactDOM.render(
<React.StrictMode>
<AuthProvider config={config}>
<App />
</AuthProvider>
</React.StrictMode>,
document.getElementById("root")
);
Conclusion

The React Laravel Sanctum Authentication package simplifies the process of implementing authentication in React applications using Laravel Sanctum as the backend authentication mechanism. By providing a set of hooks and components, it allows developers to focus on building their application's user interface while handling authentication seamlessly in the background.

```

```
