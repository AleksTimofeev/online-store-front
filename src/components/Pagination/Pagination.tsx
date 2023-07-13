import React, {useEffect, useState} from 'react';
import styles from './Pagination.module.scss'


export const arrPrevPagesForRender = (totalPagesCount: number, currentPage: number) => {
  let arr = []
  for(let i = currentPage - 2; i < currentPage; i++ ){
    if(i > 0){
      arr.push(i)
    }
  }
  return arr
}
export const arrNextPagesForRender = (totalPagesCount: number, currentPage: number) => {
  let arr = []
  let k = 1
  for(let i = totalPagesCount; i > totalPagesCount - 2; i-- ){
    if(currentPage < i){
      arr.push(currentPage + k)
    }
    k++
  }
  return arr
}

type PropsType = {
  totalProductsCount: number
  changeCurrentPage: (currentPageNumber: number) => void
  changePageSize: (pageSize: number) => void
}

export const Pagination: React.FC<PropsType> = ({
                                                  totalProductsCount,
                                                  changePageSize, changeCurrentPage
                                                }) => {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPagesCount, setTotalPagesCount] = useState(Math.ceil(totalProductsCount / pageSize))
  const [prevPagesForRender, setPrevPagesForRender] = useState<number[]>([])
  const [nextPagesForRender, setNextPagesForRender] = useState<number[]>([])

  const pageNumberStyle = (currentPage: number, page: number) => `
  ${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}
  `

  const handleChangeCurrentPage = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const targetPage = Number(e.currentTarget.id)
    if(targetPage !== currentPage){
      setCurrentPage(Number(e.currentTarget.id))
      changeCurrentPage(Number(e.currentTarget.id))
    }
  }

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.currentTarget.value))
    changePageSize(Number(e.currentTarget.value))
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      changeCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < totalPagesCount) {
      setCurrentPage(currentPage + 1)
      changeCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (currentPage > totalPagesCount) {
      setCurrentPage(totalPagesCount)
      setTotalPagesCount(Math.ceil(totalProductsCount / pageSize))
    }
  }, [pageSize])

  useEffect(() => {
    setPrevPagesForRender(arrPrevPagesForRender(totalPagesCount, currentPage))
    setNextPagesForRender(arrNextPagesForRender(totalPagesCount, currentPage))
  },[currentPage])

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >prev
      </button>
      {prevPagesForRender.map((p,i) => (
          <span
          key={i}
          className={pageNumberStyle(currentPage, p)}
          id={p.toString()}
          onClick={handleChangeCurrentPage}
        >{p}</span>
      ))}
      <span className={styles.activePage}>{currentPage}</span>
      {nextPagesForRender.map((p,i) => (
        <span
          key={i}
          className={pageNumberStyle(currentPage, p)}
          id={p.toString()}
          onClick={handleChangeCurrentPage}
        >{p}</span>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPagesCount}
      >next
      </button>
      <select onChange={handleChangePageSize} value={pageSize}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
}