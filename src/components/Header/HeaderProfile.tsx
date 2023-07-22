import React from 'react';
import styles from './Header.module.scss'
import {profileIcon} from "../../assets/icons/profile";

import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {logout} from "../authorization/authReducer";

export const HeaderProfile = () => {

  const dispatch = useAppDispatch()
  const userName = useAppSelector(state => state.auth.user?.login)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.profile}>
      <span>{profileIcon}
      {userName}</span>
      <div className={styles.menu}>
        {userName ? <>
          <NavLink to='profile'>Профиль</NavLink>
          <span onClick={handleLogout}>Выйти</span>
        </> : <>
          <NavLink to='login'>Войти</NavLink>
          <NavLink to='registration'>Регистрация</NavLink>
        </>
        }
      </div>
    </div>
  );
}