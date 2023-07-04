import React from 'react';
import styles from './LinearPreloader.module.scss'

export const LinearPreloader = () => {
  return (
    <div className={styles.barContainer}>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </div>
  );
}