import React,{useState,useEffect,useContext} from 'react';
import {Auth} from '../context/Authcontext';
import Nav2 from '../componenets/Nav2';
import Cards from '../componenets/Cards';
import Search from '../componenets/Search';

export default function Home() {
  let [patient,setPatient] =useState([])
  let {authToken,logoutUser} =useContext(Auth)
  let [item,setItem] = useState('')
  useEffect(()=>{
    getPatient()
  },[item])
  let getPatient = async ()=>{
    let response = await fetch(`http://127.0.0.1:8000/api/names/?q=${ item }`,{
      method:'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization':'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    if(response.status === 200){
    setPatient(data)
  }else if (response.status === '403')
    logoutUser()
  }
  
  return (
    <div className="container-fluid">
      <Nav2/>
      <Search searchText={(text) =>setItem(text)}/>
            <table className='container table table-striped '>
              <thead className=''>
                <tr>
                  <th>
                    Doctor
                  </th>
                  <th>
                    Patient
                  </th>
                  <th>
                    Case
                  </th>
                  <th>
                    Age
                  </th>
                  <th>
                    Gender
                  </th>
                  <th>
                    Contact
                  </th>
                   <th>
                    Date
                  </th>
                  <th>
                    Description
                  </th>
                  <th>
                    Edit
                  </th>
                </tr>
              </thead>
              {patient.map(n=>(
                <Cards key={n.id} n={n} />
              ))}
            </table>

    </div>
  )
}
