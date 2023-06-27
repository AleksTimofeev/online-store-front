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
  extraReducers: builder => {
    builder.addCase(auth.pending, (state, action) => {
      state.appStatus = 'loading'
    })
    builder.addCase(auth.fulfilled, (state, action) => {
      state.appStatus = 'idle'
    })
  }
})


export const appReducer = slice.reducer

export type AppReducerType = {
  appStatus: RequestStatusType
}