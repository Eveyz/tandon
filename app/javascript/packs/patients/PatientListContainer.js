import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Header from '../layouts/Header'
import axios from '../axios'
import PatientList from './PatientList'
import PaginationContainer from '../helper/PaginationContainer'

const PatientListContainer = (props) => {

  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.get("/v1/patients")
    .then(response => {
      setPatients(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <h5>Patients</h5>
              <Link to={"/patients/new"} className="btn"><i className="material-icons left">add</i>Add a new patient record</Link>
              {
                patients.length > 0 ?
                <PaginationContainer 
                  itemsPerPage={50} 
                  data={patients} 
                  readOnly={true} 
                >
                  <PatientList />
                </PaginationContainer>
                :
                <div className="row">
                  <div className="col s12 m12 no-padding">
                    <div className="card">
                      <div className="card-content">
                        <h5 className="center">No patients found</h5>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
}

export default PatientListContainer