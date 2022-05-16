import React,{useState,useEffect,useContext} from 'react';
import {Auth} from '../context/Authcontext';
import { useNavigate, useParams } from 'react-router-dom';
export default function Info() {
  let{ id } =useParams();
  let [info,setInfo] = useState([]);
  let navigation = useNavigate()
  let {authToken} =useContext(Auth)
  let getInfo =async ()=>{
    if(id !== "new"){
     let response = await fetch(`/api/names/${ id }/`)
     let data = await response.json()
     setInfo(data)
    }
  }
  useEffect(()=>{
    getInfo()
  },[id])

  let update =async ()=>{
        await fetch(`/api/names/${ id }/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authToken?.access)
                
            },
            body: JSON.stringify(info)
        });
  };
  let Create =async ()=>{
        await fetch('/api/names/new', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authToken?.access)

                
            },
            body: JSON.stringify(info)
        })
  }
  let deleteInfo = async ()=>{
    await fetch(`/api/names/${ id }/delete`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json',
      'Authorization':'Bearer ' + String(authToken?.access)
    }
    })
    navigation('/')
  }
  
  let handelSubmit =async ()=>{
    if(    id  !== 'new' && !info){
      alert('wrong')
    }
    else if(   id  !== 'new'){
      update()
    }
    else if(    id    === 'new' && info !== null ){
      Create()
    }
    navigation('/')
    
  }
  return (
    <div>
      { id  !== 'new'?(
          <button onClick={deleteInfo} className="btn btn-danger">delete</button>
        ):null}
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <label htmlFor='doctor'>doctor</label>
                <input type=" text" name='doctor' className="form-control" defaultValue={info?.Doctor} onChange={(e)=>{setInfo({...info,'Doctor':e.target.value})}} />
            </div>
              <div className="form-group">
                <label htmlFor='patient'>patient</label>
                <input type=" text" name='patien' className="form-control"  defaultValue={info?.Patient} onChange={(e)=>{setInfo({...info,'Patient':e.target.value})}}/>
            </div>
            <div className="form-group">
              <label htmlFor='Case'>case</label>
               <input type="text" name="Case"  className="form-control" defaultValue={info?.case} onChange={(e)=>{setInfo({...info,'case':e.target.value})}}/>
            </div>
            <div className="form-group">
              <label htmlFor='age'>Age</label>
               <input type="number" name="age" className="form-control" defaultValue={info?.age}onChange={(e)=>{setInfo({...info,'age':e.target.value})}} />
            </div>
             <div className="form-group">
              <label htmlFor='gender'>gender</label>
              <input type="text" name="gender" className="form-control" defaultValue={info?.gender}onChange={(e)=>{setInfo({...info,'gender':e.target.value})}}/>
            </div>
            <div className="form-group">
              <label htmlFor='contact_number'>contact_number</label>
               <input type="text" name="contact_number" className="form-control" defaultValue={info?.contact_number}onChange={(e)=>{setInfo({...info,'contact_number':e.target.value})}}/>
            </div>
           <div className="form-group">
              <label htmlFor='Date'>Date</label>
               <input type="date" name="Date" className="form-control" defaultValue={info?.date} onChange={(e)=>{setInfo({...info,'date':e.target.value})}}/>
            </div>
            <div className="form-group">
                <label htmlFor='description'>description</label>
                <input type=" text" name='description' className="form-control" defaultValue={info?.description} onChange={(e)=>{setInfo({...info,'description':e.target.value})}}/>
            </div>
            <input type='submit' className='btn-primary'/>
      </form>
    </div>  
  )  
}
