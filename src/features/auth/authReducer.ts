import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi, LoginType, RegistrationType} from "../../api/authApi";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {RequestStatusType} from "../../types";
import {changeAppStatus} from "../../store/appReducer";

export const registration = createAsyncThunk<UserType, RegistrationType, { rejectValue: string }>(
  'auth/registration', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthenticationStatus('loading'))
    thunkAPI.dispatch(changeAppStatus('loading'))
    try {
      const token = await authApi.registration(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeAuthenticationStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      console.log(e)
      thunkAPI.dispatch(changeAuthenticationStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
    finally {
      thunkAPI.dispatch(changeAppStatus('idle'))
    }
  }
)

export const auth = createAsyncThunk<UserType, undefined, { rejectValue: string }>(
  'auth/auth', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthenticationStatus('loading'))
    thunkAPI.dispatch(changeAppStatus('loading'))
    try {
      await authApi.auth()
      const token = localStorage.getItem('my token')
      if (token) {
        thunkAPI.dispatch(changeAuthenticationStatus('idle'))
        return jwtDecode<UserType>(token)
      } else {
        thunkAPI.dispatch(changeAuthenticationStatus('failed'))
        return thunkAPI.rejectWithValue('error')
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        const errorMessage = e.response ? e.response.data.message : e.message
        thunkAPI.dispatch(changeAuthenticationStatus('failed'))
        return thunkAPI.rejectWithValue(errorMessage)
      }
      thunkAPI.dispatch(changeAuthenticationStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
    finally {
      thunkAPI.dispatch(changeAppStatus('idle'))
    }
  }
)

export const login = createAsyncThunk<UserType, LoginType, { rejectValue: string }>(
  'auth/login', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthenticationStatus('loading'))
    thunkAPI.dispatch(changeAppStatus('loading'))
    try {
      const token = await authApi.login(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeAuthenticationStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      console.log(e)
      thunkAPI.dispatch(changeAuthenticationStatus('failed'))
      return thunkAPI.rejectWithValue('error')
    }
    finally {
      thunkAPI.dispatch(changeAppStatus('idle'))
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout', () => {
    localStorage.removeItem('my token')
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    isAuth: false,
    authenticationStatus: 'idle'
  } as AuthReducerType,
  reducers: {
    changeAuthenticationStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.authenticationStatus = action.payload
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
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null
      state.isAuth = false
      state.user = null
    })
  }
})

export const {changeAuthenticationStatus} = slice.actions
export const authReducer = slice.reducer

export type AuthReducerType = {
  user: UserType | null
  error: string | null
  isAuth: boolean
  authenticationStatus: RequestStatusType
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
    // products: ProductType[]
  }
  iat: number
  exp: number
}
export type ProductType = any