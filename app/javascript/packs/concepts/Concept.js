import React, { useState, useEffect } from 'react'
import axios from '../axios'
import { Link } from 'react-router-dom' 

import Header from '../layouts/Header'

const Concept = (props) => {

  const [concept, setConcept] = useState({})

  useEffect(() => {
    axios.get(`/v1${props.location.pathname}`)
    .then(response => {
      console.log(response.data)
      setConcept(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return  <div>
            <Header />
            <div className="container">
              <div><h5><Link to={`/concepts`}>Concepts ></Link></h5></div>
              <div className="card">
                <div className="card-content">
                  <div className="row no-margin">
                    <div className="col m12">
                      <h5 className="no-margin">Concept</h5>
                      <hr/>
                    </div>
                  </div>
                  {
                    Object.keys(concept).length > 0 ?
                    Object.keys(concept).map((field, idx) => {
                      return field !== "_id" && field !== "created_at" && field !== "updated_at" ? 
                      <div key={idx} className="row no-margin patient-row">
                        <div className="col m6"><b>{field}</b></div>
                        <div className="col m6">{concept[field]}</div>
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

export default Concept