import axios, {InternalAxiosRequestConfig} from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

export const authInstance = axios.create({
  baseURL: `${baseUrl}auth`
})
const authRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('my token')}`
  return config;
};

authInstance.interceptors.request.use(authRequest)