import axios from "axios";

import { readAuthCookie } from "../helpers/cookieHelper";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  //create instance
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//set the Auth token for any request
axiosInstance.interceptors.request.use(
  function (config) {
    const token = readAuthCookie("sessionId");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    throw new Error(err);
  }
);
