import React, { useEffect, useState } from 'react'

import Header from '../layouts/Header'
import axios from '../axios'
import ConceptListContainer from '../concepts/ConceptListContainer'
import ConceptWidget from '../concepts/ConceptWidget'
import QueryResult from './QueryResult'

/**
 * queryStatement: 
 * { 
 *    concept_id: {
 *      variable_ids: [1, 2, 3],
 *      domains: [
 *        {id, displayname, value}
 *      ]
 *    }
 * }
 * 
 */

const QueryDashboard = (props) => {

  const [counts, setCounts] = useState({})
  const [concepts, setConcepts] = useState({})
  const [selectedConcepts, setSelectedConcepts] = useState([])
  const [queryiedVariables, setqueryiedVariables] = useState(new Set)
  const [queryStatement, setQueryStatement] = useState({})
  const [patients, setPatients] = useState([])

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

  const selectDomain = (queriedVariablesAndDomains) => {
    var qv = queryiedVariables
    queriedVariablesAndDomains["variables"].forEach(v => {
      queryiedVariables.add(v.display_name)
    })
    setqueryiedVariables(qv)

    const concept_id = queriedVariablesAndDomains["concept_id"]
    var qs = queryStatement
    qs[concept_id] = {
      variables: queriedVariablesAndDomains["variables"],
      domains: [...(queryStatement[concept_id] ? queryStatement[concept_id]["domains"] : []), queriedVariablesAndDomains["domain"]]
    }
    setQueryStatement(qs)
    // console.log("selected: ", queryStatement)
  }

  const deselectDomain = (queriedVariablesAndDomains) => {
    const concept_id = queriedVariablesAndDomains["concept_id"]
    var qs = queryStatement
    qs[concept_id]["domains"] = queryStatement[concept_id]["domains"].filter(d => 
      d._id.$oid !== queriedVariablesAndDomains["domain"]._id.$oid
    )
    setQueryStatement(qs)
    // console.log("deselected: ", queryStatement)
  }

  const query = () => {
    axios.post(`/v1/patients/query`, {query: queryStatement})
    .then(response => {
      console.log(response.data)
      setPatients(response.data)
    })
    .catch(err => {
      console.log(err)
    })
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
                      return  <ConceptWidget 
                                key={idx} 
                                concept={c} 
                                removeConcept={removeConcept}
                                selectDomain={selectDomain}
                                deselectDomain={deselectDomain}
                              />
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
                        <div className="col s12 m12 no-padding">
                          <button className="btn" onClick={query}>Query</button>
                        </div>
                      </div>

                      <div className="row no-margin">
                        <QueryResult results={patients} queryiedVariables={[...queryiedVariables]} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default QueryDashboard