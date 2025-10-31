import axios from 'axios'
import CheckoutHeader from './CheckoutHeader'
import './CheckoutPage.css'
import { useEffect, useState } from 'react'
import OrderSummary from './OrderSummary'
import PaymentSummary from './PaymentSummary'
export default function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
  //     .then((response) => {
  //       setDeliveryOptions(response.data);
  //     });

  //   axios.get('/api/payment-summary')
  //     .then((response) => {
  //       setPaymentSummary(response.data);
  //     })
  // }, []); 

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }

    fetchCheckoutData();
  }, [])

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }

    fetchCheckoutData();
  }, [cart])

  return (
    <>
      <link rel="icon" type="image/png" href="https://supersimple.dev/images/-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  )
}