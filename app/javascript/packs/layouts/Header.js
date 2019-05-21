import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

const Header = (props) => {
  const { classes } = props

  const [auth, setAuth] = useState()
  const [anchorEl, setAnchorEl] = useState(null)

  function handleClose() {
    setAnchorEl(null)
  }

  const handleMenu = e => {
    setAnchorEl(e.currentTarget)
  }

  return  <div className={classes.root}>
            <AppBar>
              <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Tandon
                </Typography>
                {true && (
                  <div>
                    <IconButton
                      aria-owns={Boolean(anchorEl) ? 'menu-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </div>
}

export default withStyles(styles)(Header)