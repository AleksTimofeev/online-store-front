import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi, RegistrationType} from "../../api/authApi";
import jwtDecode from "jwt-decode";

export const registration = createAsyncThunk<UserType, RegistrationType, { rejectValue: string }>(
  'auth/registration', async (arg, thunkAPI) => {
    try {
      const token = await authApi.registration(arg)
      localStorage.setItem('my token', token)
      return jwtDecode<UserType>(token)
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('error')
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    error: null
  } as AuthReducerType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload) state.user = action.payload
    })
    builder.addCase(registration.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
    })
  }
})

export const authReducer = slice.reducer

export type AuthReducerType = {
  user: UserType
  error: string | null
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