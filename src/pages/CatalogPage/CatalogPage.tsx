import React, {useEffect} from 'react';
import styles from './CatalogPage.module.scss'
import {NavLink, Outlet, useLocation, useParams} from "react-router-dom";

export const CatalogPage = () => {


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <NavLink to={'all'}>all</NavLink>
          <NavLink to={'men'}>men</NavLink>
          <NavLink to={'women'}>women</NavLink>
        </div>

        <Outlet/>
      </div>
    </div>
  );
}