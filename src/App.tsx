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
import {Product} from "./features/Catalog/Product/Product";
import {Basket} from "./features/Basket/Basket";
import {PrivateRoute} from "./pages/PrivateRoute/PrivateRoute";
import {RegistrationPage} from "./features/auth/registration/RegistrationPage";
import {RequestStatus} from "./constants/enum";
import {ContactsPage} from "./pages/ContactsPage/ContactsPage";

function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const appStatus = useAppSelector(state => state.app.appStatus)
  useEffect(() => {
    if (!isAuth) {dispatch(auth())}
  }, [])

  return (
    <div className={styles.app}>
      <Header/>
      {appStatus === RequestStatus.SUCCEEDED && <div className={styles.body}>
        <Routes>
          <Route path={''} element={<HomePage/>}/>
          <Route path={'login'} element={<LoginPage/>}/>
          <Route path={'registration'} element={<RegistrationPage/>}/>
          <Route path={'catalog'} element={<Catalog/>}/>
          <Route path={'contacts'} element={<ContactsPage/>}/>
          <Route path={'catalog/:productId'} element={<Product/>}/>
          <Route path={'basket'} element={
            <PrivateRoute>
              <Basket/>
            </PrivateRoute>
          }/>
        </Routes>
      </div>}
      <Footer/>
    </div>
  );
}

export default App;
