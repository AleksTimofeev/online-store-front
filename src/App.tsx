import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/store";
import {auth, login} from "./features/auth/authReducer";
import LoginPage from "./features/auth/login/LoginPage";
import {Header} from "./components/Header/Header";
import styles from './App.module.scss'
import {HomePage} from "./pages/HomePage/HomePage";
import {Catalog} from "./features/Catalog/Catalog";
import {Footer} from "./components/Footer/Footer";
import {Product} from "./features/Product/Product";
import {Basket} from "./features/Basket/Basket";
import {PrivateRoute} from "./pages/PrivateRoute/PrivateRoute";
import {RegistrationPage} from "./features/auth/registration/RegistrationPage";
import {getBasket} from "./features/Basket/basketReducer";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const basketId = useAppSelector(state => state.auth.user?.basket.id)

  useEffect(() => {
    if (!isAuth) {dispatch(auth())}
    if (isAuth && basketId) {dispatch(getBasket({id: basketId}))}
  }, [isAuth])

  return (
    <div className={styles.app}>
      <Header/>
      <div className={styles.body}>
        <Routes>
          <Route path={''} element={<HomePage/>}/>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'registration'} element={<RegistrationPage/>}/>
          <Route path={'catalog'} element={<Catalog/>}/>
          <Route path={'catalog/:productId'} element={<Product/>}/>
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
