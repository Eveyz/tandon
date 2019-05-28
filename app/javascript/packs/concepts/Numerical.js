import React from 'react'

import Slider from './Slider'

const Numerical = (props) => {

  const updateRange = (vals) => {
    props.updateRange({
      concept_id: props.concept._id.$oid,
      range: {
        min: vals[0],
        max: vals[1]
      }
    })
  }

  return  <div>
            <Slider 
              concept={props.concept} 
              updateRange={updateRange}
            />
            <br/>
            {
              props.concept.variables.length > 0 ?
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Database</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    props.concept.variables.map((v, idx) => {
                      return  <tr key={idx}>
                                <td>{v.display_name}</td>
                                <td>{v.description}</td>
                                <td>{v.variable_type}</td>
                              </tr>
                    })
                  }
                </tbody>
              </table>
              : <div className="center">No variables found for current concept</div>
            }
          </div>
}

export default Numerical