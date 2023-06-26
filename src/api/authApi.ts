import axios, {InternalAxiosRequestConfig} from "axios";


const instance = axios.create({
  baseURL: 'https://online-store-zeta-sage.vercel.app/auth/',
})

export const authInstance = axios.create({
  baseURL: 'https://online-store-zeta-sage.vercel.app/auth/'
})
const authRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('my token')}`
  return config;
};

authInstance.interceptors.request.use(authRequest)

export const authApi = {

  registration(params: RegistrationType){
    return instance.post<RegistrationResponseType>('registration', params).then(data => data.data.token)
  },
  auth(){
    return authInstance.get('').then(data => data)
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