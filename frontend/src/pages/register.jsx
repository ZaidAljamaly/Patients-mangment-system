import React,{useState,useContext} from 'react';
import { Auth } from '../context/Authcontext';
import Nav1 from '../componenets/Nav1';
export default function REG() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  let {REG} =useContext(Auth);
  const handleSubmit = async e => {
    e.preventDefault();
    REG(username,email, password, password2);
  };
  return (
    <div className='container-fluid'> 
      <Nav1/>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor='username'>username</label>
                <input type=" text" name='username' className="form-control"onChange={e=> setUsername(e.target.value)} />
            </div>
              <div className="form-group">
                <label htmlFor='Email'>Email</label>
                <input type=" email" name='Email' className="form-control" onChange={e=> setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor='password'>password</label>
               <input type="password" name="password"  className="form-control" onChange={e=> setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor='password2'>confirm password</label>
               <input type="password" name="password2" className="form-control" onChange={e=> setPassword2(e.target.value)}/>
            </div>
           
            <input type='submit' className='btn-primary'/>
        </form>
    </div>
  )
}

//<p>{password2 !== password ? "Passwords do not match" : ""}</p>