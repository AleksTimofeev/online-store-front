import {instance} from "./authApi";




export const productsApi = {
  getProducts(param: GetProductsRequestType) {
    const {pageNumber, pageSize, sort, optionSort} = param
    return instance.get<GetProductsResponseType>(
      `products?page-number=${pageNumber}&page-size=${pageSize}&sort=${sort}&option=${optionSort}`
    )
      .then(data => data.data)
  },
  getProductById(productId: string){
    return instance.get<ProductType>(`products/${productId}`)
      .then(data => data.data)
  }
}

export type GetProductsRequestType = {
  pageNumber: number
  pageSize: number
  sort?: string
  optionSort?: string
}
export type GetProductsResponseType = {
  products: ProductType[]
  totalCount: number
}
export type ProductType = {
  id: string
  title: string
  description: string
  minDescription: string
  rating: number
  price: number
  imgUrlLarge: string
  imgUrlSmall: string
}