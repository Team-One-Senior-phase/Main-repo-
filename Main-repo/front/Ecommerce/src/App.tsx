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
import OneOrder from './components/OrderDetails';
import Checkout from './components/Checkout';
import jwt from 'jwt-decode';
import OrderDetails from './components/OrderDetails';

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

interface Item {
  cart_id: number
  user_id: number
  product_id: number
  product_name: string
  description: string
  price: number
  stock: number
  quantity: number
  image: string
}

interface IOrder {
  order_id: number
  user_id: number
  order_date: Date
  total_amount: string
  shipping_address: string
  shipping_city: string
  shipping_zip_code: string
  shipping_country: string
  status: string
}

type TokenUser = {
  user_id: number,
  iat: number
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
  const [items, setItems] = useState<Item[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
  const [searchClicked, setSearchClicked] = useState<boolean>(false)
  const [searchedOrder, setSearchedOrder] = useState<IOrder[]>([])
  const [searchOrderClicked, setSearchOrderClicked] = useState<boolean>(false)

  const navigate = useNavigate()

  const getProduct = (id: number): void => {
    let index = products.findIndex(product => product.product_id === id)
    if (index) {
      console.log(products[index].product_id)
      setOneProduct(products[index])
    }
  }

  const handleLogout = (): void => {
    navigate("/login")
    localStorage.removeItem('JWT token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
  }

  var registerUser = (name: string, mail: string, password: string): void => {
    axios.post("http://localhost:3000/api/users/register", { user_name: name, email: mail, password: password })
      .then(() => setUpdated(!updated))
      .catch(error => console.log(error))
  }

  var loginUser = (mail: string, password: string): void => {
    axios.post("http://localhost:3000/api/users/login", { email: mail, password: password })
      .then(response => {
        setShowInvalidUser(false)
        navigate("/")
        const user = jwt(response.data.token) as TokenUser
        localStorage.setItem('JWT token', response.data.token)
        localStorage.setItem('user_id', user.user_id.toString())
        setUserId(user.user_id)
        let temp = users.filter(user => user.user_id === user.user_id)
        localStorage.setItem('user_name', temp[0].user_name)
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
    axios.put(`http://localhost:3000/api/users/${id}`)
      .then(reponse => {
        const temp = users.map(user => user.user_id === id ? { ...user, adress: newAdress } : user)
        setUsers(temp)
      })
  }

  const updatePassword = (id: number, newPassword: string): void => {
    axios.put(`http://localhost:3000/api/users/${id}`)
      .then(reponse => {
        const temp = users.map(user => user.user_id === id ? { ...user, password: newPassword } : user)
        setUsers(temp)
      })
  }

  const updatePhone = (id: number, newPhone: string): void => {
    axios.put(`http://localhost:3000/api/users/${id}`)
      .then(reponse => {
        const temp = users.map(user => user.user_id === id ? { ...user, phone: newPhone } : user)
        setUsers(temp)
      })
  }

  const addToCart = (user_id: number, product_id: number): void => {
    axios.post("http://localhost:3000/api/cart/new", { user_id: user_id, product_id: product_id, quantity: 1 })
      .then(() => setUpdated(!updated))
      .catch(error => console.log(error))
  }
  const reduceQuantity = (user_id: number, product_id: number): void => {
    axios.post("http://localhost:3000/api/cart/new", { user_id: user_id, product_id: product_id, quantity: -1 })
      .then(() => setUpdated(!updated))
      .catch(error => console.log(error))
  }

  const deleteCartItem = (user_id: number, cart_id: number): void => {
    axios.delete("http://localhost:3000/api/cart", {
      data: {
        user_id: user_id,
        cart_id: cart_id
      }
    }).then(() => setUpdated(!updated))
      .catch(error => console.log(error))
  }

  const addOrder = (user_id: number, address: string, city: string, state: string, zip_code: string, country: string): void => {
    axios.post("http://localhost:3000/api/cart/order", { user_id: user_id, address: address, city: city, state: state, zip_code: zip_code, country: country })
      .then(() => setUpdated(!updated))
      .catch(error => console.log(error))
  }

  const searchOrder = (id:number): void =>{
    setSearchOrderClicked(true)
    const temp = orders.filter(order => order.order_id===id)
    setSearchedOrder(temp)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/users').then(response => setUsers(response.data))
  }, [updated])

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then(response => setProducts(response.data.products))
  }, [updated])

  useEffect(() => {
    const token = localStorage.getItem("JWT token")
    if (token !== null) {
      const user = jwt(JSON.stringify(token)) as TokenUser
      console.log(user.user_id)
      axios.get(`http://localhost:3000/api/cart/${user.user_id}`).then(response => { setItems(response.data); console.log(response.data) })
    }
  }, [updated])

  useEffect(() => {
    const token = localStorage.getItem("JWT token")
    if (token !== null) {
      const user = jwt(JSON.stringify(token)) as TokenUser
      console.log(user.user_id)
      axios.get(`http://localhost:3000/api/users/orders/${user.user_id}`).then(response => { setOrders(response.data); console.log(response.data) })
    }
  }, [updated])

  return (
    <>
      <Navbar username={username} handleLogout={handleLogout} searchProduct={searchProduct} />
      <Routes>
        {searchClicked ? <Route path='/' element={<ProductList products={searchedProducts} getProduct={getProduct} addToCart={addToCart} />} />
          : <Route path='/' element={<ProductList products={products} getProduct={getProduct} addToCart={addToCart} />} />}
        <Route path='/register' element={<Register registerUser={registerUser} users={users} />} />
        <Route path='/login' element={<Login loginUser={loginUser} showInvalidUser={showInvalidUser} />} />
        <Route path='/cart' element={<Cart items={items} addToCart={addToCart} reduceQuantity={reduceQuantity} deleteCartItem={deleteCartItem} />} />
        <Route path='/productDetails' element={<ProductDetails product={oneProduct} addToCart={addToCart} />} />
        <Route path='/resetPassword' element={<ResetPassword users={users} updatePassword={updatePassword} />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/checkout' element={<Checkout items={items} addOrder={addOrder} />} />
        {searchOrderClicked ?<Route path='/orders' element={<Orders orders={searchedOrder} searchOrder={searchOrder} />} />
        :<Route path='/orders' element={<Orders orders={orders} searchOrder={searchOrder} />} />}
        <Route path='/order' element={<OrderDetails />}/>      
      </Routes>

    </>
  )
}

export default App