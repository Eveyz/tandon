import React, { useEffect } from 'react'

const QueryResult = (props) => {

  useEffect(() => {
    console.log(props.queryiedVariables)
  })

  return  <div>
            {
              props.results.length > 0?
              <div>
                <h5>Total patients: {props.results.length}</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Study Number</th>
                      {
                        props.queryiedVariables.length > 0 ?
                        props.queryiedVariables.map((v, idx) => {
                          return <th key={idx}>{v}</th>
                        })
                        : ""
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {
                      props.results.map((r, idx) => {
                        return  <tr key={idx}>
                                  <td>{r["Study Number"]}</td>
                                  {
                                    props.queryiedVariables.length > 0 ?
                                    props.queryiedVariables.map((v, idx) => {
                                      return <td key={idx}>{r[v]}</td>
                                    })
                                    : ""
                                  }
                                </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
              :
              <h5 className="center">No reuslts found</h5>
            }
          </div>
}

export default QueryResult