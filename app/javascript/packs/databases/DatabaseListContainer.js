import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from '../layouts/Header'
import axios from '../axios'

const DatabaseListContainer = (props) => {

  const [databases, setDatabasts] = useState([])

  useEffect(() => {
    axios.get("/v1/databases")
    .then(response => {
      console.log(response)
      setDatabasts(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <h5>Databases</h5>
              <Link to={"/databases/new"} className="btn"><i className="material-icons left">add</i>Add new database</Link>
              {
                databases.length > 0 ?
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
                      databases.map((d, idx) => {
                        return  <tr key={idx}>
                                  <td>{d.name}</td>
                                  <td>{d.description}</td>
                                  <td>
                                    <i className="material-icons left">edit</i>
                                    <i className="material-icons left">delete</i>
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
                        <h5 className="center">No database found</h5>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
}

export default DatabaseListContainer