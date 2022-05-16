import React from 'react'
import {Link} from 'react-router-dom';
export default function Nav1() {
  return (
          <nav className = 'navbar navbar-expand-sm navbar-light bg-dark ' id = 'nav' >
           <div className = 'container-fluid' >  
                  <h1 className = 'text-primary'><strong>Patients mangment system</strong></h1>
                  <Link className = 'nav-link active' to = '/login' > <button className = 'btn-primary' > Login </button > </Link >
                  <Link className = 'nav-link active' to = '/signin' > <button className = 'btn-primary' > Signin </button > </Link >
                   
                
            </div >
        </nav>
  )
}



//<Link to='/signin'>signin</Link><Link to='/login'>Login</Link>                  <button  className = 'navbar-toggler' type = 'button' data-bs-toggle = 'collapse' data-bs-target = '#navbarm' aria-controls = "navbarm" aria-expanded = "false" aria-label = "Toggle navigation" >
                   // <span className = 'toggler-icon top-bar' ></span >
                   // <span className = 'toggler-icon middle-bar' ></span >
                   // <span className = 'toggler-icon bottom-bar' ></span >
              //  </button >


