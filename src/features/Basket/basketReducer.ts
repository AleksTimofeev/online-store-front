import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {basketApi, BasketType} from "../../api/basketApi";

export const getBasket = createAsyncThunk<BasketType, {id: string}, {rejectValue: {message: string}}>(
  'basket/getBasket', async (arg, thunkAPI) => {
  try {
    return await basketApi.getBasket(arg.id)
  }catch (e) {
    return thunkAPI.rejectWithValue({message: 'error get basket'})
  }
})

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
  }
})

export const basketReducer = slice.reducer

type BasketReducerType = {
  basket: BasketType
}