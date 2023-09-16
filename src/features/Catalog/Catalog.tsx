import React, {useEffect} from 'react';
import styles from './Catalog.module.scss'
import {Pagination} from "../../components/Pagination/Pagination";
import axios from "axios";

export const Catalog = () => {

  const handleChangeCurrentPage = (currentPage: number) => {
    console.log('current page ' + currentPage)
  }
  const handleChangePageSize = (pageSize: number) => {
    console.log('page size ' + pageSize)
  }

  useEffect(() => {
    axios.get('https://online-store-zeta-sage.vercel.app/products')
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          {/*<ul className={styles.productList}>*/}
          {/*  {fakeData.map(p => (*/}
          {/*    <li key={p.id} className={styles.productWrapper}>*/}
          {/*      <CardProduct {...p} />*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
          <Pagination
            totalProductsCount={530}
            changeCurrentPage={handleChangeCurrentPage}
            changePageSize={handleChangePageSize}
          />
      </div>
    </div>
  );
}