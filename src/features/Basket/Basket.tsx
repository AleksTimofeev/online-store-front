import React from 'react';
import styles from './Basket.module.scss'
import {useAppSelector} from "../../store/store";
import {CardProductBasket} from "./CardProductBasket/CardProductBasket";

export const Basket = () => {

  const basket = useAppSelector(state => state.basket.basket)

  return (
    <div className={styles.wrapper}>
      <h2>Корзина</h2>
      {basket && <div className={styles.productsList}>
        {basket.products.map(pr => (
          <div className={styles.product} key={pr.id}>
            <CardProductBasket {...pr} />
          </div>
        ))}
      </div>}
    </div>
  );
}