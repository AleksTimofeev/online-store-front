import React from 'react';
import {ProductType} from "../../../api/productsApi";
import styles from './CardProductBasket.module.scss'
import {useAppDispatch} from "../../../store/store";
import {removeProductBasket} from "../basketReducer";
import {Button} from "../../../components/Button/Button";
import noImg from '../../../assets/noImg.jpg'
import {RequestStatus} from "../../../constants/enum";

type PropsType = {
  removeProductStatus: {
  productId: string,
  productStatus: RequestStatus
} | null
} & ProductType

export const CardProductBasket: React.FC<PropsType> = ({
                                                         title,
                                                         price,
                                                         description,
                                                         rating,
                                                         minDescription,
                                                         imgUrlLarge,
                                                         imgUrlSmall,
                                                         id,
                                                         removeProductStatus
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
      <Button
        onClick={handleRemoveProduct}
        disabled={
        removeProductStatus ?
          removeProductStatus.productStatus === RequestStatus.LOADING :
          false
        }
      >Убрать из корзины</Button>
    </div>
  );
}