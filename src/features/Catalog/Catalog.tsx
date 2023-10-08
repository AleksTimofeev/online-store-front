import React, {useEffect} from 'react';
import styles from './Catalog.module.scss'
import {Pagination} from "../../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getProducts} from "./catalogReducer";
import {CardProduct} from "../../components/CardProduct/CardProduct";

export const Catalog = () => {

  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.catalog.products)
  const productStatus = useAppSelector(state => state.catalog.productStatus)

  const handleChangeCurrentPage = (currentPage: number) => {
    console.log('current page ' + currentPage)
  }
  const handleChangePageSize = (pageSize: number) => {
    console.log('page size ' + pageSize)
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <ul className={styles.productList}>
            {products && products.map(p => (
              <li key={p.id} className={styles.productWrapper}>
                <CardProduct
                  addProductInBasketStatus={productStatus.find(pr => pr.productId === p.id) || null}
                  {...p} />
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
  );
}