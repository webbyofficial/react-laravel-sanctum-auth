import { AxiosInstance } from "axios";
import axios from "axios";

import { UserType, useAuth } from "./AuthContext";
import useApiClient from "./useApiClient";

export function useFetchCsrfToken() {
  const apiClient = useApiClient();

  const fetchCsrfToken = async (path: string = "sanctum/csrf-cookie") => {
    await axios.get(path);
    var xsrf_token = "";
    document.cookie.split(";").forEach((cookie) => {
      if (cookie.split("=")[0].includes("XSRF-TOKEN")) {
        xsrf_token = cookie.split("=")[1].split("%")[0];
      }
    });
    return xsrf_token;
  };

  return fetchCsrfToken;
}

async function BasicAuthAPIRequest(
  path: string,
  requestBody: object,
  apiClient: AxiosInstance,
  setUser: (user: UserType) => void
) {
  try {
    return await apiClient.post(path, requestBody).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
        return { success: true };
      }
    });
  } catch (error) {
    return { success: false, error: error };
  }
}

export function useLogin() {
  const apiClient = useApiClient();
  const { setUser } = useAuth();
  const login = async (path: string = "api/login", requestBody: object) => {
    return await BasicAuthAPIRequest(path, requestBody, apiClient, setUser);
  };

  return { login };
}

export function useRegister() {
  const apiClient = useApiClient();
  const { setUser } = useAuth();

  const register = async (
    path: string = "api/register",
    requestBody: object
  ) => {
    return await BasicAuthAPIRequest(path, requestBody, apiClient, setUser);
  };

  return { register };
}

export function useLogout() {
  const apiClient = useApiClient();
  const { setUser } = useAuth();

  const logout = async (path: string = "api/logout") => {
    try {
      await apiClient.post(path).then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("user");
          setUser(null);
          return { success: true };
        }
      });
    } catch (error) {
      return { success: false, error: error };
    }
  };

  return { logout };
}
