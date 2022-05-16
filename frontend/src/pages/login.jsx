import React,{useContext} from 'react'
import { Auth } from '../context/Authcontext';
import {Link} from 'react-router-dom';
import Nav1 from '../componenets/Nav1';
export default function Login() {
  let {loginUser} =useContext(Auth);
  return (
    <div className='container-fluid'>
      <Nav1/>
        <form onSubmit={loginUser} className='m-auto '>
              <div className="form-group">
                <label htmlFor='username'>username</label>
                <input type=" text" name='username' className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor='password'>password</label>
               <input type="password" name="password"  className="form-control"/>
            </div>
           
            <input type='submit' className='btn-primary'/>
        </form>
        <Link to='/forget'>forget password?</Link>
    </div>
  )
}
