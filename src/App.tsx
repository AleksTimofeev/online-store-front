import React, {MouseEventHandler, useEffect, useState} from 'react';
import './app.css';
import {NavLink, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/store";
import {auth, login, logout, registration} from "./components/authorization/authReducer";
import LoginPage from "./components/authorization/login/LoginPage";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if(!isAuth){
      dispatch(auth())
    }
  },[isAuth])

  return (
    <div className="app">
      {appStatus === 'loading' ? <div>LOADING</div> :
        <>
          <h1>ONLINE-STORE</h1>
          <NavLink to={'login'}>login</NavLink>
          <button onClick={handleLogout}>logout</button>
        </>
      }

      <Routes>


        <Route path={''} element={<h2>Home page</h2>} />
        <Route path={'login'} element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
