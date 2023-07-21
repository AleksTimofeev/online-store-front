import React from 'react';
import {useAppSelector} from "../../store/store";
import {Navigate} from "react-router-dom";

type PropsType = {
  children: JSX.Element
}

export const PrivateRoute: React.FC<PropsType> = ({children}) => {

  const isAuth = useAppSelector(state => state.auth.isAuth)

  if(!isAuth){
    return <Navigate to={'/login'} />
  }

  return (
    <>
      {children}
    </>
  );
}