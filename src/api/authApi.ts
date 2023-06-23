import axios from "axios";


const instance = axios.create({
  baseURL: 'https://online-store-zeta-sage.vercel.app/auth/',
})

export const authApi = {

  registration(params: RegistrationType){
    return instance.post('registration').then(data => data)
  },
  login(params: LoginType){
    return instance.post<LoginResponseType>('login').then(data => data.data.token)
  }

}

export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type LoginType = {
  email: string
  password: string
}
export type LoginResponseType = {
  token: string
}