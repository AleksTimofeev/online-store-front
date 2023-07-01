import React from 'react';
import banner from '../../assets/banner1.png'
import styles from './Banner.module.scss'

export const Banner = () => {
  return (
    <div className={styles.imgContainer}>
      <img src={banner} alt={'img'}/>
    </div>
  );
}