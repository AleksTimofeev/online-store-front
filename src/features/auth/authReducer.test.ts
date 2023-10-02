import {
  auth,
  authReducer,
  AuthReducerType,
  changeAuthenticationStatus,
  login,
  registration,
  UserType
} from "./authReducer";
import {RequestStatus} from "../../constants/enum";


let state = {} as AuthReducerType

beforeEach(() => {
  state = {
    authenticationStatus: RequestStatus.IDLE,
    error: null,
    isAuth: false,
    user: {
      id: '00',
      basket: {
        id: '01'
      },
      login: 'login',
      exp: 0,
      iat: 0,
      email: 'email',
      role: [
        {
        role: 'user',
        id: '02'
      }
      ]
    }
  }
})

const user = {
  id: '123123123',
  basket: {
    id: '12312313'
  },
  login: 'aleks',
  exp: 10,
  iat: 1230,
  email: 'aleks@gmail.com',
  role: [
    {
      role: 'user',
      id: '123123123'
    }
  ]
} as UserType

//ADD APP_REDUCER

test('change authentication status', () => {
  const action = changeAuthenticationStatus(RequestStatus.LOADING)
  const newState = authReducer(state, action)
  expect(newState.authenticationStatus).toBe(RequestStatus.LOADING)
})

test('auth/fulfilled', () => {
  const action = auth.fulfilled(user, '', undefined)
  const newState = authReducer(state, action)
  expect(newState.user).toEqual(user)
})
test('auth/rejected', () => {
  const action = auth.rejected(null, '', undefined, {message: 'error'})
  const newState = authReducer(state, action)
  expect(newState.error).toBe('error')
})

test('login/fulfilled', () => {
  const action = login.fulfilled(user, '', {email: 'email', password: 'password'})
  const newState = authReducer(state, action)
  expect(newState.user).toEqual(user)
})
test('login/rejected', () => {
  const action = login.rejected(null, '', {email: 'email', password: 'password'}, {message: 'error'})
  const newState = authReducer(state, action)
  expect(newState.error).toBe('error')
})

test('registration/fulfilled', () => {
  const action = registration.fulfilled(user, '', {email: 'email', password: 'password', login: 'login'})
  const newState = authReducer(state, action)
  expect(newState.user).toEqual(user)
})
test('registration/rejected', () => {
  const action = registration.rejected(
    null, '', {email: 'email', password: 'password', login: 'login'}, {message: 'error'}
  )
  const newState = authReducer(state, action)
  expect(newState.error).toBe('error')
})