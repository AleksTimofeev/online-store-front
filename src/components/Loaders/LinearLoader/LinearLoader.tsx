import React from 'react';
import styles from './LinearLoader.module.scss'

export const LinearLoader = () => {
  return (
    <div className={styles.barContainer}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
}