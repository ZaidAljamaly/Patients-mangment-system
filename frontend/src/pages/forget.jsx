import React,{useState,useContext} from 'react'
import { Auth } from '../context/Authcontext';
import Nav1 from '../componenets/Nav1';
export default function FORGET() {
  let {forget} = useContext(Auth);
  const [email,setEmail] = useState('')
  const [notify,setNotify] = useState({
    show:false,
    error:false,
    message:''
  })
  const handleSubmit = async e=>{
    e.preventDefault();
    try{
      forget(email)
      setNotify({
        show:true,
        error:false,
        message:'check email'
      })
    }
    catch (e){
      setNotify({
        show:true,
        error:true,
        message:'error'

    })
    }
  }
  let info =<div></div>;
    if(notify.show){
      info = <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'} role="alert">
        {notify.message}
      </div>
    }
  return (
    <div>
      <Nav1/>
      {info}
        <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor='Email'>Email</label>
                <input type=" email" name='Email' className="form-control" onChange={e=> setEmail(e.target.value)}/>
            </div>
            <input type='submit' className='btn-primary'/>
        </form>
    </div>
  )
}
