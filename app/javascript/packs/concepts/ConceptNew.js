import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../layouts/Header'
import ConceptForm from './ConceptForm'

const ConceptNew = (props) => {
  return  <div>
            <Header />
            <div className="container">
              <div><h5><Link to={`/concepts`}>Concepts ></Link></h5></div>
              <div className="card">
                <div className="card-content">
                  <ConceptForm />
                </div>
              </div>
            </div>
          </div>
}

export default ConceptNew