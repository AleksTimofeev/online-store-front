import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './Product.module.scss'
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {ProductType} from "../../../api/productsApi";
import {getProductById} from "../catalogReducer";
import {Rating} from "../../../components/Rating/Rating";
import {addProductInBasket} from "../../Basket/basketReducer";
import {RequestStatus} from "../../../constants/enum";
import {Button} from "../../../components/Button/Button";

export const Product = () => {

  const dispatch = useAppDispatch()
  const {productId} = useParams<{ productId: string }>()
  const [data, setData] = useState<ProductType>()
  const product = useAppSelector(state => state.catalog.currentProduct)
  const findProduct = useAppSelector(state => state.catalog.products.products).find(item => item.id === productId)
  const productStatus = useAppSelector(state => state.catalog.productStatus)
  const handleAddToBasket = () => {
    data && dispatch(addProductInBasket({productId: data.id}))
  }

  useEffect(() => {
    if (product && product.id === productId) {
      setData(product)
    } else if (findProduct) {
      setData(findProduct)
    } else {
      productId && dispatch(getProductById(productId))
    }
  }, [product, findProduct, productId])

  return (
    <>
      {data && <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <img src={data.imgUrlSmall} width='100%' alt="img"/>
        </div>
        <div className={styles.productDetail}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.description}>{data.description}</div>
          <div className={styles.rating}>
            <span>Rating: &nbsp; </span> <Rating rating={data.rating}/>
          </div>
          <div className={styles.price}>Price: ${data.price}</div>
          <Button
            onClick={handleAddToBasket}
            disabled={productStatus.find(item => item.productId === data.id)?.productStatus === RequestStatus.LOADING}
          >
            добавить в корзину
          </Button>
        </div>
      </div>}
    </>
  );
}