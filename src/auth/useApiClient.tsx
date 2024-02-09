import axios from "axios";
import { useAuth } from "./AuthContext";

export default function useApiClient() {
  const { csrfToken, config } = useAuth();

  const apiClient = axios.create({
    baseURL: config?.baseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  apiClient.interceptors.request.use((config) => {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
    return config;
  });

  return apiClient;
}
