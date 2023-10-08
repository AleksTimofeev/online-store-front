import React from 'react';
import styles from './Pagination.module.scss'


type PropsType = {
  totalProductsCount: number
  changePageNumber: (currentPageNumber: number) => void
  changePageSize: (pageSize: number) => void
  pageNumber: number
  pageSize: number
  totalPagesCount: number
}

export const Pagination: React.FC<PropsType> = ({
                                                  changePageSize, changePageNumber,
                                                  pageSize, pageNumber,
                                                  totalPagesCount
                                                }) => {

  const handleChangeCurrentPage = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const targetPage = Number(e.currentTarget.id)
    if (targetPage !== pageNumber) {
      changePageNumber(Number(e.currentTarget.id))
    }
  }

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changePageSize(Number(e.currentTarget.value))
  }

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      changePageNumber(pageNumber - 1)
    }
  }
  const handleNextPage = () => {
    if (pageNumber < totalPagesCount) {
      changePageNumber(pageNumber + 1)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handlePrevPage}
        disabled={pageNumber === 1}
      >prev
      </button>
      {pageNumber - 1 > 0 &&
        <span
          id={`${pageNumber-1}`}
          onClick={handleChangeCurrentPage}
        >
          {pageNumber - 1}
        </span>
      }
      <span className={styles.activePage}>{pageNumber}</span>
      {pageNumber + 1 <= totalPagesCount &&
        <span
          id={`${pageNumber+1}`}
          onClick={handleChangeCurrentPage}
        >
          {pageNumber + 1}
        </span>}
      <button
        onClick={handleNextPage}
        disabled={pageNumber === totalPagesCount}
      >next
      </button>
      <select onChange={handleChangePageSize} value={pageSize}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </div>
  );
}