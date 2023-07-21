import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './ProductPage.module.scss'
import {fakeData} from "../CatalogPage/CatalogPage";

export const ProductPage = () => {

  const {productId} = useParams<{productId: string }>()
  const [data, setData] = useState(fakeData.find(p => p.id === productId))

  const handleAddToBasket = () => {}

  useEffect(() => {
    //get product data
  }, [])

  return (
    <>
      {data && <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <img src={data.imgUrl} width='100%' alt="img"/>
        </div>
        <div className={styles.productDetail}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.description}>{data.description}</div>

          <div className={styles.rating}>rating product</div>
          <div className={styles.price}>{data.price}</div>
          <button onClick={handleAddToBasket}>добавить в корзину</button>

        </div>
      </div>}
    </>
  );
}