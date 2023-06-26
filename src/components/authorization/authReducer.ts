import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi, LoginType, RegistrationType} from "../../api/authApi";
import jwtDecode from "jwt-decode";

export const registration = createAsyncThunk<UserType, RegistrationType, { rejectValue: string }>(
  'auth/registration', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeRequestStatus('loading'))
    try {
      const token = await authApi.registration(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeRequestStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      console.log(e)
      thunkAPI.dispatch(changeRequestStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
  }
)

export const auth = createAsyncThunk<UserType, undefined, { rejectValue: string }>(
  'auth/auth', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeRequestStatus('loading'))
    try {
      await authApi.auth()
      const token = localStorage.getItem('my token')
      if (token) {
        thunkAPI.dispatch(changeRequestStatus('idle'))
        return jwtDecode<UserType>(token)
      } else {
        thunkAPI.dispatch(changeRequestStatus('failed'))
        return thunkAPI.rejectWithValue('error')
      }
    } catch (e) {
      console.log(e)
      thunkAPI.dispatch(changeRequestStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
  }
)

export const login = createAsyncThunk<UserType, LoginType, { rejectValue: string }>(
  'auth/login', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeRequestStatus('loading'))
    try {
      const token = await authApi.login(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeRequestStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      thunkAPI.dispatch(changeRequestStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    requestStatus: 'idle'
  } as AuthReducerType,
  reducers: {
    changeRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.requestStatus = action.payload
    }
  },
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

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
      state.error = null
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.user = null
    })
  }
})

export const {changeRequestStatus} = slice.actions
export const authReducer = slice.reducer

export type AuthReducerType = {
  user: UserType | null
  error: string | null
  requestStatus: RequestStatusType
}
export type RequestStatusType = 'idle' | 'succeeded' | 'failed' | 'loading'

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