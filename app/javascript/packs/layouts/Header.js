import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import { AppContext } from '../AppContext'

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

  return  <nav>
            <div className="nav-wrapper teal">
              <Link to={"/"} className="brand-logo" style={{paddingLeft: "24px"}}>Tandon</Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to={"/concepts"}>Concepts</Link></li>
                {state.auth ? 
                  <li><Link to={"/logout"}>Logout</Link></li> 
                  : 
                  <li><Link to={"/login"}>Login</Link></li>
                }
              </ul>
            </div>
          </nav>
}

export default Header