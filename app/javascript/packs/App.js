import React from 'react'
import { Route, Switch } from 'react-router-dom'

import QueryDashboard from './query/QueryDashboard'

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={QueryDashboard}></Route>
        </Switch>
      </div>
    )
  }
}

export default App