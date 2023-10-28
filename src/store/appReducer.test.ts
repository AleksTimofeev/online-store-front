import {appReducer, AppReducerType, changeAppStatus} from "./appReducer";
import {RequestStatus} from "../constants/enum";


let state = {} as AppReducerType

beforeEach(() => {
  state = {
    appStatus: RequestStatus.IDLE
  }
})

test('change app status', () => {
  const action = changeAppStatus(RequestStatus.LOADING)
  const newState = appReducer(state, action)
  expect(newState.appStatus).toBe(RequestStatus.LOADING)
  expect(state.appStatus).toBe(RequestStatus.IDLE)
})