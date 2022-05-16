import React,{createContext,useState,useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import { useNavigate} from 'react-router-dom';
export  const Auth = createContext()

export  function Authcontext({children}) {
  let [user,setUser] = useState(()=> localStorage.getItem('authToken') ?jwt_decode(localStorage.getItem('authToken')) :null)
  let [authToken,setAuthToken] = useState(()=> localStorage.getItem('authToken') ?JSON.parse(localStorage.getItem('authToken')) :null)
  let [loading,setLoading]=useState(true)
  let Navigate = useNavigate()

  let loginUser = async (e)=>{
    e.preventDefault()
    let response=  await fetch('/api/token/',{
      method:'POST',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
    }
    )
    let data = await response.json()

    if(response.status == 200){
      setAuthToken(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authToken',JSON.stringify(data))
      Navigate('/')
    }else{
      alert('wrong')
    }
  }
  let logoutUser= () =>{
      setAuthToken(null)
      setUser(null)
      localStorage.removeItem('authToken')
      Navigate('/login')
  }

  let updateToken =  async ()=>{
    let response=  await fetch('/api/token/refresh/',{
      method:'POST',
      headers: {
        'content-type':'application/json'
      },
      body:JSON.stringify({'refresh':authToken?.refresh})
    }
    )
    let data = await response.json()
    if(response.status ==200){
      setAuthToken(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authToken',JSON.stringify(data))
    }else{
      logoutUser()
    }

  }
  let REG = async (username,email,password,password2)=>{
    let response= await fetch('/api/register/',{
      method:'POST',
      headers: {
        'content-type':'application/json'
      },
       body:JSON.stringify({username,email,password,password2})
        
    })
    if(response.status === 200 | response.status ===300){
      Navigate('/login')
    }else{
      alert('wrong')
    }
  }
  let forget =async (email)=>{
    let response = await fetch('/api/forget/',{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify({email})
    })
  }
  let rest = async (token,password,password2)=>{
    let response = await fetch('/api/reset/',{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify({token,password,password2})
    })
    Navigate('/login')
  }
  let contextData ={
    user:user,
    loginUser:loginUser,
    logoutUser:logoutUser,
    authToken:authToken,
    logoutUser:logoutUser,
    REG:REG,
    forget:forget,
    rest:rest,
  }

  useEffect(()=>{
    let interval=setInterval(()=>{
      if(authToken){
        updateToken()
      }
    },2000)
    return()=> clearInterval(interval)
  },[authToken,loading])
  return (
      <Auth.Provider value={contextData}>
          {children}
      </Auth.Provider>
  )
}
