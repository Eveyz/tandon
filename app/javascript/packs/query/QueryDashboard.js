import React, { useEffect, useState } from 'react'

import Header from '../layouts/Header'
import axios from '../axios'
import HierarchicalConceptList from '../concepts/HierarchicalConceptList'
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

  const [counts, setCounts] = useState({}) // check duplicates
  const [selectedConcepts, setSelectedConcepts] = useState([]) // selected concepts
  const [queryiedVariables, setqueryiedVariables] = useState(new Set) // queried variables for results
  const [queryStatement, setQueryStatement] = useState({}) // query statement, check comments above

  const [concepts, setConcepts] = useState({}) // concepts from the database
  const [isQuering, setIsQuering] = useState(false) // display loading when is quering
  const [patients, setPatients] = useState([]) // queried patients data

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

      /* add to query variables for display */
      var qv = queryiedVariables
      c.variables.forEach(v => {
        queryiedVariables.add(v.display_name)
      })
      setqueryiedVariables(qv)
      // console.log(qv)

      /* add to query statement */
      var qs = queryStatement
      if(c.variables.length > 0) {
        if(c.concept_type === "categorical") {
          qs[c._id.$oid] = {
            variables: c.variables.map(v => {
              return {
                variable_id: v._id.$oid,
                display_name: v.display_name,
                variable_type: v.variable_type
              }
            }),
            domains: c.variables[0].domains ? c.variables[0].domains.map(d => {
              return {
                _id: d._id,
                domain_id: d.domain_id,
                value: d.value
              }
            }): []
          }
        } else if(c.concept_type === "numerical") {
          qs[c._id.$oid] = {
            variables: c.variables.map(v => {
              return {
                variable_id: v._id.$oid,
                display_name: v.display_name,
                variable_type: v.variable_type
              }
            }),
            range: {
              min: c.min,
              max: c.max
            }
          }
        }
        // console.log(qs)
        setQueryStatement(qs)
      }

      setPatients([])
    } else {
      M.toast({html: "Concept already added", displayLength: 1000})
    }
  }

  const removeConcept = (c) => {
    setSelectedConcepts(selectedConcepts.filter(concept => concept._id.$oid !== c._id.$oid))
    counts[c._id.$oid] = false
    setCounts(counts)

    var qs = queryStatement
    delete qs[c._id.$oid]
    setQueryStatement(qs)

    c.variables.forEach(v => {
      queryiedVariables.delete(v.display_name)
    })

    setPatients([])
  }

  const selectDomain = (queriedVariablesAndDomains) => {
    /* add query variables for result display */
    var qv = queryiedVariables
    queriedVariablesAndDomains["variables"].forEach(v => {
      queryiedVariables.add(v.display_name)
    })
    setqueryiedVariables(qv)

    /* update query statement to add new domain */
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
    // console.log(queriedVariablesAndDomains)
    /* remove domain from query statement */
    const concept_id = queriedVariablesAndDomains["concept_id"]
    var qs = queryStatement
    qs[concept_id]["domains"] = queryStatement[concept_id]["domains"].filter(d => 
      d._id.$oid !== queriedVariablesAndDomains["domain"]._id.$oid
    )
    setQueryStatement(qs)
    // console.log("deselected: ", queryStatement)
  }

  const updateRange = (conceptAndRanges) => {
    // console.log("ranges: ", conceptAndRanges)
    var qs = queryStatement
    qs[conceptAndRanges["concept_id"]]["range"] = conceptAndRanges["range"]
    setQueryStatement(qs)
    // console.log(qs)
  }

  const query = () => {
    setIsQuering(true)
    axios.post(`/v1/patients/query`, {query: queryStatement})
    .then(response => {
      // console.log(response.data)
      setPatients(response.data)
      setIsQuering(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const reset = () => {
    setCounts({})
    setSelectedConcepts([])
    setIsQuering(false)
    setqueryiedVariables(new Set)
    setQueryStatement({})
    setPatients([])
  }

  const save = () => {

  }

  return  <div>
            <Header />
            <div className="container-90">
              <div className="row">
                <div className="col m3">
                  <h5>Concepts</h5>
                  <HierarchicalConceptList data={concepts} addConcept={addConcept} />
                </div>
                <div className="col m9 low-level">
                  <h5>Query patient data</h5>
                  {
                    selectedConcepts.length > 0 ? 
                    selectedConcepts.map((c, idx) => {
                      return  <ConceptWidget 
                                key={`concept-${c._id.$oid}`} 
                                concept={c} 
                                removeConcept={removeConcept}
                                selectDomain={selectDomain}
                                deselectDomain={deselectDomain}
                                updateRange={updateRange}
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
                          <button className="btn blue" disabled={selectedConcepts.length === 0} onClick={query}><i className="material-icons left">query_builder</i>Query</button>
                          <button className="btn white black-text" style={{marginLeft: "20px"}} disabled={selectedConcepts.length === 0} onClick={reset}><i className="material-icons left">refresh</i>Reset</button>
                          <button className="btn cyan" style={{marginLeft: "20px"}} disabled={selectedConcepts.length === 0} onClick={save}><i className="material-icons left">save</i>Save Query</button>
                        </div>
                      </div>

                      <div className="row no-margin">
                        {
                          isQuering ?
                          <div className="progress">
                            <div className="indeterminate"></div>
                          </div>
                          :
                          <QueryResult results={patients} queryiedVariables={[...queryiedVariables]} />
                        }
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default QueryDashboard