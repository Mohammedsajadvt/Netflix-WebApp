import axios from "axios";
import { baseUrl, API_KEY } from "../constants/Constants";

const tmdbInstance = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: API_KEY,
  },
});

export default tmdbInstance;
