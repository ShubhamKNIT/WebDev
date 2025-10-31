import axios from 'axios';
import formatDate from "../../utils/date";
import formatMoney from "../../utils/money";

export default function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
  return (
    <>
      {
        deliveryOptions.map((deliveryOption) => {
          let priceString = 'FREE Shipping';

          if (deliveryOption.priceCents > 0) {
            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
          }

          const updateDeliveryOptions = async () => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id
            });
            // axios.method('api_url', {body object})
            await loadCart();
          }

          return (
            <div key={deliveryOption.id} className="delivery-option"
              onClick={updateDeliveryOptions}>
              <input type="radio"
                checked={cartItem.deliveryOptionId === deliveryOption.id}
                onChange={() => {}}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.product.id}`} />
              <div>
                <div className="delivery-option-date">
                  {formatDate(deliveryOption.estimatedDeliveryTimeMs)}
                  {/* Tuesday, June 21 */}
                </div>
                <div className="delivery-option-price">
                  {priceString}
                  {/* FREE Shipping */}
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}