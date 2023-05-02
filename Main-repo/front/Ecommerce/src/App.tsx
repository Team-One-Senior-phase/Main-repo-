import React,{FC,useEffect,useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/partials/Navbar'
import Home from './Pages/Home'
import Cart from './components/Cart';
import axios from 'axios'
import Checkout from './components/Checkout';



type Item = {
  id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const App:FC=() => {
  const [updated,setUpdated] = useState<boolean>(false)
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      product_name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 9.99,
      stock: 10,
      image: 'https://picsum.photos/id/1/200/200',
    },
    {
      id: 2,
      product_name: 'Product 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 19.99,
      stock: 5,
      image: 'https://picsum.photos/id/2/200/200',
    },
    {
      id: 3,
      product_name: 'Product 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: 29.99,
      stock: 2,
      image: 'https://picsum.photos/id/3/200/200',
    },
  ])
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

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register registerUser={registerUser}/>}/>
      <Route path='/login' element={<Login loginUser={loginUser}/>}/>
      <Route path='/cart' element={ <Cart items={items} setItems={setItems} />} />
      <Route path="/checkout" element={<Checkout items={[]}/>}/>
    </Routes>
    </>
  )
}

export default App