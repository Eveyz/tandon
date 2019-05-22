import React, { useContext, useState } from 'react'
import M from 'materialize-css'
import { Formik } from 'formik'
import axios from '../axios'
import * as Yup from 'yup'

import { FlashMessage } from '../helper/FlashMessage'
import { AppContext } from '../AppContext'
import setAuthToken from '../setAuthToken'

const SignupForm = (props) => {

  const [state, setState] = useContext(AppContext)

  const submit = (values) => {
    axios.post(`/v1/signup`, values)
    .then((response) => {
      localStorage.clear()
      const token = response.data.token
      try {
        localStorage.setItem('jwtToken', token)
      } catch(err) {
        throw(err)
      }
      setAuthToken(token)
      setState(state => ({auth: true, current_user: response.data}))
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Formik
      initialValues={{ 
        email: props.email || '', 
        password: props.password || '',
        password_confirmation: props.password_confirmation || ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        submit(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email format not right')
          .required('Email cannot be blank'),
        password: Yup.string().min(6, 'password min lenth should be 6 characters').required('Password cannot be blank'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Password is different').required('Please confirm your password')
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
            {errors.password_confirmation && touched.password_confirmation && <FlashMessage props={{status: "error", msg: errors.password_confirmation}} />}

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

            <div className="row no-margin">
              <div className="input-field col m12 s12">
                <input 
                  type="password" 
                  name="password_confirmation"
                  id="password_confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="validate"
                />
                <label htmlFor="password_confirmation">Password Confirmation <span className="required">*</span></label>
              </div>
            </div>

            <br/>
            <div className="row no-margin">
              <div className="input-field col m6 s12">
                <button type="submit" className="btn">Sign up</button>
              </div>
            </div>

          </form>
        );
      }}
    </Formik>
  )
}

export default SignupForm