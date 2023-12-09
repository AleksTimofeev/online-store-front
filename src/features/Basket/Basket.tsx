import React, {useEffect} from 'react';
import styles from './Basket.module.scss'
import {useAppSelector} from "../../store/store";
import {CardProductBasket} from "./CardProductBasket/CardProductBasket";
import {FinalPrice} from "./FinalPrice/FinalPrice";

export const Basket = () => {

  const basket = useAppSelector(state => state.basket.basket)
  const removeProductStatus = useAppSelector(state => state.basket.removeProductStatus)

  useEffect(() => {
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {basket && <div className={styles.inner}>
          <div className={styles.productsList}>
            {basket.products.map(pr => (
              <div className={styles.product} key={pr.id}>
                <CardProductBasket
                  {...pr}
                  removeProductStatus={
                    removeProductStatus.find(p => p.productId === pr.id) || null
                  }
                />
              </div>
            ))}
          </div>
          <div className={styles.finalPrice}>
            {basket && basket.products.length && <FinalPrice products={basket.products} />}
          </div>
        </div>}
      </div>
    </div>
  );
}