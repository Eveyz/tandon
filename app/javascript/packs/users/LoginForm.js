import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { FlashMessage } from '../helper/FlashMessage'

const LoginForm = (props) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const submit = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={{ 
        email: props.dataset || '', 
        password: props.dataset || ''
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