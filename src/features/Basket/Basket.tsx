import React from 'react';
import styles from './Basket.module.scss'
import {useAppSelector} from "../../store/store";
import {CardProduct} from "../../components/CardProduct/CardProduct";
import {CardProductBasket} from "./CardProductBasket/CardProductBasket";

export const Basket = () => {

  const basket = useAppSelector(state => state.auth.user?.basket)

  return (
    <div className={styles.wrapper}>
      <h2>Корзина</h2>
      {basket?.products.map(pr => (
        <CardProductBasket {...pr} />
      ))}
    </div>
  );
}