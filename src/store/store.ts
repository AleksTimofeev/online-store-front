import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/auth/authReducer";
import {appReducer} from "./appReducer";
import {catalogReducer} from "../features/Catalog/catalogReducer";


export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    catalog: catalogReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector