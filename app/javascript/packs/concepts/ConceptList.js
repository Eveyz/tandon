import React, { useState, useEffect } from 'react'

import ConceptItem from './ConceptItem'

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
            </div>
            {
              Object.keys(props.data).length > 0 ?
              <ul>
                {
                  props.data["root"].map((c, idx) => {
                    return <ConceptItem key={idx} totalConcepts={props.data} concept={c} addConcept={props.addConcept} />
                  })
                }
              </ul>
              : 
              <div className="card">
                <div className="card-content">
                  <h6 className="center">No concepts found</h6>
                </div>
              </div>
            }
          </div>
}

export default ConceptList