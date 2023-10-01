import React, {useState} from 'react';
import {ProductType} from "../../../api/productsApi";
import styles from './CardProductBasket.module.scss'
import {useAppDispatch} from "../../../store/store";
import {removeProductBasket} from "../basketReducer";

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

  const dispatch = useAppDispatch()

  const handleChangeCount = () => {

  }

  const handleRemoveProduct = () => {
    dispatch(removeProductBasket({productId: id}))
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
      <button onClick={handleRemoveProduct}>Убрать из корзины</button>
    </div>
  );
}