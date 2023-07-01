import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/store";
import {auth, login} from "./components/authorization/authReducer";
import LoginPage from "./components/authorization/login/LoginPage";
import {Header} from "./components/Header/Header";
import styles from './App.module.scss'
import {HomePage} from "./pages/HomePage";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const appStatus = useAppSelector(state => state.app.appStatus)

  useEffect(() => {
    if (!isAuth) {
      dispatch(auth())
    }
  }, [isAuth])

  return (
    <div className={styles.app}>
      {appStatus === 'loading' ? <div>LOADING</div> :
        <>
          <Header/>
        </>
      }
      <div className={styles.body}>
        <Routes>
          <Route path={''} element={<HomePage />}/>
          <Route path={'login'} element={<LoginPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
