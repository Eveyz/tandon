import React, { useState, useEffect } from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom' 

import Header from '../layouts/Header'

const Patient = (props) => {

  const [patient, setPatient] = useState({})

  useEffect(() => {
    axios.get(`/v1${props.location.pathname}`)
    .then(response => {
      console.log(response.data)
      setPatient(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <div><h5><Link to={`/patients`}>Patients ></Link></h5></div>
              <div className="card">
                <div className="card-content">
                  <div className="row no-margin">
                    <div className="col m12">
                      <h5 className="no-margin">Patient Data</h5>
                      <hr/>
                    </div>
                  </div>
                  {
                    Object.keys(patient).length > 0 ?
                    Object.keys(patient).map((field, idx) => {
                      return field !== "_id" && field !== "created_at" && field !== "updated_at" ? 
                      <div key={idx} className="row no-margin patient-row">
                        <div className="col m6"><b>{field}</b></div>
                        <div className="col m6">{patient[field]}</div>
                      </div>
                      : null
                    })
                    :
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
}

export default Patient