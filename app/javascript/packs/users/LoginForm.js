import React, { useContext, useState } from 'react'
import M from 'materialize-css'
import { Formik } from 'formik'
import axios from '../axios'
import * as Yup from 'yup'

import history from '../history'
import { FlashMessage } from '../helper/FlashMessage'
import { AppContext } from '../AppContext'
import setAuthToken from '../setAuthToken'

const LoginForm = (props) => {

  const [state, setState] = useContext(AppContext)

  const submit = (values) => {
    axios.post(`/v1/login`, values)
    .then((response) => {
      localStorage.clear()
      const token = response.data.token;
      try {
        localStorage.setItem('jwtToken', token)
      } catch(err) {
        throw(err)
      }
      setAuthToken(token)
      setState(state => ({auth: true, current_user: response.data}))
      history.push('/query')
      M.toast({html: "Welcome back!", displayLength: 1000, classes: "green"})
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Formik
      initialValues={{ 
        email: props.email || '', 
        password: props.password || ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        submit(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required('Email cannot be empty'),
        password: Yup.string()
          .required('Password cannot be empty'),
      })}
    >
      {props => {
        const {
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            {errors.email && touched.email && <FlashMessage props={{status: "error", msg: errors.email}} />}
            {errors.password && touched.password && <FlashMessage props={{status: "error", msg: errors.password}} />}

            <div className="row no-margin">
              <div className="input-field col m12 s12">
                <input 
                  type="text" 
                  name="email" 
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="validate"
                />
                <label htmlFor="email">Email <span className="required">*</span></label>
              </div>
            </div>

            <div className="row no-margin">
              <div className="input-field col m12 s12">
                <input 
                  type="password" 
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="validate"
                />
                <label htmlFor="password">Password <span className="required">*</span></label>
              </div>
            </div>

            <br/>
            <div className="row no-margin">
              <div className="input-field col m6 s12">
                <button type="submit" className="btn">Log in</button>
              </div>
            </div>

          </form>
        );
      }}
    </Formik>
  )
}

export default LoginForm