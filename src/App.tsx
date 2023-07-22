import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/store";
import {auth, login} from "./components/authorization/authReducer";
import LoginPage from "./components/authorization/login/LoginPage";
import {Header} from "./components/Header/Header";
import styles from './App.module.scss'
import {HomePage} from "./pages/HomePage/HomePage";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import {Footer} from "./components/Footer/Footer";
import {ProductPage} from "./pages/ProductPage/ProductPage";
import {Basket} from "./pages/Basket/Basket";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import {RegistrationPage} from "./components/authorization/registration/RegistrationPage";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    if (!isAuth) {
      dispatch(auth())
    }
  }, [isAuth])

  return (
    <div className={styles.app}>
      <Header/>
      <div className={styles.body}>
        <Routes>
          <Route path={''} element={<HomePage/>}/>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'registration'} element={<RegistrationPage/>}/>
          <Route path={'catalog'} element={<CatalogPage/>}/>
          <Route path={'catalog/:productId'} element={<ProductPage/>}/>
          <Route path={'basket'} element={
            <PrivateRoute>
              <Basket/>
            </PrivateRoute>
          }/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
