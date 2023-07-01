import React from 'react';
import styles from './Header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {basketIcon} from '../../assets/icons/basket'
import {profileIcon} from '../../assets/icons/profile'
import {Profile} from "./Profile";


export const Header = () => {

  const navigate = useNavigate()

  const handleNavigateToProfile = () => {
    navigate('/profile')
  }
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
          <Profile />
          {/*<div*/}
          {/*  className={styles.profile}*/}
          {/*  title={'Профиль'}*/}
          {/*  onClick={handleNavigateToProfile}*/}
          {/*>*/}
          {/*  {profileIcon}*/}
          {/*</div>*/}
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