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
import Orders from './components/Orders';
import OneOrder from './components/OneOrder';

interface IUser {
  user_id: number
  user_name: string
  email: string
  password: string
  adress: string
}

interface IProduct {
  product_id: number
  product_name: string
  description: string
  price: number
  stock: number
  image: string
}

const App: FC = () => {
  const [updated, setUpdated] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [oneProduct, setOneProduct] = useState<IProduct>({
    product_id: 0,
    product_name: "",
    description: "",
    price: 0,
    stock: 0,
    image: ""
  })
  const [showInvalidUser, setShowInvalidUser] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [userId, setUserId] = useState<number>(0)
  const [items, setItems] = useState<IProduct[]>([])
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
  const [searchClicked, setSearchClicked] = useState<boolean>(false)

  const navigate = useNavigate()

  const getProduct = (id: number): void => {
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

  const getUserId = (mail: string): void => {
    let index = users.findIndex(user => user.email === mail)
    if (index) {
      setUserId(users[index].user_id)
    }
  }

  const handleLogout = (): void => {
    navigate("/login")
    localStorage.removeItem('JWT token')
  }

  var registerUser = (name: string, mail: string, password: string): void => {
    axios.post("http://localhost:3000/api/users/register", { user_name: name, email: mail, password: password })
      .then(() => setUpdated(!updated))
  }

  var loginUser = (mail: string, password: string): void => {
    axios.post("http://localhost:3000/api/users/login", { email: mail, password: password })
      .then(response => {
        setShowInvalidUser(false)
        navigate("/")
        localStorage.setItem('JWT token', response.data.token)
      })
      .catch(() => setShowInvalidUser(true)
      )
  }

  const searchProduct = (query: string): void => {
    setSearchClicked(true)
    const temp = products.filter(product => product.product_name.includes(query) || product.description.includes(query))
    setSearchedProducts(temp)
  }

  const updateAdress = (id: number, newAdress: string): void => {
    const temp = users.map(user => user.user_id === id ? { ...user, adress: newAdress } : user)
    setUsers(temp)
  }

  const updatePassword = (id: number, newPassword: string): void => {
    const temp = users.map(user => user.user_id === id ? { ...user, password: newPassword } : user)
    setUsers(temp)
  }

  const updatePhone = (id: number, newPhone: string): void => {
    const temp = users.map(user => user.user_id === id ? { ...user, phone: newPhone } : user)
    setUsers(temp)
  }

  const addToCart = (product: IProduct) => {
    const exist = items.find((item) => item.product_id === product.product_id)
    if (exist) {
      let temp = items.map((item) =>
        item.product_id === product.product_id ? { ...item, stock: item.stock + 1 } : item
      )
      setItems(temp)
    } else {
      setItems([...items, { ...product, stock: 1 }])
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/users').then(response => setUsers(response.data))
  }, [updated])

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then(response => setProducts(response.data.products))
  }, [updated])

  return (
    <>
      <Navbar username={username} handleLogout={handleLogout} searchProduct={searchProduct} />
      <Routes>
        {searchClicked ? <Route path='/' element={<ProductList products={searchedProducts} getProduct={getProduct} addToCart={addToCart} />} />
          : <Route path='/' element={<ProductList products={products} getProduct={getProduct} addToCart={addToCart} />} />}
        <Route path='/register' element={<Register registerUser={registerUser} users={users} />} />
        <Route path='/login' element={<Login loginUser={loginUser} showInvalidUser={showInvalidUser} getUserName={getUserName} />} />
        <Route path='/cart' element={<Cart items={items} setItems={setItems} />} />
        <Route path='/productDetails' element={<ProductDetails product={oneProduct} addToCart={addToCart} />} />
        <Route path='/resetPassword' element={<ResetPassword users={users} userId={userId} getUserId={getUserId} updatePassword={updatePassword} />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/order' element={<OneOrder />} />
      </Routes>
    </>
  )
}

export default App