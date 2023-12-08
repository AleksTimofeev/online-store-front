import React from 'react';

type PropsType = {
  sort: (sort: string) => void
  option: (option: string) => void
  update: () => void
}

export const Sort: React.FC<PropsType> = ({sort, option, update}) => {

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.currentTarget.value)
    sort(e.currentTarget.value)
  }
  const handleChangeOptionSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.currentTarget.value)
    option(e.currentTarget.value)
  }
  const handleUpdate = () => {
    // console.log('update')
    update()
  }

  return (
    <div>
      <label>
        <select onChange={handleChangeSort}>
          <option value='asc'>asc</option>
          <option value='desc'>desc</option>
        </select>
      </label>
      <label>
        <select onChange={handleChangeOptionSort}>
          <option value="rating">rating</option>
          <option value="price">price</option>
          <option value="title">title</option>
        </select>
      </label>
      <button onClick={handleUpdate}>update</button>
    </div>
  );
}