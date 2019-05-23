import React, { useEffect, useState } from 'react'

import Header from '../layouts/Header'
import axios from '../axios'
import ConceptListContainer from '../concepts/ConceptListContainer'
import ConceptWidget from '../concepts/ConceptWidget'

const QueryDashboard = (props) => {

  const [counts, setCounts] = useState({})
  const [concepts, setConcepts] = useState({})

  const [selectedConcepts, setSelectedConcepts] = useState([])

  useEffect(() => {
    axios.get("/v1/concepts")
    .then((response) => {
      setConcepts(response.data.concepts)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const addConcept = (c) => {
    if(!counts[c._id.$oid]) {
      setSelectedConcepts([...selectedConcepts, c])
      counts[c._id.$oid] = true
      setCounts(counts)
    } else {
      M.toast({html: "Concept already added", displayLength: 1000})
    }
  }

  const removeConcept = (c) => {
    setSelectedConcepts(selectedConcepts.filter(concept => concept._id.$oid !== c))
    counts[c] = false
    setCounts(counts)
  }

  return  <div>
            <Header />
            <div className="container-90">
              <div className="row">
                <div className="col m3">
                  <h5>Concepts</h5>
                  <ConceptListContainer data={concepts} addConcept={addConcept} />
                </div>
                <div className="col m9 low-level">
                  <h5>Query patient data</h5>
                  {
                    selectedConcepts.length > 0 ? 
                    selectedConcepts.map((c, idx) => {
                      return <ConceptWidget key={idx} concept={c} removeConcept={removeConcept} />
                    })
                    :
                    <div className="card low-level">
                      <div className="card-content">
                        <div className="row no-margin">
                          <div className="col s12 m12">
                            <h5 className="center">Select concept to query</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="card low-level">
                    <div className="card-content">
                      <div className="row no-margin">
                        <div className="col s12 m12">
                          <button className="btn">Query</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default QueryDashboard