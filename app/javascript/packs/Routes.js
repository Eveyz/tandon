import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppContext } from './AppContext'
import QueryDashboard from './query/QueryDashboard'
import Login from './users/Login'
import Signup from './users/Signup'
import ConceptList from './concepts/ConceptList'
import { PrivateRoute, LoginRoute } from './requireAuth'

const Routes = (props) => {
  const [state, setState] = useContext(AppContext)

  return (
    <Switch>
      <Route exact path="/" component={QueryDashboard}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <LoginRoute exact path="/login" auth={state} component={Login} />
      <PrivateRoute exact path="/concepts" auth={state} component={ConceptList} />
    </Switch>
  )
}

export default Routes