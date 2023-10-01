import {authInstance} from "./authInstance";
import {ProductType} from "./productsApi";


export const basketApi = {
  getBasket(basketId: string){
    return authInstance.get<BasketType>(`basket/${basketId}`)
      .then(data => data.data)
  },
  addProductInBasket(productId: string){
    return authInstance.post<BasketType>(`users/addInBasket/${productId}`)
      .then(data => data.data)
  },
  removeProductInBasket<BasketType>(productId: string){
    return authInstance.delete(`users/remove-product-basket/${productId}`)
      .then(data => data.data)
  },
  changeCountProductInBasket(){}
}

export type BasketType = {
  "id": string
  "products": ProductType []
}