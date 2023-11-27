import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {useFormik} from "formik";
import {login, registration} from "../authReducer";
import {Navigate, useNavigate} from "react-router-dom";
import styles from './RegistrationPage.module.scss'
import {Button} from "../../../components/Button/Button";

type LoginFormType = {
  login: string
  email: string
  password: string
}

export const RegistrationPage = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const authenticationStatus = useAppSelector(state => state.auth.authenticationStatus)

  const formik = useFormik<LoginFormType>({
    initialValues: {
      login: '',
      email: '',
      password: ''
    },
    validate: values => {
      const errors = {} as LoginFormType
      if(values.login.length < 4) {
        errors.login = 'Длина логина не может быть меньше 4-ех символов.'
      }
      if (values.password.length < 4) {
        errors.password = 'Длина пароля не может быть меньше 4-ех символов.'
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неверный формат почты.'
      }
      return errors
    },
    onSubmit: () => {
      dispatch(registration(formik.values))
    }
  })

  useEffect(() => {
    if(authenticationStatus === 'idle'){
      formik.resetForm()
    }
  },[authenticationStatus])

  if (isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label htmlFor={'login'}>
          <span>Login</span>
          <input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          {formik.touched.email && formik.errors.email &&
            <span className={styles.inputError}>{formik.errors.login}</span>
          }
        </label>
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
        >Зарегистрироваться</Button>
      </form>
    </div>
  );
}