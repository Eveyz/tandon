import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AppContextProvider } from './AppContext'
import QueryDashboard from './query/QueryDashboard'
import Login from './users/Login'
import Signup from './users/Signup'
import ConceptList from './concepts/ConceptList'

const App = (props) => {
  return (
    <AppContextProvider>
      <Switch>
        <Route exact path="/" component={QueryDashboard}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/concepts" component={ConceptList}></Route>
      </Switch>
    </AppContextProvider>
  )
}

export default App