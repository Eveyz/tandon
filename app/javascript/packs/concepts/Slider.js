import React, { useState } from 'react'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const Slider = (props) => {

  const [min, setMin] = useState(props.concept.min || "0")
  const [max, setMax] = useState(props.concept.max || "100")

  return  <div className="row no-margin">
            <div className="col m1 no-padding">
              <input
                value={min} 
                className="no-margin" 
                onChange={(e) => { 
                  setMin(e.target.value)
                }}
                onBlur={(e) => {
                  if(!e.target.value) {
                    setMin(props.concept.min || 0)
                  }
                }}
              />
            </div>
            <div className="col m10">
              <div style={{padding: "12px 10px", marginTop: "8px"}}>
                <Range allowCross={false} value={[parseInt(min), parseInt(max)]} onChange={(values) => {
                  setMin(values[0])
                  setMax(values[1])
                }} />
              </div>
            </div>
            <div className="col m1 no-padding">
              <input 
                value={max} 
                className="no-margin" 
                onChange={(e) => {
                  setMax(e.target.value)
                }}
                onBlur={(e) => {
                  if(!e.target.value) {
                    setMax(props.concept.max || 100)
                  }
                }}
              />
            </div>
          </div>
}

export default Slider