import React from 'react'

import { AppContextProvider } from './AppContext'
import Routes from './Routes'

const App = (props) => {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  )
}

export default App