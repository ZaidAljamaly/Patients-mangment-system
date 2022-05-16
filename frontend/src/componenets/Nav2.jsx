
import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {Auth} from '../context/Authcontext';
export default function Nav1() {
  let {user,logoutUser} = useContext(Auth);
  return (
         <nav className=' bg-dark navbar navbar-light navbar-expand-sm' id='nav'>
             {user &&   <p className="text-white" >Hello {user.username}</p>}
             <ul className='navbar-nav ms-auto'>
                        <li className='nav-item primary'><button className='btn-primary' onClick={logoutUser}>Logout</button></li>
                        <li className='nav-item primary'><Link to ="/names/new"><button className='btn-primary'>Add</button></Link></li>
              </ul>
        </nav>
    
  )
}