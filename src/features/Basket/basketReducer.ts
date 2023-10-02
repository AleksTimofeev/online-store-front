import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {basketApi, BasketType} from "../../api/basketApi";
import {isAxiosError} from "axios";

export const getBasket = createAsyncThunk<BasketType, { id: string }, { rejectValue: { message: string } }>(
  'basket/getBasket', async (arg, thunkAPI) => {
    try {
      return await basketApi.getBasket(arg.id)
    } catch (e) {
      let errorMessage: string
      if (isAxiosError(e)) {
        errorMessage = e.response ? e.response.data.message : e.message
        return thunkAPI.rejectWithValue({message: errorMessage})
      } else {
        return thunkAPI.rejectWithValue({message: 'Что-то пошло не так.'})
      }
    }
  })

export const addProductInBasket = createAsyncThunk<BasketType, { productId: string }, { rejectValue: { message: string } }>(
  'basket/addProductInBasket', async (arg, thunkAPI) => {
    try {
      return await basketApi.addProductInBasket(arg.productId)
    } catch (e) {
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

export const removeProductBasket = createAsyncThunk<BasketType, { productId: string }, { rejectValue: { message: string } }>(
  'basket/removeProductBasket', async (arg, thunkAPI) => {
    try {
      return await basketApi.removeProductInBasket(arg.productId)
    } catch (e) {
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
  name: 'basket',
  initialState: {} as BasketReducerType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBasket.pending, () => {})
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.basket = action.payload
    })
    builder.addCase(getBasket.rejected, () => {})

    builder.addCase(addProductInBasket.pending, () => {})
    builder.addCase(addProductInBasket.fulfilled, (state, action) => {
      state.basket = action.payload
    })
    builder.addCase(addProductInBasket.rejected, () => {})

    builder.addCase(removeProductBasket.pending, () => {})
    builder.addCase(removeProductBasket.fulfilled, (state, action) => {
      state.basket = action.payload
    })
    builder.addCase(removeProductBasket.rejected, () => {})
  }
})

export const basketReducer = slice.reducer

export type BasketReducerType = {
  basket: BasketType
}