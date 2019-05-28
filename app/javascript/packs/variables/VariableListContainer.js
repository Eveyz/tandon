import React, { useState, useEffect } from 'react'

import Header from '../layouts/Header'
import axios from '../axios'

const VariableListContainer = (props) => {

  const [variables, setVariables] = useState([])

  useEffect(() => {
    axios.get("/v1/variables")
    .then(response => {
      console.log(response)
      setVariables(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <h5>Variables</h5>
              <button className="btn"><i className="material-icons left">add</i>Add new variable</button>
              {
                variables.length > 0 ?
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      variables.map((d, idx) => {
                        return  <tr key={idx}>
                                  <td>{d.name}</td>
                                  <td>{d.description}</td>
                                  <td>
                                    <i className="material-icons left blue-text">edit</i>
                                    <i className="material-icons left red-text">delete</i>
                                  </td>
                                </tr>
                      })
                    }
                  </tbody>
                </table>
                :
                <div className="row">
                  <div className="col s12 m12 no-padding">
                    <div className="card">
                      <div className="card-content">
                        <h5 className="center">No variables found</h5>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
}

export default VariableListContainer