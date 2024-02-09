import { AxiosInstance } from "axios";
import axios from "axios";

import { useAuth } from "./AuthContext";
import useApiClient from "./useApiClient";

export function useFetchCsrfToken() {
  const fetchCsrfToken = async (path: string) => {
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
  const { setUser, config } = useAuth();
  const login = async (requestBody: object) => {
    return await BasicAuthAPIRequest(
      config?.loginUrl || "",
      requestBody,
      apiClient,
      setUser
    );
  };

  return { login };
}

export function useRegister() {
  const apiClient = useApiClient();
  const { setUser, config } = useAuth();

  const register = async (requestBody: object) => {
    return await BasicAuthAPIRequest(
      config?.registerUrl || "",
      requestBody,
      apiClient,
      setUser
    );
  };

  return { register };
}

export function useLogout() {
  const apiClient = useApiClient();
  const { setUser, config } = useAuth();

  const logout = async () => {
    try {
      await apiClient.post(config?.logoutUrl || "").then((response) => {
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
