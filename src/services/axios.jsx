import axios from "axios";
import { baseUrl, API_KEY } from "../constants/Constants";

const instance = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: API_KEY,
  },
});

export default instance;
