import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from '../layouts/Header'
import axios from '../axios'

const ConceptListContainer = (props) => {

  const [concepts, setConcepts] = useState([])

  useEffect(() => {
    axios.get("/v1/concepts/find_leaf_concepts")
    .then(response => {
      console.log(response)
      setConcepts(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <h5>Concepts</h5>
              <Link to={"/concepts/new"} className="btn"><i className="material-icons left">add</i>Add new concept</Link>
              {
                concepts.length > 0 ?
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
                      concepts.map((c, idx) => {
                        return  <tr key={idx}>
                                  <td><Link to={`/concepts/${c._id.$oid}`}>{c.display_name}</Link></td>
                                  <td>{c.description}</td>
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
                        <h5 className="center">No concepts found</h5>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
}

export default ConceptListContainer