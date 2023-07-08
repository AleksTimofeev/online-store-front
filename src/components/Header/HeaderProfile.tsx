import React from 'react';
import styles from './Header.module.scss'
import {profileIcon} from "../../assets/icons/profile";

import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {logout} from "../authorization/authReducer";

export const HeaderProfile = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userName = useAppSelector(state => state.auth.user?.login)

  const handleLogout = () => {
    dispatch(logout())
  }
  const handleGoToProfile = () => {
    if(userName){
      navigate('/profile')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className={styles.profile}>
      <span>{profileIcon}
      {userName}</span>
      <div className={styles.menu}>
        <span onClick={handleGoToProfile}>Профиль</span>
        <span onClick={handleLogout}>Выйти</span>
      </div>
    </div>
  );
}