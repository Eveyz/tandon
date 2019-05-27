import React, { useState, useEffect } from 'react'

import Header from '../layouts/Header'
import axios from '../axios'

const DomainListContainer = (props) => {

  const [domains, setDomains] = useState([])

  useEffect(() => {
    axios.get("/v1/domains")
    .then(response => {
      console.log(response)
      setDomains(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <h5>Domains</h5>
              <button className="btn"><i className="material-icons left">add</i>Add new domain</button>
              {
                domains.length > 0 ?
                <table>
                  <thead>
                    <tr>
                      <th>Domain</th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      domains.map((d, idx) => {
                        return  <tr key={idx}>
                                  <td>{d.domain_id}</td>
                                  <td>{d.display_name}</td>
                                  <td>{d.value}</td>
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
                        <h5 className="center">No domains found</h5>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
}

export default DomainListContainer