import React, {useEffect} from 'react';
import styles from './CardProduct.module.scss'
import {useNavigate} from "react-router-dom";
import {Rating} from "../Rating/Rating";
import {ProductType} from "../../api/productsApi";
import {Button} from "../Button/Button";
import axios from "axios";

type PropsType = {} & ProductType

export const CardProduct: React.FC<PropsType> = ({
                                                   id,
                                                   minDescription,
                                                   description,
                                                   imgUrlLarge, imgUrlSmall,
                                                   price,
                                                   title,
                                                   rating
                                                 }) => {

  const navigate = useNavigate()

  const handleLoadImg = () => {
    console.log('load img')
  }

  const handleGoToProduct = () => {
    navigate(`/catalog/${id}`)
  }

  return (
    <div
      className={styles.wrapper}
    >
      <div className={styles.imgContainer}>
        <img onLoad={handleLoadImg} src={imgUrlSmall} alt="img"/>
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
        <Button>add in basket</Button>
      </div>
    </div>
  );
}