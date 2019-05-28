import React, { useState } from 'react'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const Slider = (props) => {

  const [min, setMin] = useState(props.concept.min || 0)
  const [max, setMax] = useState(props.concept.max || 100)

  return  <div className="row no-margin">
            <div id={`concept-${props.concept._id.$oid}`}></div>
            <div className="col m1 no-padding">
              <input
                value={min} 
                className="no-margin" 
                onChange={(e) => {
                  setMin(e.target.value)
                  if(e.target.value) {
                    props.updateRange([parseInt(e.target.value), parseInt(max)])
                  }
                }}
              />
            </div>
            <div className="col m10">
              <div style={{padding: "12px 10px", marginTop: "8px"}}>
                <Range allowCross={false} min={props.concept.min} max={props.concept.max} value={[parseInt(min), parseInt(max)]} onChange={(values) => {
                  setMin(values[0])
                  setMax(values[1])
                  props.updateRange([values[0], values[1]])
                }} />
              </div>
            </div>
            <div className="col m1 no-padding">
              <input 
                value={max} 
                className="no-margin" 
                onChange={(e) => {
                  setMax(e.target.value)
                  if(e.target.value) {
                    props.updateRange([parseInt(min), parseInt(e.target.value)])
                  }
                }}
              />
            </div>
          </div>
}

export default Slider