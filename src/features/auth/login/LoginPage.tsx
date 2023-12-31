import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {login} from "../authReducer";
import styles from './LoginPage.module.scss'
import {Navigate} from "react-router-dom";
import {Button} from "../../../components/Button/Button";

type LoginFormType = {
  email: string
  password: string
}

const LoginPage = () => {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const authenticationStatus = useAppSelector(state => state.auth.authenticationStatus)

  const formik = useFormik<LoginFormType>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      const errors = {} as LoginFormType
      if (values.password.length < 4) {
        errors.password = 'Длина пароля не может быть меньше 4-ех символов.'
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неверный формат почты.'
      }
      return errors
    },
    onSubmit: () => {
      dispatch(login(formik.values))
    }
  })

  useEffect(() => {
    if(authenticationStatus === 'idle'){
      formik.resetForm()
    }
  },[authenticationStatus])

  useEffect(() => {
    console.log('isAuth')
  }, [isAuth])

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label htmlFor={'email'}>
          <span>Email</span>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email &&
            <span className={styles.inputError}>{formik.errors.email}</span>
          }
        </label>
        <label htmlFor={'password'}>
          <span>Password</span>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password &&
            <span className={styles.inputError}>{formik.errors.password}</span>
          }
        </label>
        <Button
          disabled={authenticationStatus === 'loading' || !!formik.errors.password || !!formik.errors.email}
          type={"submit"}
        >Войти</Button>
      </form>
    </div>
  );
};

export default LoginPage;