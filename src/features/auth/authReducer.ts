import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi, LoginType, RegistrationType} from "../../api/authApi";
import jwtDecode from "jwt-decode";
import {isAxiosError} from "axios";
import {RequestStatusType} from "../../constants/types";
import {changeAppStatus} from "../../store/appReducer";
import {getBasket} from "../Basket/basketReducer";
import {RequestStatus} from "../../constants/enum";

export const registration = createAsyncThunk<UserType, RegistrationType, { rejectValue: { message: string } }>(
  'auth/registration', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthenticationStatus('loading'))
    thunkAPI.dispatch(changeAppStatus('loading'))

    try {
      const token = await authApi.registration(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeAuthenticationStatus('idle'))
      return jwtDecode<UserType>(token)
    } catch (e) {
      let errorMessage: string
      if (isAxiosError(e)) {
        errorMessage = e.response ? e.response.data.message : e.message
        return thunkAPI.rejectWithValue({message: errorMessage})
      } else {
        return thunkAPI.rejectWithValue({message: 'Что-то пошло не так.'})
      }
    }
    finally {
      thunkAPI.dispatch(changeAppStatus('idle'))
    }
  }
)

export const auth = createAsyncThunk<UserType, undefined, { rejectValue: { message: string } }>(
  'auth/auth', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthenticationStatus('loading'))
    thunkAPI.dispatch(changeAppStatus('loading'))
    try {
      await authApi.auth()
      thunkAPI.dispatch(changeIsAuth(true))
      const token = localStorage.getItem('my token')
      if (token) {
        thunkAPI.dispatch(changeAuthenticationStatus('idle'))
        const data = jwtDecode<UserType>(token)
        thunkAPI.dispatch(getBasket({id: data.basket.id}))
        thunkAPI.dispatch(changeAppStatus(RequestStatus.SUCCEEDED))
        return data
      } else {
        thunkAPI.dispatch(changeAuthenticationStatus('failed'))
        thunkAPI.dispatch(changeAppStatus(RequestStatus.SUCCEEDED))
        return thunkAPI.rejectWithValue({message: 'error'})
      }
    } catch (e) {
      let errorMessage: string
      if (isAxiosError(e)) {
        errorMessage = e.response ? e.response.data.message : e.message
        return thunkAPI.rejectWithValue({message: errorMessage})
      } else {
        return thunkAPI.rejectWithValue({message: 'Что-то пошло не так.'})
      }
    }
    finally {
      thunkAPI.dispatch(changeAuthenticationStatus('idle'))
      thunkAPI.dispatch(changeAppStatus(RequestStatus.SUCCEEDED))
    }
  }
)

export const login = createAsyncThunk<UserType, LoginType, { rejectValue: { message: string } }>(
  'auth/login', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeAuthenticationStatus('loading'))
    thunkAPI.dispatch(changeAppStatus('loading'))
    try {
      const token = await authApi.login(arg)
      localStorage.setItem('my token', token)
      thunkAPI.dispatch(changeAuthenticationStatus('idle'))
      const dataUser = jwtDecode<UserType>(token)
      thunkAPI.dispatch(getBasket({id: dataUser.basket.id}))
      return dataUser
    } catch (e) {
      let errorMessage: string
      if (isAxiosError(e)) {
        errorMessage = e.response ? e.response.data.message : e.message
        return thunkAPI.rejectWithValue({message: errorMessage})
      } else {
        return thunkAPI.rejectWithValue({message: 'Что-то пошло не так.'})
      }
    }
    finally {
      thunkAPI.dispatch(changeAppStatus(RequestStatus.SUCCEEDED))
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
    authenticationStatus: 'loading'
  } as AuthReducerType,
  reducers: {
    changeAuthenticationStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.authenticationStatus = action.payload
  },
    changeIsAuth: (state, action) => {
      state.isAuth = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.error = null
    })
    builder.addCase(registration.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message
      state.user = null
      state.isAuth = false
    })

    builder.addCase(auth.fulfilled, (state, action) => {
      state.user = action.payload
      // state.isAuth = true
      state.error = null
    })
    builder.addCase(auth.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message
      state.isAuth = false
      state.user = null
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
      state.isAuth = true
      state.error = null
    })
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message
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

export const {changeAuthenticationStatus, changeIsAuth} = slice.actions
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
  }[]
  basket: {
    id: string
    // products: ProductType[]
  }
  iat: number
  exp: number
}
export type ProductType = any