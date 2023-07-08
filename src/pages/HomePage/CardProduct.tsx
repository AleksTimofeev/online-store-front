import React from 'react';
import styles from './CardProduct.module.scss'

type PropsType = {
  imgUrl: string
  title: string
  price: number
}

export const CardProduct: React.FC<PropsType> = ({
                                                   imgUrl,
                                                   title,
                                                   price
                                                 }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={imgUrl} alt="img"/>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.price}>{price}</div>
    </div>
  );
}