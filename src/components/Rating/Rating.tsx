import React from 'react';
import styles from './Rating.module.scss'
import star from '../../assets/star.png'

type PropsType = {
  rating: number
}

export const Rating: React.FC<PropsType> = ({rating}) => {

  const gradient = `
  linear-gradient(90deg, rgba(255,243,0,1) 0%, rgba(255,243,0,1) ${rating}%, rgba(255,255,255,1) ${rating}%, rgba(255,255,255,1) 100%)
  `

  return (
    <div className={styles.wrapper} style={{background: gradient}}>
      <img src={star} alt="star"/>
      <img src={star} alt="star"/>
      <img src={star} alt="star"/>
      <img src={star} alt="star"/>
      <img src={star} alt="star"/>
    </div>
  );
}