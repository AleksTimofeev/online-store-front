import React from 'react';
import styles from './FinalPrice.module.scss'
import {Button} from "../../../components/Button/Button";
import {ProductType} from "../../../api/productsApi";

type PropsType = {
  products: ProductType[]
}

export const FinalPrice:React.FC<PropsType> = ({products}) => {

  const price = products.reduce((acc, current) => Number(acc) + Number(current.price), 0)

  return (
    <div className={styles.wrapper}>
      Итоговая сумма: {price}
      <Button>Оформить заказ</Button>
    </div>
  );
}