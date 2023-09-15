import axios, {InternalAxiosRequestConfig} from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
//https://online-store-zeta-sage.vercel.app/auth/

const instance = axios.create({
  baseURL: `${baseUrl}/auth`,
})

export const authInstance = axios.create({
  baseURL: `${baseUrl}/auth`
})
const authRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('my token')}`
  return config;
};

authInstance.interceptors.request.use(authRequest)

export const authApi = {

  registration(params: RegistrationType){
    return instance.post<RegistrationResponseType>('registration', params)
      .then(data => data.data.token)
  },
  auth(){
    return authInstance.get('').then(data => data)
  },
  login(params: LoginType){
    return instance.post<LoginResponseType>('login', params)
      .then(data => data.data.token)
  }

}

export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type RegistrationResponseType = {
  token: string
}
export type LoginType = {
  email: string
  password: string
}
export type LoginResponseType = RegistrationResponseType