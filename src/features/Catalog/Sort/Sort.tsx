import React from 'react';
import styles from './Sort.module.scss'
import {Button} from "../../../components/Button/Button";

type PropsType = {
  sort: (sort: string) => void
  option: (option: string) => void
  update: () => void
}

export const Sort: React.FC<PropsType> = ({sort, option, update}) => {

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sort(e.currentTarget.value)
  }
  const handleChangeOptionSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    option(e.currentTarget.value)
  }
  const handleUpdate = () => {
    update()
  }

  return (
    <div className={styles.wrapper}>
      <span>Сортировать: </span>
      <label>
        <select onChange={handleChangeSort}>
          <option value='asc'>По возрастанию</option>
          <option value='desc'>По убыванию</option>
        </select>
      </label>
      <label>
        <select onChange={handleChangeOptionSort}>
          <option value="rating">Рейтинг</option>
          <option value="price">Цена</option>
        </select>
      </label>
      <Button onClick={handleUpdate}>update</Button>
    </div>
  );
}