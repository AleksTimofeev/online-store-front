import React from 'react';
import {Banner} from "../../components/Banner/Banner";
import styles from './HomePage.module.scss'
import first from '../../assets/103.png'
import second from '../../assets/109.png'
import {CardProduct} from "../../components/CardProduct/CardProduct";

export const HomePage = () => {
  return (
    <div>
      <Banner/>
      <div className={styles.section}>
        <div className={styles.item}>
          <span>
            Lorem ipsum dolor sit amet.
          </span>
          <div className={styles.imgContainer}>
            <img src={first} alt="img"/>
          </div>
        </div>
        <div className={styles.item}>
          <span>
            Lorem ipsum dolor sit amet, consectetur.
          </span>
          <div className={styles.imgContainer}>
            <img src={second} alt="img"/>
          </div>
        </div>
      </div>
      <div className={styles.sectionProducts}>
        <h3>Новинки</h3>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
      </div>
      <div className={styles.sectionProducts}>
        <h3>Товары со скидкой</h3>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
        <div className={styles.productWrapper}>
          <CardProduct
            id={'1001'}
            imgUrlLarge={'#'}
            imgUrlSmall={'#'}
            title={'title 001'}
            description={'description 001001'}
            price={300}
            rating={77}
            minDescription={'min description'}
          />
        </div>
      </div>
    </div>
  );
}