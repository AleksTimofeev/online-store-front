import React from 'react';
import styles from './Footer.module.scss'
import {NavLink} from "react-router-dom";

export const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li>
            <NavLink to={''}>Главная</NavLink></li>
          <li>
            <NavLink to={'/catalog'}>Каталог</NavLink></li>
        </ul>
        <ul className={styles.about}>
          <li>О НАС</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi deserunt dolores excepturi
            laudantium? Aliquam asperiores cum facilis quisquam sit.
          </li>
        </ul>
        <ul className={styles.contacts}>
          <li><h3>CONTACTS</h3></li>
          <li>
            <span>Адрес:</span>
            <span>Minsk</span>
          </li>
          <li>
            <span>Телефон:</span>
            <span>+375 33 33333333</span>
          </li>
          <li>
            <span>Email:</span>
            <span>email@email.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
}