import React, { useState, useEffect } from 'react'

import axios from '../axios'

const ConceptListSearch = (props) => {

  const [concepts, setConcepts] = useState([])

  useEffect(() => {
    axios.get("/v1/concepts/find_leaf_concepts")
    .then((response) => {
      setConcepts(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const searchConcept = (e) => {
    let val = e.target.value
    axios.get(`/v1/concepts/search_concepts?concept_name=${val}`)
    .then((response) => {
      setConcepts(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const addConcept = (c) => (e) => {
    props.addConcept(c)
  }

  return  <div>
            <input type="text" onChange={searchConcept} autoFocus />
            {
              concepts.length > 0 ?
              <div>
                <ul>
                  {
                    concepts.map((c, idx) => {
                      return <li key={idx} className="concept-item" onClick={addConcept(c)}>{c.name}</li>
                    })
                  }
                </ul>
              </div>
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

export default ConceptListSearch