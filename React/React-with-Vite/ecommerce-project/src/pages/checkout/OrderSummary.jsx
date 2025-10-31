import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";
import DeliveryOptions from "./DeliveryOption";
export default function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions
              .find((deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              });
            return (
              <div className="cart-item-container" key={cartItem.product.id}>

                <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

                <div className="cart-item-details-grid">
                  <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                  <div className="delivery-options">
                    <div className="delivery-options-title">
                      Choose a delivery option:
                    </div>

                    <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  )
}