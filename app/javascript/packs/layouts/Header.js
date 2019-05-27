import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import { AppContext } from '../AppContext'
import setAuthToken from '../setAuthToken'
import history from '../history'

const Header = (props) => {
  const { classes } = props

  const [state, setState] = useContext(AppContext)
  const [auth, setAuth] = useState()
  const [anchorEl, setAnchorEl] = useState(null)

  function handleClose() {
    setAnchorEl(null)
  }

  const handleMenu = e => {
    setAnchorEl(e.currentTarget)
  }

  const logout = () => {
    localStorage.clear()
    setAuthToken(false)
    history.push("/")
    setState(state => ({auth: false, current_user: null}))
    M.toast({html: "log out successfully", classes: "green", displayLength: 1000})
  }

  return  <nav>
            <div className="nav-wrapper teal">
              <Link to={"/"} className="brand-logo" style={{paddingLeft: "24px"}}>Pt Reasearch</Link>
              <ul className="right hide-on-med-and-down">
              {state.auth ? 
                  <React.Fragment>
                    <li><Link to={"/query"}>Query</Link></li>
                    <li><Link to={"/databases"}>Databases</Link></li>
                    <li><Link to={"/concepts"}>Concepts</Link></li>
                    <li><Link to={"/domains"}>Domains</Link></li>
                    <li><Link to={"/variables"}>Variables</Link></li>
                    <li><a href="javascript:;" onClick={logout}>Logout</a></li>
                  </React.Fragment>
                  : 
                  <React.Fragment>
                    <li><Link to={"/signup"}>Signup</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                  </React.Fragment>
                }
              </ul>
            </div>
          </nav>
}

export default Header