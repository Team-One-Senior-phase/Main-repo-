import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/partials/Navbar'
import Home from './Pages/Home'
import Cart from './components/Cart';
import axios from 'axios'
import ResetPassword from './components/ResetPassword'
import Setting from './components/Setting'
import ProductList from './components/ProductList';

interface IUser {
  user_name: string
  email: string
  password: string
}

const App: FC = () => {
  const [updated, setUpdated] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [showInvalidUser, setShowInvalidUser] = useState<boolean>(false)
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const getUserName = (mail: string): void => {
    let index = users.findIndex(user => user.email === mail)
    if (index) {
      setUsername(users[index].user_name)
    }
  }

  const handleLogin = (): void => {
    setIsLoggedIn(true)
  }

  const handleLogout = (): void => {
    setIsLoggedIn(false)
    navigate("/login")
  }

  var registerUser = (name: string, mail: string, password: string): void => {
    axios.post("http://localhost:3000/api/users/register", { user_name: name, email: mail, password: password })
      .then(() => setUpdated(!updated))
  }

  var loginUser = (mail: string, password: string): void => {
    axios.post("http://localhost:3000/api/users/login", { email: mail, password: password })
      .then(() => {
        setShowInvalidUser(false)
        navigate("/")
      })
      .catch(() => setShowInvalidUser(true)
      )
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/users').then(response => setUsers(response.data))
  }, [updated])

  return (
    <>

      <Navbar username={username} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/register' element={<Register registerUser={registerUser} users={users} />} />
        <Route path='/login' element={<Login loginUser={loginUser} showInvalidUser={showInvalidUser} getUserName={getUserName} handleLogin={handleLogin} />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>

    </>
  )
}

export default App