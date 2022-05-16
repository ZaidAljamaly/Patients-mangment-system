import React from 'react'
import {Link} from 'react-router-dom';
export default function Cards({n}) {
  return (
    <tbody>
      <tr>
        <td>{n.Doctor}</td>
        <td>{n.Patient}</td>
        <td>{n.case}</td>
        <td>{n.age}</td>
        <td>{n.gender}</td>
        <td>{n.contact_number}</td>
        <td>{n.date}</td>
        <td>{n.description}</td>
        <td><Link to = {`/names/${n.id}`}><button className="btn btn-primary" >Edit</button></Link></td>
      </tr>

    </tbody>
  )
}
