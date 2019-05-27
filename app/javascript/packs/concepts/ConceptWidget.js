import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Slider from './Slider'
import Categorical from './Categorical'
import { CATEGORICAL, NUMERICAL } from '../helper/constants'

const ConceptWidget = (props) => {

  const removeConcept = () => {
    props.removeConcept(props.concept._id.$oid)
  }

  var content = ""
  switch(props.concept.concept_type) {
    case CATEGORICAL:
      content = <Categorical concept={props.concept} selectDomain={props.selectDomain} deselectDomain={props.deselectDomain}/>
      break;
    case NUMERICAL:
      content = <Slider concept={props.concept} />
      break;
    default:
      break;
  }

  return  <div className="card">
            <div className="card-content">
              <div className="row no-margin">
                <div className="col m11 no-padding">
                  <h5 className="no-margin">  
                    <Link to={`/concepts/${props.concept._id.$oid}`} replace target="_blank">{props.concept.display_name}</Link>
                  </h5>
                </div>
                <div className="col m1 no-padding">
                  <i className="material-icons black-text clickable right" onClick={removeConcept}>close</i>
                </div>
              </div>
              {content}
            </div>
          </div>
}

export default ConceptWidget