import React, { useState } from 'react'

const ConceptList = (props) => {

  const [mode, setMode] = useState("BROWSE")

  const switchMode = () => {
    let _mode = mode === "BROWSE" ? "SEARCH" : "BROWSE"
    setMode(_mode)
  }

  return  <div>
            <div className="switch">
              <label>
                Browse
                <input type="checkbox" onChange={switchMode} />
                <span className="lever"></span>
                Search
              </label>
              {
                props.data.length > 0 ?
                props.data.map((c, idx) => {
                  return <div key={idx}>{c.name}</div>
                })
                : <div>No concepts found</div>
              }
            </div>
          </div>
}

export default ConceptList