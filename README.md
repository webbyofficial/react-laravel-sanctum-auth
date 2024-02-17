# React Laravel Sanctum Authentication Package

## Introduction

This package provides a set of React hooks and components for implementing authentication in a React application using Laravel Sanctum as the backend authentication mechanism.

## Features

- Seamless integration with Laravel Sanctum authentication.
- Hooks for performing login, registration, and logout actions.
- Context provider for managing user authentication state.
- Automatic retrieval and management of CSRF tokens.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install @webbydevs/react-laravel-sanctum-auth
```

## Usage

### Setup AuthProvider

Wrap your application with the AuthProvider component provided by this package. This component should be placed at the root of your React application to manage authentication state globally.

The component requires a `config` parameter which requires the following properties:

- baseUrl: The base URL of your Laravel API.
- loginUrl: The endpoint for user login.
- registerUrl: The endpoint for user registration.
- logoutUrl: The endpoint for user logout.
- csrfCookieUrl: The endpoint where the CSRF token cookie is set.

```jsx
import { AuthProvider } from "react-laravel-sanctum-auth";

const config = {
  baseUrl: "https://example.com/",
  loginUrl: "api/login",
  registerUrl: "api/register",
  logoutUrl: "api/logout",
  csrfCookieUrl: "sanctum/csrf-cookie",
};

function App() {
  return (
    <AuthProvider config={config}>
      {/* Your application components */}
    </AuthProvider>
  );
}
```

### Use Authentication Hooks

#### `useAuth`

The useAuth hook allows you to access the authentication context anywhere in your application such as `user`, `setUser`, `csrfToken`, `setCsrfToken` and `config`.

```jsx
import { useAuth } from "react-laravel-sanctum-auth";

function MyComponent() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <button
          onClick={
            {
              /*logout*/
            }
          }
        >
          Logout
        </button>
      ) : (
        <button
          onClick={
            {
              /*logout*/
            }
          }
        >
          Login
        </button>
      )}
    </div>
  );
}
```

The code above is a simple example for logging in and logging out of the application, depending on the authentication state of the user.

#### `useLogin`, `useRegister`, `useLogout`

These hooks provide functions for performing login, registration, and logout actions respectively.

```jsx
import { useLogin } from "react-laravel-sanctum-auth";

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

  return {
    /* Your login form */
  };
}
```

4.  - Interceptors
      The package automatically adds the CSRF token to all outgoing requests using Axios interceptors.

## Conclusion

The React Laravel Sanctum Authentication package simplifies the process of implementing authentication in React applications using Laravel Sanctum as the backend authentication mechanism. By providing a set of hooks and components, it allows developers to focus on building their application's user interface while handling authentication seamlessly in the background.
