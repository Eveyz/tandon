import React from 'react'
import { Link } from 'react-router-dom'

const PatientList = (props) => {
  return  <table>
            <thead>
              <tr>
                <th>Study Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                props.data.map((p, idx) => {
                  return  <tr key={idx}>
                            <td><Link to={`/patients/${p._id.$oid}`}>{p["Study Number"]}</Link></td>
                            <td>
                              <i className="material-icons left blue-text">edit</i>
                              <i className="material-icons left red-text">delete</i>
                            </td>
                          </tr>
                })
              }
            </tbody>
          </table>
}

export default PatientList