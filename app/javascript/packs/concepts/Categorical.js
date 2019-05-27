import React, { useState } from 'react'

const style = {
  marginRight: "15px"
}

const Categorical = (props) => {
  const domains = props.concept.variables.length > 0 ? props.concept.variables[0].domains : null

  const touchDomainCheckbox = queriedVariablesAndDomains => e => {
    e.target.checked ? 
    props.selectDomain(queriedVariablesAndDomains) 
    : 
    props.deselectDomain(queriedVariablesAndDomains)
  }

  return  <div className="row no-margin" style={{paddingTop: "10px"}}>
            <div className="col m12 no-padding">
              <br/>
              {
                domains ?
                domains.map((d, idx) => {
                  return  <label key={idx} style={style}>
                            <input 
                              type="checkbox" 
                              className="filled-in" 
                              onChange={touchDomainCheckbox({
                                concept_id: props.concept._id.$oid,
                                variables: props.concept.variables.map(v => {
                                  return {
                                    variable_id: v._id.$oid,
                                    display_name: v.display_name,
                                    variable_type: v.variable_type
                                  }
                                }),
                                domain: {
                                  _id: d._id,
                                  domain_id: d.domain_id,
                                  value: d.value
                                }
                              })} 
                            />
                            <span>{d.display_name}</span>
                          </label>
                }) : <div className="center">No variables found for current concept</div>
              }
              {
                domains ?
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Database</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      props.concept.variables.map((v, idx) => {
                        return  <tr key={idx}>
                                  <td>{v.display_name}</td>
                                  <td>{v.description}</td>
                                  <td>{v.variable_type}</td>
                                </tr>
                      })
                    }
                  </tbody>
                </table>
                : ""
              }
            </div>
          </div>
}

export default Categorical