import axios, { AxiosError } from "axios";
import { getENV } from "../helpers/getEnv";

const { VITE_API_URL } = getENV();

const wompiApi = axios.create({
  baseURL: VITE_API_URL || "http://localhost:3000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});


wompiApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {

      const data = error.response.data;
      errorMessage = data?.message || data?.error || `Error ${error.response.status}`;
    } else if (error.request) {

      errorMessage = "No response from server. Please check your connection.";
    } else {

      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  },
);

export default wompiApi;
