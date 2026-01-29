import axios from "axios";
import { getENV } from "../helpers/getEnv";

const { VITE_API_URL } = getENV();
const wompiApi = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default wompiApi;
