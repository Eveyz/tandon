import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const LoginRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    !auth.auth ? <Component {...props} /> : <Redirect to='/' />
  )} />
)

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.auth ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

// export const AdminRoute = ({component: Component, state, ...rest}) => (
//   <Route {...rest} render={(props) => {
//     const dateNow = new Date()
//     return state.auth && state.current_user.identity === "admin" 
//     ? auth.user.exp - (dateNow.getTime()/1000) >= 0 
//     ? <Component {...props} /> : <Redirect to='/login' /> 
//     : <Redirect to='/' />
//   }} />
// )