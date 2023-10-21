import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GetProductsResponseType, productsApi, GetProductsRequestType, ProductType} from "../../api/productsApi";
import {isAxiosError} from "axios";
import {addProductInBasket} from "../Basket/basketReducer";
import {RequestStatus} from "../../constants/enum";

export const getProducts = createAsyncThunk<GetProductsResponseType, GetProductsRequestType, { rejectValue: { message: string } }>(
  'catalog/getProducts', async (arg, thunkAPI) => {
    try {
      const products = await productsApi.getProducts(arg)
      return products
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

export const getProductById = createAsyncThunk<ProductType, string, { rejectValue: { message: string } }>(
  'catalog/getProductById', async (arg, thunkAPI) => {
    try {
      const product = await productsApi.getProductById(arg)
      return product
    }catch (e) {
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
  initialState: {
    products: {
      products: [],
      totalCount: 0
    },
    currentProduct: null,
    productStatus: []
  } as CatalogReducerType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
    })
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
    builder.addCase(getProducts.rejected, (state, action) => {
    })

    builder.addCase(getProductById.pending, (state, action) => {
    })
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.currentProduct = action.payload
    })
    builder.addCase(getProductById.rejected, (state, action) => {
    })

    builder.addCase(addProductInBasket.pending, (state, action) => {
      state.products.products.forEach(pr => {
        if (pr.id === action.meta.arg.productId) {
          return state.productStatus.push({productId: action.meta.arg.productId, productStatus: RequestStatus.LOADING})
        }
      })
    })
    builder.addCase(addProductInBasket.fulfilled, (state, action) => {
      state.productStatus = state.productStatus.filter(pr => pr.productId !== action.meta.arg.productId)
    })
    builder.addCase(addProductInBasket.rejected, (state, action) => {
      state.productStatus = state.productStatus.map(
        pr => pr.productId === action.meta.arg.productId ? {...pr, productStatus: RequestStatus.FAILED} : {...pr}
      )
    })
  }
})

export const catalogReducer = slice.reducer

type CatalogReducerType = {
  products: GetProductsResponseType
  currentProduct: ProductType | null
  productStatus: {
    productId: string,
    productStatus: RequestStatus
  }[]
}