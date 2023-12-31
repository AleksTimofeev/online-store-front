import React from 'react';
import styles from './CardProduct.module.scss'
import {useNavigate} from "react-router-dom";
import {Rating} from "../Rating/Rating";
import {ProductType} from "../../api/productsApi";
import {Button} from "../Button/Button";
import noImg from '../../assets/noImg.jpg'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addProductInBasket} from "../../features/Basket/basketReducer";
import {RequestStatus} from "../../constants/enum";

type PropsType = {
  addProductInBasketStatus: {
    productId: string,
    productStatus: RequestStatus
  } | null
} & ProductType

export const CardProduct: React.FC<PropsType> = ({
                                                   id,
                                                   minDescription,
                                                   description,
                                                   imgUrlLarge, imgUrlSmall,
                                                   price,
                                                   title,
                                                   rating,
                                                   addProductInBasketStatus
                                                 }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  const handleGoToProduct = () => {
    navigate(`/catalog/${id}`)
  }

  const handleAddProductInBasket = () => {
    if (isAuth) {
      dispatch(addProductInBasket({productId: id}))
    } else {
      navigate('/login')
    }
  }

  return (
    <div
      className={styles.wrapper}
    >
      <div className={styles.imgContainer}
           onClick={handleGoToProduct}
      >
        <img src={imgUrlSmall.length ? imgUrlSmall : noImg} alt="img"/>
      </div>
      <div
        onClick={handleGoToProduct}
        className={styles.title}>{title}</div>
      <div className={styles.description}>
        {description}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating}/>
      </div>
      <div className={styles.price}><span>$</span><span>{price}</span></div>
      <div className={styles.button}>
        <Button
          onClick={handleAddProductInBasket}
          disabled={addProductInBasketStatus ?
            addProductInBasketStatus.productStatus === RequestStatus.LOADING:
            false
        }
        >{
          addProductInBasketStatus && addProductInBasketStatus.productStatus === RequestStatus.LOADING ?
            'Loading...' :
          'add in basket'
        }</Button>
      </div>
    </div>
  );
}