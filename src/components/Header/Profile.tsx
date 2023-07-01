import React, {useEffect, useRef, useState} from 'react';
import styles from './Header.module.scss'
import {profileIcon} from "../../assets/icons/profile";

import {useNavigate} from "react-router-dom";

export const Profile = () => {

  const navigate = useNavigate()
  const [profileMenuIsShow, setProfileMenuIsShow] = useState(false)

  const handleShowProfileMenu = () => {
    console.log('show menu')
    setProfileMenuIsShow(!profileMenuIsShow)
  }

  return (
    <div
      className={styles.profile}
      title={'Профиль'}
      onClick={handleShowProfileMenu}
    >
      {profileIcon}
      <div className={styles.menu}>
        <span>Профиль</span>
        <span>Выйти</span>
      </div>
    </div>
  );
}