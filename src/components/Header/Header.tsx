import React from 'react';
import styles from './Header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {basketIcon} from '../../assets/icons/basket'
import {HeaderProfile} from "./HeaderProfile";


export const Header = () => {

  const navigate = useNavigate()

  const handleNavigateToBasket = () => {
    navigate('/basket')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <NavLink to={'/'}>Главная</NavLink>
          <NavLink to={'/catalog'}>Каталог</NavLink>
          <NavLink to={'/contacts'}>Контакты</NavLink>
        </nav>
        <div className={styles.userInfo}>
          <HeaderProfile />
          <div
            className={styles.basket}
            title={'Корзина'}
            onClick={handleNavigateToBasket}
          >
            {basketIcon}
          </div>
        </div>
      </div>
    </div>
  );
}