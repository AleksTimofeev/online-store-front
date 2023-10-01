import axios from "axios";
import {authInstance} from "./authInstance";

const baseUrl = process.env.REACT_APP_BASE_URL

export const instance = axios.create({
  baseURL: `${baseUrl}`,
})


export const authApi = {

  registration(params: RegistrationType){
    return instance.post<RegistrationResponseType>('auth/registration', params)
      .then(data => data.data.token)
  },
  auth(){
    return authInstance.get('auth').then(data => data)
  },
  login(params: LoginType){
    return instance.post<LoginResponseType>('auth/login', params)
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