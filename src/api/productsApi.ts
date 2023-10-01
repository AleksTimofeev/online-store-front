import {instance} from "./authApi";


export const productsApi = {
  getProducts() {
    return instance.get<ProductType[]>(`products`)
      .then(data => data.data)
  }
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