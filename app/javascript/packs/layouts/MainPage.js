import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../AppContext'
import Header from './Header'

const MainPage = (props) => {

  const [state, setState] = useContext(AppContext)

  return  <div>
            <Header />
            <div className="row">
              <div className="col s12 m6 offset-m3">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">Research database query interface</span>
                  </div>
                  {
                    state.auth ? 
                    <div className="card-action">
                      <Link to="/query">Query builder</Link>
                    </div>
                    :
                    <div className="card-action">
                      <Link to="/login">Query builder</Link>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
}

export default MainPage