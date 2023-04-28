import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/partials/Navbar'
import Home from './Pages/Home'
import axios from 'axios'
import ResetPassword from './components/ResetPassword'
import Setting from './components/Setting'
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';

interface IUser {
  user_name: string
  email: string
  password: string
}

interface IProduct {
  product_id: number
  product_name: string
  description: string
  price: number
  stock: number
  image: string
}

type Item = {
  id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const App: FC = () => {
  const [updated, setUpdated] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [oneProduct, setOneProduct] = useState<IProduct>({
    product_id: 2,
    product_name: "ITEL A33 PLUS/1GB/32GB/Blue smartphone",
    description: "Dual SIM - Screen 5 - Quad-Core Processor - 1GB RAM - 32GB Storage - Cameras: 5MP (rear), 2MP (front end) - Android 11 - Fingerprint Reader - Battery 3020 mAh - 3G - WiFi - Bluetooth - Color Blue",
    price: 189.00,
    stock: 5,
    image: "https://www.tunisianet.com.tn/285057-large/smartphone-itel-a33-plus-1-go-32-go-bleu.jpg"
  })
  const [showInvalidUser, setShowInvalidUser] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

  const getProduct = (id:number) : void => {
    let index = products.findIndex(product => product.product_id === id)
    if (index) {
      console.log(products[index].product_id)
      setOneProduct(products[index])
    } 
  }
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

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then(response => setProducts(response.data.products))
  }, [updated])

  return (
    <>
      <Navbar username={username} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<ProductList products={products} getProduct={getProduct} />} />
        <Route path='/register' element={<Register registerUser={registerUser} users={users} />} />
        <Route path='/login' element={<Login loginUser={loginUser} showInvalidUser={showInvalidUser} getUserName={getUserName} handleLogin={handleLogin} />} />
        <Route path='/cart' element={ <Cart items={items} setItems={setItems} />} />
        <Route path='/productDetails' element={ <ProductDetails product={oneProduct} />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/setting' element={<Setting />} />
      </Routes>
    </>
  )
}

export default App