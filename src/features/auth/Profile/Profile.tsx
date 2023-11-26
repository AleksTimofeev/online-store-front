import React from 'react';
import styles from './Profile.module.scss'
import {useAppSelector} from "../../../store/store";
import {profileIcon} from "../../../assets/icons/profile";

export const Profile = () => {
  const profileData = useAppSelector(state => state.auth.user)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {profileData && <div className={styles.inner}>
          <div className={styles.avatarContainer}>
            <span>{profileIcon}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.text}>Name: {profileData.login}</span>
            <span className={styles.text}>Email: {profileData.email}</span>
          </div>
        </div>}
      </div>
    </div>
  );
}