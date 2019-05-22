import React, { useEffect, useState } from 'react'

import Header from '../layouts/Header'
import axios from '../axios'
import ConceptList from '../concepts/ConceptList'

const QueryDashboard = (props) => {

  const [concepts, setConcepts] = useState([])
  const [selectedConcepts, setSelectedConcepts] = useState(new Set)

  useEffect(() => {
    axios.get("/v1/concepts")
    .then((response) => {
      setConcepts(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container-90">
              <div className="row">
                <div className="col m3">
                  <h5>Concepts</h5>
                  <ConceptList data={concepts} />
                </div>
                <div className="col m9">
                  <h5>Query patient data</h5>
                  {concepts.size > 0 ? "" :
                    <div className="card">
                      <div className="card-content">
                        <div className="row no-margin">
                          <div className="col s12 m12">
                            <h5 className="center">Select concept to query</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
}

export default QueryDashboard