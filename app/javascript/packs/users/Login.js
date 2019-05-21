import React from 'react'

import Header from '../layouts/Header'
import LoginForm from './LoginForm'

const Login = (props) => {
  return  <div>
            <Header />
            <div className="container">
              <div className="row">
                <div className="col s12 m8 offset-m2">
                  <div className="card">
                    <div className="card-content">
                      <span className="card-title center">Log in</span>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default Login