import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi, RegistrationType} from "../../api/authApi";
import jwtDecode from "jwt-decode";

export const registration = createAsyncThunk(
  'auth/registration', async (arg: RegistrationType) => {
    try {
      const token = await authApi.registration(arg)
      localStorage.setItem('my token', token)
      return jwtDecode<UserType>(token)
    } catch (e) {
      console.log(e)
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {} as AuthReducerType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload) state.user = action.payload
    })
  }
})

export const authReducer = slice.reducer

export type AuthReducerType = {
  user: UserType
}

export type UserType = {
  login: string
  email: string
  id: string
  role: {
    id: string
    role: string
  }
  basket: {
    id: string
    product: ProductType[]
  }
  iat: number
  exp: number
}
export type ProductType = any