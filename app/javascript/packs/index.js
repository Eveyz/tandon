import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Router, Route } from 'react-router-dom'
import App from './App'
import history from './history'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={history}>
      <Route path="/" component={App}></Route>
    </Router>,
    document.getElementById('app'),
  )
})
