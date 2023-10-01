import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productsApi, ProductType} from "../../api/productsApi";
import axios, {isAxiosError} from "axios";

export const getProducts = createAsyncThunk<ProductType[], undefined, { rejectValue: { message: string } }>(
  'catalog', async (arg, thunkAPI) => {
    try {
      const products = await productsApi.getProducts()
      return products
    } catch (e){
      let errorMessage: string
      if (isAxiosError(e)) {
        errorMessage = e.response ? e.response.data.message : e.message
        return thunkAPI.rejectWithValue({message: errorMessage})
      } else {
        return thunkAPI.rejectWithValue({message: 'Что-то пошло не так.'})
      }
    }
  }
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