import React from 'react'
import axios from '../axios'

import history from '../history'
import Header from '../layouts/Header'
import DatabaseForm from './DatabaseForm'

const DatabaseNew = (props) => {

  const createDatabase = (database) => {
    axios.post("/v1/databases", database)
      .then(response => {
        history.push("/databases")
      })
      .catch(err => {
        console.log(err)
      })
  }

  return <div>
    <Header />
    <div className="container">
      <div className="card">
        <div className="card-content">
          <h5 className="center no-margin">New database</h5>
          <DatabaseForm submit={createDatabase} />
        </div>
      </div>
    </div>
  </div>
}

export default DatabaseNew