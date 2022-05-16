import React,{useState,useContext} from 'react';
import { Auth } from '../context/Authcontext';
import { useParams } from 'react-router-dom';
export default function RESET() {
  let {token} = useParams()
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    let {rest} = useContext(Auth);
    const handleSubmit = async e => {
        e.preventDefault();
        rest(token,password, password2)
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
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
