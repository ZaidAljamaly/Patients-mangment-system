import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import PrivateRoute from './utils/PraivateRoute';
import React,{ Fragment} from 'react'
import {Authcontext} from'./context/Authcontext';
import REG from './pages/register';
import FORGET from './pages/forget';
import RESET from './pages/reset';
import 'bootstrap/dist/css/bootstrap.css';
import Info from './pages/Info';
function App() {
  return (
    <div className="App">
      <Router>
        <Authcontext>
         <Fragment>
           <Routes>
             <Route exact path='/' element={<PrivateRoute/>}/>
             <Route  exact path="/" element={<Home/>} />
             <Route path="/login" element={<Login/>}/>
             <Route path="/signin" element={<REG/>}/>
             <Route path="/forget" element={<FORGET/>}/>
             <Route path="/reset/:token" element={<RESET/>}/>
             <Route path='/names/:id' element={<Info/>}/>
           </Routes>
         </Fragment>
        </Authcontext>
      </Router>
    </div>
  );
}

export default App;
