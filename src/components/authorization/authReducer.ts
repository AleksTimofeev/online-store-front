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

export const auth = createAsyncThunk<UserType, undefined, { rejectValue: string }>(
  'auth/auth', async (arg, thunkAPI) => {
    try {
      await authApi.auth()
      const token = localStorage.getItem('my token')
      if (token) {
        return jwtDecode<UserType>(token)
      } else {
        return thunkAPI.rejectWithValue('error')
      }
    } catch (e) {
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
      state.user = action.payload
      state.error = null
    })
    builder.addCase(registration.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.user = null
    })

    builder.addCase(auth.fulfilled, (state, action) => {
      state.user = action.payload
      state.error = null
    })
    builder.addCase(auth.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.user = null
    })
  }
})

export const authReducer = slice.reducer

export type AuthReducerType = {
  user: UserType | null
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