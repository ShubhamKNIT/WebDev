import dayjs from 'dayjs';
import axios from 'axios';
import { Link, useParams } from 'react-router'
import Header from '../../components/Header'
import './TrackingPage.css'
import { useEffect, useState } from 'react';
import formatDate from '../../utils/date';

export default function TrackingPage({ cart }) {
  // const params = useParams();
  // console.log(params);

  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchTrackingPageData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };

    fetchTrackingPageData();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      const _product = order.products.find(p => p.productId === productId);
      setProduct(_product);
    }
  }, [order, productId]);

  if (!order || !product) {
    return (
      <>
        <div>Tracking Details Not Found</div>
      </>
    )
  }

  const totalDeliveryTimeMs = product.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  // const timePassedMs = totalDeliveryTimeMs * 0.3;
  const deliveryPercent = Math.min(100, (timePassedMs / totalDeliveryTimeMs) * 100);
  let isPreparing = false;
  let isShipped = false;
  let isDelivered = false;
  if (deliveryPercent < 33) {
    isPreparing = true;
  } else if (deliveryPercent < 100) {
    isShipped = true;
  } else {
    isDelivered = true;
  }
  
  return (
    <>
      <link rel="icon" type="image/png" href="https://supersimple.dev/images/tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {/* Arriving on Monday, June 13 */}
            Arriving on {formatDate(product.estimatedDeliveryTimeMs)}
          </div>

          <div className="product-info">
            {/* Black and Gray Athletic Cotton Socks - 6 Pairs */}
            {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          {/* <img className="product-image" src="src/assets/images/products/athletic-cotton-socks-6-pairs.jpg" /> */}
          <img className="product-image" src={product.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

// style={{width: '#{deliveryPercent}% }}.