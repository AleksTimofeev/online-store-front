import React from 'react';
import styles from './Header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {basketIcon} from '../../assets/icons/basket'
import {HeaderProfile} from "./HeaderProfile";
import {LinearPreloader} from "../LinearPreloader/LinearPreloader";
import {useAppSelector} from "../../store/store";


export const Header = () => {

  const navigate = useNavigate()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const handleNavigateToBasket = () => {
    navigate('/basket')
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <nav className={styles.navigation}>
            <NavLink to={'/'}>Главная</NavLink>
            <NavLink to={'/catalog/all'}>Каталог</NavLink>
            <NavLink to={'/contacts'}>Контакты</NavLink>
          </nav>
          <div className={styles.userInfo}>
            <HeaderProfile/>
            <div
              className={styles.basket}
              title={'Корзина'}
              onClick={handleNavigateToBasket}
            >
              {basketIcon}
            </div>
          </div>
        </div>
        <div className={styles.preloader}>
          {appStatus === 'loading' && <LinearPreloader/>}
        </div>
      </div>
    </>
  );
}