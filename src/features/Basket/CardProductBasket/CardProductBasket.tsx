import React, {useState} from 'react';
import {ProductType} from "../../../api/productsApi";
import styles from './CardProductBasket.module.scss'

type PropsType = {} & ProductType

export const CardProductBasket: React.FC<PropsType> = ({
                                                         title,
                                                         price,
                                                         description,
                                                         rating,
                                                         minDescription,
                                                         imgUrlLarge,
                                                         imgUrlSmall,
                                                         id
                                                       }) => {

  const handleChangeCount = () => {

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={imgUrlSmall} alt="img"/>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{minDescription}</div>
        <div className={styles.price}>{price}</div>
      </div>
    </div>
  );
}