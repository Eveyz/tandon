import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'

const QueryResult = (props) => {

  const [data, setData] = useState(() => {
    if(props.results) {
      const header = ["Study Number", ...props.queryiedVariables]
      var res = [header]
      props.results.forEach(patient => {
        var tmp = []
        header.forEach(field => {
          tmp.push(patient[field])
        })
        res.push(tmp)
      })
      return res
    }
  })

  useEffect(() => {
    // console.log(props.queryiedVariables)
  }, [])

  return  <div>
            { 
              props.results ?
              props.results.length > 0?
              <div>
                <br/>
                <hr/>
                <div className="row no-margin">
                  <div className="col m6" style={{paddingLeft: "0px"}}>
                    <h5 className="no-margin">Total patients: {props.results.length}</h5>
                  </div>
                  <div className="col m6">
                    <CSVLink 
                      data={data}
                      filename={`query-results-${Date.now()}.csv`}
                      className="btn"
                    >
                      <i className="material-icons right">cloud_download</i>
                      Download results
                    </CSVLink>
                  </div>
                </div>
                <div style={{overflowY: "scroll", maxHeight: "600px", marginTop: "10px"}}>
                  <table>
                    <thead>
                      <tr>
                        <th>Study Number</th>
                        {
                          props.queryiedVariables.length > 0 ?
                          props.queryiedVariables.map((v, idx) => {
                            return <th key={idx}>{v}</th>
                          })
                          : null
                        }
                      </tr>
                    </thead>

                    <tbody>
                      {
                        props.results.map((r, idx) => {
                          return  <tr key={idx}>
                                    <td><Link to={`/patients/${r._id.$oid}`} target="_blank">{r["Study Number"]}</Link></td>
                                    {
                                      props.queryiedVariables.length > 0 ?
                                      props.queryiedVariables.map((v, idx) => {
                                        return <td key={idx}>{r[v]}</td>
                                      })
                                      : null
                                    }
                                  </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              :
              <h5 className="center">No reuslts found</h5>
              : null
            }
          </div>
}

export default QueryResult