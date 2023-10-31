import {addProductInBasket, basketReducer, BasketReducerType, getBasket, removeProductBasket} from "./basketReducer";
import {BasketType} from "../../api/basketApi";
import {RequestStatus} from "../../constants/enum";
import {catalogReducer, CatalogReducerType} from "../Catalog/catalogReducer";


let state: BasketReducerType
let catalogState = {
  products: {
    products: [
      {
        id: '001001',
        title: 'string',
        description: 'string',
        minDescription: 'string',
        rating: 4,
        price: 400,
        imgUrlLarge: 'string',
        imgUrlSmall: 'string',
      },
      {
        id: 'string1',
        title: 'string',
        description: 'string',
        minDescription: 'string',
        rating: 4,
        price: 400,
        imgUrlLarge: 'string',
        imgUrlSmall: 'string',
      },
      {
        id: 'string2',
        title: 'string',
        description: 'string',
        minDescription: 'string',
        rating: 4,
        price: 400,
        imgUrlLarge: 'string',
        imgUrlSmall: 'string',
      }
    ],
    totalCount: 20
  },
  currentProduct: null,
  productStatus: [
    {
      productId: '112112',
      productStatus: RequestStatus.LOADING
    }
  ]
}as CatalogReducerType

beforeEach(() => {
  state = {
    basket: null,
    removeProductStatus: [],
    changeCountProductStatus: []
  }
  // catalogState = {
  //   products: {
  //     products: [
  //       {
  //         id: '001001',
  //         title: 'string',
  //         description: 'string',
  //         minDescription: 'string',
  //         rating: 4,
  //         price: 400,
  //         imgUrlLarge: 'string',
  //         imgUrlSmall: 'string',
  //       },
  //       {
  //         id: 'string1',
  //         title: 'string',
  //         description: 'string',
  //         minDescription: 'string',
  //         rating: 4,
  //         price: 400,
  //         imgUrlLarge: 'string',
  //         imgUrlSmall: 'string',
  //       },
  //       {
  //         id: 'string2',
  //         title: 'string',
  //         description: 'string',
  //         minDescription: 'string',
  //         rating: 4,
  //         price: 400,
  //         imgUrlLarge: 'string',
  //         imgUrlSmall: 'string',
  //       }
  //     ],
  //     totalCount: 20
  //   },
  //   currentProduct: null,
  //   productStatus: []
  // }
})
const basketResponse: BasketType ={
    id: '001001',
    products: [
      {
        id: 'string',
        title: 'string',
        description: 'string',
        minDescription: 'string',
        rating: 4,
        price: 120,
        imgUrlLarge: 'string',
        imgUrlSmall: 'string',
      },
      {
        id: 'string1',
        title: 'string1',
        description: 'string1',
        minDescription: 'string1',
        rating: 41,
        price: 1210,
        imgUrlLarge: 'string1',
        imgUrlSmall: 'string1',
      },
      {
        id: 'string12',
        title: 'string12',
        description: 'string12',
        minDescription: 'string12',
        rating: 412,
        price: 12012,
        imgUrlLarge: 'string12',
        imgUrlSmall: 'string12',
      },
    ]
}

test('get basket/fulfilled', () => {
  const action = getBasket.fulfilled(basketResponse, '', {id: '001001'})
  const newState = basketReducer(state, action)
  expect(state.basket).toBeNull()
  expect(newState.basket).toEqual(basketResponse)
})

test('add product in basket/pending', () => {
  const action = addProductInBasket.pending('', {productId: '001001'})
  const newState = catalogReducer(catalogState, action)
  expect(newState.productStatus.length).toBe(2)
  expect(newState.productStatus[1].productId).toBe('001001')
})
test('add product in basket/fulfilled', () => {
  const action = addProductInBasket.fulfilled(basketResponse, '', {productId: '001001'})
  const newState = basketReducer(state, action)
  expect(state.basket).toBeNull()
  expect(newState.basket).toEqual(basketResponse)

  const newCatalogState = catalogReducer(catalogState, action)
  expect(newCatalogState.productStatus.length).toBe(1)
})
test('add product in basket/rejected', () => {
  const action = addProductInBasket.rejected(null, '', {productId: '112112'})
  const newState = catalogReducer(catalogState, action)
  expect(newState.productStatus[0].productStatus).toBe(RequestStatus.FAILED)
})

test('remove product basket/pending', () => {
  const action = removeProductBasket.pending('', {productId: 'string'}, '')
  const newState = basketReducer(state, action)
  expect(newState.removeProductStatus.length).toBe(1)
  expect(newState.removeProductStatus[0].productId).toBe('string')
  expect(newState.removeProductStatus[0].productStatus).toBe(RequestStatus.LOADING)
})
// test('remove product basket/fulfilled', () => {
//   const action = removeProductBasket.fulfilled(basketResponse, '', {productId: ''})
//   const newState = basketReducer(state, action)
//   expect(newState.removeProductStatus.length).toBe(1)
//   expect(newState.removeProductStatus[0].productId).toBe('string')
//   expect(newState.removeProductStatus[0].productStatus).toBe(RequestStatus.LOADING)
// })