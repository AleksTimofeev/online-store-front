import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type PropsType = {} & DefaultButtonPropsType

export const Button:React.FC<PropsType> = ({...rest}) => {
  return (
    <button
      className={styles.button}
      {...rest}
    />
  );
}