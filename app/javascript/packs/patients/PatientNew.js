import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../layouts/Header'
import PatientForm from './PatientForm'

const PatientNew = (props) => {
  return  <div>
            <Header />
            <div className="container">
              <div><h5><Link to={`/patients`}>Patients ></Link></h5></div>
              <div className="card">
                <div className="card-content">
                  <h5 className="center no-margin">Add a new patient record</h5>
                  <PatientForm />
                </div>
              </div>
            </div>
          </div>
}

export default PatientNew