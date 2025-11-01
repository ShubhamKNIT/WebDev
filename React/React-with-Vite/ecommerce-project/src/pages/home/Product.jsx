import axios from "axios";
import formatMoney from "../../utils/money";
import { useState } from "react";

export default function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const addToCart = async () => {
    await axios.post('/api/cart-items', {
      productId: product.id,
      quantity: quantity
    });

    await loadCart();

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  return (
    <div className='product-container'
      data-testid="product-container">
      <div className='product-image-container'>
        {/* data-testid is specific id for testing */}
        <img 
          className='product-image' 
          data-testid="product-image"
          src={product.image} 
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`src/assets/images/ratings/rating-${product.rating.stars * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select data-testid="product-quantity-selector" value={quantity} onChange={(event) => {
          const quantitySelected = Number(event.target.value);
          setQuantity(quantitySelected);
          // console.log(quantitySelected);
        }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{opacity: addedToCart ? 1 : 0}}>
        <img src="src/assets/images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )

}