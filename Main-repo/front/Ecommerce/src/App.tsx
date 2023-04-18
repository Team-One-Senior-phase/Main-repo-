import React,{FC,useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Register from './components/Register'
import Navbar from './components/partials/Navbar'
import Home from './Pages/Home'
import axios from 'axios'

const App:FC=() => {
  const [updated,setUpdated] = useState<boolean>(false)

  var registerUser = (name:string,mail:string,password:string): void =>{
    axios.post("http://localhost:3000/api/users/register",{user_name:name,email:mail,password:password})
    .then(() => setUpdated(!updated))
  }

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register registerUser={registerUser}/>}/>
    </Routes>
    </>
  )
}

export default App
