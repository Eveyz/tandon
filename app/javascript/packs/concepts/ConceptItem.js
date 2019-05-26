import React, { useState } from 'react'
import M from 'materialize-css'

const ConceptItem = (props) => {

  const [cls, setCls] = useState("nested")
  const subConcepts = props.totalConcepts[props.concept.name]

  const showSubConcepts = () => {
    setCls("active")
  }

  const hideSubConcepts = () => {
    setCls("nested")
  }

  const addConcept = () => {
    if(!subConcepts || subConcepts.length <= 0) {
      props.addConcept(props.concept)
    }
  }

  return  <li 
            className="concept-item" 
            onMouseEnter={showSubConcepts} 
            onMouseLeave={hideSubConcepts}
            onClick={addConcept}
          >
            {props.concept.display_name}
            {
              subConcepts && subConcepts.length > 0 ?
              <ul className={cls + " concepts-list"}>
                {
                  subConcepts.map((c, idx) => {
                    return <ConceptItem key={idx} addConcept={props.addConcept} totalConcepts={props.totalConcepts} concept={c} />
                  })
                }
              </ul>
              :
              ""
            }
            {
              subConcepts && subConcepts.length > 0 ?
              <span className="new badge" data-badge-caption="">{subConcepts.length}</span>
              : ""
            }
          </li>
}

export default ConceptItem