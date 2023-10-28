import {catalogReducer, CatalogReducerType, getProductById, getProducts} from "./catalogReducer";

let state = {} as CatalogReducerType

beforeEach(() => {
  state = {
    products: {
      products: [],
      totalCount: 0
    },
    currentProduct: null,
    productStatus: []
  }
})

const products = {
  products: [
    {
      id: 'string0',
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
}

test('get products fulfilled', () => {
  const action = getProducts.fulfilled(products, '', {pageNumber: 1, pageSize: 10})
  const newState = catalogReducer(state, action)
  expect(newState.products.products.length).toBe(3)
  expect(newState.products.totalCount).toBe(20)
})

test('get product by id fulfilled', () => {
  const action = getProductById.fulfilled(products.products[0], '', '')
  const newState = catalogReducer(state, action)
  expect(newState.currentProduct).toEqual(products.products[0])
})
