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

  useEffect(() => {
    var elems = document.querySelectorAll('.dropdown-trigger')
    var instances = M.Dropdown.init(elems, {
      "alignment": 'left',
      "coverTrigger": false
    })
  }, [])

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
    M.toast({html: "Log out successfully", classes: "green", displayLength: 1000})
  }

  return  <nav>
            <div className="nav-wrapper blue-grey">
              <Link to={"/"} className="brand-logo" style={{paddingLeft: "24px"}}>EpiSurgery</Link>
              <ul className="right hide-on-med-and-down">
              {state.auth ? 
                  <React.Fragment>
                    <li><Link to={"/query"}>Query builder</Link></li>
                    <li><Link to={"/concepts"}>Concepts</Link></li>
                    <li><Link to={"/patients"}>Patients</Link></li>
                    <li><a className='dropdown-trigger' href='#' data-target='admin-menu'>Admin<i className="material-icons right" style={{marginLeft: "2px"}}>arrow_drop_down</i></a></li>
                    <li><a href="javascript:;" onClick={logout}>Logout</a></li>
                  </React.Fragment>
                  : 
                  <React.Fragment>
                    <li><Link to={"/signup"}>Signup</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                  </React.Fragment>
                }
              </ul>

              <ul id='admin-menu' className='dropdown-content'>
                <li><Link to={"/databases"}>Databases</Link></li>
                <li><Link to={"/domains"}>Domains</Link></li>
                <li><Link to={"/variables"}>Variables</Link></li>
              </ul>
            </div>
          </nav>
}

export default Header