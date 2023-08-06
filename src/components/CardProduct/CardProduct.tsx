import React from 'react';
import styles from './CardProduct.module.scss'
import {useNavigate} from "react-router-dom";
import {Rating} from "../Rating/Rating";

type PropsType = {
  id: string
  imgUrl: string
  title: string
  description: string
  price: number
  rating: number
}

export const CardProduct: React.FC<PropsType> = ({
                                                   id,
                                                   imgUrl,
                                                   description,
                                                   price,
                                                   title,
  rating
                                                 }) => {

  const navigate = useNavigate()

  const handleGoToProduct = () => {
    navigate(`/catalog/${id}`)
  }

  return (
    <div
      className={styles.wrapper}
      onClick={handleGoToProduct}
    >
      <div className={styles.imgContainer}>
        <img src={imgUrl} width='200' height='200' alt="img"/>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>
        {description}
      </div>
      <Rating rating={rating} />
      <div className={styles.price}><span>$</span><span>{price}</span></div>
    </div>
  );
}