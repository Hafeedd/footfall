import axios from "axios";
import { ErrorToast } from "../../components/CustomToast.js";

const resetAuthAndRedirect = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userDetails");
  setTimeout(() => {
    window.location.href = "/login";
  }, 2500);
};

const createAxiosInstance = (baseURL, withAuth = false) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (withAuth) {
    // Request interceptor for auth token
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.authorization = `${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Response interceptor with error handling
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const { response } = error;

      // Handle 401 unauthorized
      if (response?.status === 401) {
        // Skip redirect for signout endpoints
        if (!/signout/.test(response?.config?.url)) {
          resetAuthAndRedirect();
        }
      }

      // Show error toast for non-401 errors
      if (response?.status !== 401 && !/signout/.test(response?.config?.url)) {
        const errorMessage = response?.data?.message?.[0] || "Request failed";
        ErrorToast.fire({ title: errorMessage, icon: "error" });
      }

      // Return consistent error format
      return Promise.reject({
        message: response?.data?.message?.[0] || "Request Failed!",
        status: response?.status,
        data: response?.data,
      });
    }
  );

  instance.defaults.timeout = 300000;

  return instance;
};

export default createAxiosInstance;
