import {instance} from "./authApi";




export const productsApi = {
  getProducts(param: GetProductsRequestType) {
    const {pageNumber, pageSize} = param
    return instance.get<GetProductsResponseType>(`products?page-number=${pageNumber}&page-size=${pageSize}`)
      .then(data => data.data)
  }
}

export type GetProductsRequestType = {
  pageNumber: number
  pageSize: number
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