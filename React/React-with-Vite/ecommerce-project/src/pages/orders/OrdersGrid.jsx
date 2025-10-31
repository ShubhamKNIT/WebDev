import axios from 'axios'
import { Link } from 'react-router'
import formatDate from "../../utils/date"
export default function OrdersGrid({ orderId, orderProduct, loadCart }) {  
  const addToCart = async () => {
    await axios.post('/api/cart-items', {
        productId: orderProduct.productId,
        quantity: 1
    });

    await loadCart();
  };
  
  return (
    <>
      <div className="order-details-grid">
        <div className="product-image-container">
          <img src={orderProduct.product.image} />
        </div>

        <div className="product-details">
          <div className="product-name">
            {orderProduct.name}
          </div>
          <div className="product-delivery-date">
            Arriving on: {formatDate(orderProduct.estimatedDeliveryTimeMs)}
          </div>
          <div className="product-quantity">
            Quantity: {orderProduct.quantity}
          </div>
          <button className="buy-again-button button-primary" 
            onClick={addToCart}>
            <img className="buy-again-icon" src="src/assets/images/icons/buy-again.png" />
            <span className="buy-again-message">Add to Cart</span>
          </button>
        </div>

        <div className="product-actions">
          <Link to={`/tracking/${orderId}/${orderProduct.productId}`}>
            <button className="track-package-button button-secondary">
              Track package
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}