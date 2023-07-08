import React, {useEffect} from 'react';
import {NavLink, Route, Routes, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store/store";
import {auth, login} from "./components/authorization/authReducer";
import LoginPage from "./components/authorization/login/LoginPage";
import {Header} from "./components/Header/Header";
import styles from './App.module.scss'
import {HomePage} from "./pages/HomePage/HomePage";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import {Footer} from "./components/Footer/Footer";
import {Products} from "./pages/CatalogPage/Products/Products";
import {CardProduct} from "./pages/CatalogPage/Products/CardProduct/CardProduct";
import {ProductPage} from "./pages/ProductPage/ProductPage";

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
      <Header/>
      <div className={styles.body}>
        <Routes>
          <Route path={''} element={<HomePage/>}/>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'catalog'} element={<CatalogPage/>}>
            <Route path={':category'} element={<Products/>}>
              <Route path={'::product'} element={<ProductPage/>}/>
            </Route>

          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
