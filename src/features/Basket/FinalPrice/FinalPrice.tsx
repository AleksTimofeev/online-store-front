import React from 'react';
import styles from './FinalPrice.module.scss'
import {Button} from "../../../components/Button/Button";

export const FinalPrice = () => {
  return (
    <div className={styles.wrapper}>
      Итоговая сумма: xxxxxx
      <Button>Оформить заказ</Button>
    </div>
  );
}