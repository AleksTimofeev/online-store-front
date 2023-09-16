import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsApi, ProductType} from "../../api/productsApi";
import axios from "axios";

export const getProducts = createAsyncThunk<ProductType[], undefined, { rejectValue: string }>(
  'catalog', async (arg, thunkAPI) => {
    try {
      const products = await productsApi.getProducts()
      return products
    } catch (e){
      if(axios.isAxiosError(e)){
        const errorMessage = e.response ? e.response.data.message : e.message
        return thunkAPI.rejectWithValue(errorMessage)
      }
      return thunkAPI.rejectWithValue('error')
  }}
)

const slice = createSlice({
  name: 'catalog',
  initialState: {} as CatalogReducerType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {})
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
    builder.addCase(getProducts.rejected, (state, action) => {})
  }
})

export const catalogReducer = slice.reducer

type CatalogReducerType = {
  products: ProductType[]
}