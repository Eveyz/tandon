import React from 'react'

const Categorical = (props) => {
  return  <div className="row no-margin" style={{paddingTop: "10px"}}>
            <div className="col m12 no-padding">
              <p>
                <label>
                  <input type="checkbox" className="filled-in" />
                  <span>{props.concept.name}</span>
                </label>
              </p>
            </div>
          </div>
}

export default Categorical