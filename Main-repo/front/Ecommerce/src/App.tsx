import React,{FC,useEffect,useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/partials/Navbar'
import Home from './Pages/Home'
import axios from 'axios'
import ResetPassword from './components/ResetPassword';

interface IUser{
  name:string
  email:string
  password:string
}

const App:FC=() => {
  const [updated,setUpdated] = useState<boolean>(false)
  const [users,setUsers] = useState<IUser[]>([])
  const navigate = useNavigate()

  var registerUser = (name:string,mail:string,password:string): void =>{
    axios.post("http://localhost:3000/api/users/register",{user_name:name,email:mail,password:password})
    .then(()=>setUpdated(!updated))
  }

  var loginUser = (mail:string,password:string):void =>{
    axios.post("http://localhost:3000/api/users/login",{email:mail,password:password})
    .then(response => {
      console.log(response.data)
      if (response.data.message === "User logged in successfully") {
        console.log(response.data.message)

        navigate("/")
      }
    })
    .catch(() => console.log("invalid user"))
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/users').then(response => setUsers(response.data))
  }, [updated])

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register registerUser={registerUser} users={users} />}/>
      <Route path='/login' element={<Login loginUser={loginUser} users={users}/>}/>
      <Route path='/resetPassword' element={<ResetPassword />}/>
    </Routes>
    </>
  )
}

export default App
