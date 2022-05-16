import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import Home from '../pages/home'
import {Auth} from '../context/Authcontext';
export default function PrivateRoute() {
  let {user} = useContext(Auth);
  return (
     user ? <Home /> : <Navigate to="/login" />
  )
}
