import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../constants/types";
import {RequestStatus} from "../constants/enum";


const slice = createSlice({
  name: 'app',
  initialState: {
    appStatus: RequestStatus.IDLE
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