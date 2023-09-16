import {createSlice} from "@reduxjs/toolkit";


const slice = createSlice({
  name: 'catalog',
  initialState: {} as CatalogReducerType,
  reducers: {},
  extraReducers: builder => {}
})

export const catalogReducer = slice.reducer

type CatalogReducerType = {
  products: []
}