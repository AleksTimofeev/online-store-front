import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi, LoginType, RegistrationType} from "../../api/authApi";
import jwtDecode from "jwt-decode";

export const registration = createAsyncThunk<UserType, RegistrationType, { rejectValue: string }>(
  'auth/registration', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeRegistrationRequestStatus('loading'))
    try {
      const token = await authApi.registration(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeRegistrationRequestStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      console.log(e)
      thunkAPI.dispatch(changeRegistrationRequestStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
  }
)

export const auth = createAsyncThunk<UserType, undefined, { rejectValue: string }>(
  'auth/auth', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthRequestStatus('loading'))
    try {
      await authApi.auth()
      const token = localStorage.getItem('my token')
      if (token) {
        thunkAPI.dispatch(changeAuthRequestStatus('idle'))
        return jwtDecode<UserType>(token)
      } else {
        thunkAPI.dispatch(changeAuthRequestStatus('failed'))
        return thunkAPI.rejectWithValue('error')
      }
    } catch (e) {
      console.log(e)
      thunkAPI.dispatch(changeAuthRequestStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
  }
)

export const login = createAsyncThunk<UserType, LoginType, { rejectValue: string }>(
  'auth/login', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeLoginRequestStatus('loading'))
    try {
      const token = await authApi.login(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeLoginRequestStatus('idle'))
      thunkAPI.dispatch(changeAuthRequestStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      thunkAPI.dispatch(changeLoginRequestStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isAuth: false,
    requestAuthStatus: 'idle',
    requestLoginStatus: 'idle',
    requestRegistrationStatus: 'idle'
  } as AuthReducerType,
  reducers: {
    changeAuthRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.requestAuthStatus = action.payload
    },
    changeLoginRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.requestLoginStatus = action.payload
    },
    changeRegistrationRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.requestRegistrationStatus = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.error = null
    })
    builder.addCase(registration.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.user = null
      state.isAuth = false
    })

    builder.addCase(auth.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.error = null
    })
    builder.addCase(auth.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.isAuth = false
      state.user = null
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.error = null
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) state.error = action.payload
      state.isAuth = false
      state.user = null
    })
  }
})

export const {changeAuthRequestStatus, changeLoginRequestStatus, changeRegistrationRequestStatus} = slice.actions
export const authReducer = slice.reducer

export type AuthReducerType = {
  user: UserType | null
  error: string | null
  isAuth: boolean
  requestAuthStatus: RequestStatusType
  requestLoginStatus: RequestStatusType
  requestRegistrationStatus: RequestStatusType
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
    products: ProductType[]
  }
  iat: number
  exp: number
}
export type ProductType = any