import React, { useState, useEffect } from 'react'

import ConceptItem from './ConceptItem'
import ConceptListSearch from './ConceptListSearch'

const ConceptListContainer = (props) => {

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
              mode === "BROWSE" ?
              <ul className="concepts-list">
                {
                  props.data["root"].map((c, idx) => {
                    return <ConceptItem key={idx} totalConcepts={props.data} concept={c} addConcept={props.addConcept} />
                  })
                }
              </ul>
              :
              <ConceptListSearch addConcept={props.addConcept} />
              : 
              <div className="card">
                <div className="card-content">
                  <div className="progress">
                    <div className="indeterminate"></div>
                  </div>
                </div>
              </div>
            }
          </div>
}

export default ConceptListContainer