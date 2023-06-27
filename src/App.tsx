import React, {MouseEventHandler, useEffect, useState} from 'react';
import './app.css';
import {NavLink, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/store";
import {auth, login, registration} from "./components/authorization/authReducer";
import LoginPage from "./components/authorization/login/LoginPage";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    if(!isAuth){
      dispatch(auth())
    }
  },[isAuth])

  return (
    <div className="app">
      <h1>ONLINE-STORE</h1>
      <NavLink to={'login'}>login</NavLink>
      <Routes>


        <Route path={''} element={<h2>Home page</h2>} />
        <Route path={'login'} element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
