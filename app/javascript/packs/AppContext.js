import React, { useState } from 'react'

const AppContext = React.createContext([{}, () => {}])

const AppContextProvider = (props) => {
  const [state, setState] = useState({
    auth: true
  })
  return  <AppContext.Provider value={[state, setState]}>
            {props.children}
          </AppContext.Provider>
}

export { AppContext, AppContextProvider }