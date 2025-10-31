import axios from "axios";
import formatMoney from "../../utils/money";
import { useState } from "react";

export default function CartItemDetails({ cartItem, loadCart }) {
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const [update, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  async function toggleUpdate() {
    if (update) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        "quantity": quantity
      });
      await loadCart();
    }

    setUpdate(!update);
  }
  
  function checkKeyDown(event) {
    if (update) {
      if (event.key === 'Enter') {
        toggleUpdate();
      }
      else if (event.key === 'Escape') {
        setQuantity(cartItem.quantity);
        setUpdate(false);
      }
    }
  }

  function updateQuantity(event) {
    setQuantity(Number(event.target.value));
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {update &&
              <input className="input-product-quantity"
                type="text" value={quantity}
                onChange={updateQuantity} 
                onKeyDown={checkKeyDown}
                autoFocus
              />
            }
            <span className="quantity-label">{cartItem.quantity}
            </span>
          </span>
          <span className="update-quantity-link link-primary"
            onClick={toggleUpdate}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}