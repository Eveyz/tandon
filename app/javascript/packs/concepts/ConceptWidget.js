import React from 'react'
import { Link } from 'react-router-dom'

const ConceptWidget = (props) => {

  const removeConcept = () =>{
    console.log("clicked")
  }

  return  <div className="card">
            <div className="card-content">
                  <div className="row no-margin">
                    <div className="col m11 no-padding">
                      <Link to={`/concepts/${props.concept._id.$oid}`} replace target="_blank"><h5>{props.concept.name}</h5></Link>
                    </div>
                    <div className="col m1 no-padding">
                      <i className="material-icons black-text clickable right" onClick={removeConcept}>close</i>
                    </div>
                  </div>
            </div>
          </div>
}

export default ConceptWidget