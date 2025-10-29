import { Routes, Route } from 'react-router'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import NotFoundPage from './pages/not-found/NotFoundPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  // useEffect(() => {
  //   axios.get('/api/cart-items?expand=product')
  //     .then((response) => {
  //       // console.log(response.data);
  //       setCart(response.data);
  //     })
  // }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    };

    fetchAppData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />radio
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<NotFoundPage cart={cart} />} />
      </Routes>
    </>
  )
}

export default App
