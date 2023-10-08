import React, {useEffect, useState} from 'react';
import styles from './Catalog.module.scss'
import {Pagination} from "../../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getProducts} from "./catalogReducer";
import {CardProduct} from "../../components/CardProduct/CardProduct";

export const Catalog = () => {

  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.catalog.products)
  const productStatus = useAppSelector(state => state.catalog.productStatus)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState(1)
  const [totalPagesCount, setTotalPagesCount] = useState(Math.ceil(products.totalCount / pageSize))

  const handleChangePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }
  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    setTotalPagesCount(Math.ceil(products.totalCount / pageSize))
  }

  useEffect(() => {
    dispatch(getProducts({pageSize, pageNumber}))
  }, [pageNumber, pageSize])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <ul className={styles.productList}>
            {products && products.products.map(p => (
              <li key={p.id} className={styles.productWrapper}>
                <CardProduct
                  addProductInBasketStatus={productStatus.find(pr => pr.productId === p.id) || null}
                  {...p} />
              </li>
            ))}
          </ul>
          <Pagination
            totalPagesCount={totalPagesCount}
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalProductsCount={products.totalCount}
            changePageNumber={handleChangePageNumber}
            changePageSize={handleChangePageSize}
          />
      </div>
    </div>
  );
}