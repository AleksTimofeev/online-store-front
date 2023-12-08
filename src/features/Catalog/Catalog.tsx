import React, {useEffect, useState} from 'react';
import styles from './Catalog.module.scss'
import {Pagination} from "../../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getProducts} from "./catalogReducer";
import {CardProduct} from "../../components/CardProduct/CardProduct";
import {Sort} from "./Sort/Sort";

export const Catalog = () => {

  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.catalog.products)
  const productStatus = useAppSelector(state => state.catalog.productStatus)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPagesCount, setTotalPagesCount] = useState(Math.ceil(products.totalCount / pageSize))
  const [sort, setSort] = useState('asc')
  const [optionSort, setOptionSort] = useState('rating')

  const handleChangePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }
  const handleChangePageSize = (pageSize: number) => {
    setPageSize(pageSize)
    setTotalPagesCount(Math.ceil(products.totalCount / pageSize))
  }
  const handleSort = (sort: string) => {
    setSort(sort)
  }
  const handleOptionSort = (option: string) => {
    setOptionSort(option)
  }
  const handleUpdate = () => {
    dispatch(getProducts({pageSize, pageNumber, sort, optionSort}))
  }

  useEffect(() => {
    dispatch(getProducts({pageSize, pageNumber, sort, optionSort}))
  }, [pageNumber, pageSize])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Sort sort={handleSort} option={handleOptionSort} update={handleUpdate} />
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