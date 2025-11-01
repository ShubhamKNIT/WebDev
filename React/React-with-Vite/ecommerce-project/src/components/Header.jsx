import axios from "axios";
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router'
import './Header.css'

export default function Header({ cart }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search) {
      const fetchSearch = async () => {
        await axios.get(`/api/products?search=${search}`);
      };

      fetchSearch();
    }
  }, [search]);

  function updateSearch(event) {
    setSearch(event.target.value);
  }

  const searchProducts = () => {
    // console.log(search);
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src="src/assets/images/logo-white.png" />
            <img className="mobile-logo"
              src="/images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearch} />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src="/images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="src/assets/images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  )
}