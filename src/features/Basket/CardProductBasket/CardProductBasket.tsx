import React, {useState} from 'react';
import {ProductType} from "../../../api/productsApi";
import styles from './CardProductBasket.module.scss'
import {useAppDispatch} from "../../../store/store";
import {removeProductBasket} from "../basketReducer";
import {Button} from "../../../components/Button/Button";
import noImg from '../../../assets/noImg.jpg'

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
        <img src={imgUrlSmall || noImg} alt="img"/>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{minDescription}</div>
        <div className={styles.price}>$ {price}</div>
      </div>
      <Button onClick={handleRemoveProduct}>Убрать из корзины</Button>
    </div>
  );
}