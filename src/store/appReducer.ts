import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../types";
import {auth} from "../components/authorization/authReducer";


const slice = createSlice({
  name: 'app',
  initialState: {
    appStatus: 'idle'
  } as AppReducerType,
  reducers: {
    changeAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.appStatus = action.payload
    }
  },
  extraReducers: builder => {}
})

export const {changeAppStatus} = slice.actions
export const appReducer = slice.reducer

export type AppReducerType = {
  appStatus: RequestStatusType
}