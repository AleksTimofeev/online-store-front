import {addProductInBasket, basketReducer, BasketReducerType, getBasket, removeProductBasket} from "./basketReducer";
import {BasketType} from "../../api/basketApi";


let state: BasketReducerType

beforeEach(() => {
  state = {
    basket: null,
    removeProductStatus: [],
    changeCountProductStatus: []
  }
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

test('add product in basket/fulfilled', () => {
  const action = addProductInBasket.fulfilled(basketResponse, '', {productId: '001001'})
  const newState = basketReducer(state, action)
  expect(state.basket).toBeNull()
  expect(newState.basket).toEqual(basketResponse)
})
