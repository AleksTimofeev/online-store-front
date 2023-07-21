import React from 'react';
import styles from './CatalogPage.module.scss'
import {CardProduct} from "../../components/CardProduct/CardProduct";
import {Pagination} from "../../components/Pagination/Pagination";
import i001 from "../../assets/productImage/001.jpg";
import i002 from "../../assets/productImage/002.jpg";
import i003 from "../../assets/productImage/003.jpg";
import i004 from "../../assets/productImage/004.jpg";
import i005 from "../../assets/productImage/005.jpg";
import i006 from "../../assets/productImage/006.jpg";
import i007 from "../../assets/productImage/007.jpg";
import i008 from "../../assets/productImage/008.jpg";
import i009 from "../../assets/productImage/009.jpg";

export const fakeData = [
  {
    id: '001',
    title: '001001',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i001,
    price: 200
  },
  {
    id: '002',
    title: '002002',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i002,
    price: 250
  },
  {
    id: '003',
    title: '003003',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i003,
    price: 200
  },
  {
    id: '004',
    title: '001004',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i004,
    price: 200
  },
  {
    id: '005',
    title: '001005',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i005,
    price: 200
  },
  {
    id: '006',
    title: '001006',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i006,
    price: 200
  },
  {
    id: '007',
    title: '001007',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i007,
    price: 200
  },
  {
    id: '008',
    title: '001008',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i008,
    price: 200
  },
  {
    id: '009',
    title: '009009',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quas.',
    imgUrl: i009,
    price: 200
  }
]

export const CatalogPage = () => {

  const handleChangeCurrentPage = (currentPage: number) => {
    console.log('current page ' + currentPage)
  }
  const handleChangePageSize = (pageSize: number) => {
    console.log('page size ' + pageSize)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.title}></div>
          <ul className={styles.productList}>
            {fakeData.map(p => (
              <li key={p.id} className={styles.productWrapper}>
                <CardProduct {...p} />
              </li>
            ))}
          </ul>
          <Pagination
            totalProductsCount={530}
            changeCurrentPage={handleChangeCurrentPage}
            changePageSize={handleChangePageSize}
          />
        </div>
      </div>
    </div>
  );
}