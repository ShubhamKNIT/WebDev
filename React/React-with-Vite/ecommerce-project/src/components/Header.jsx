import axios from "axios";
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router'
import './Header.css'

export default function Header({ cart }) {
  const [searchText, setSearchText] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  useEffect(() => {
    if (search) {
      const fetchSearch = async () => {
        await axios.get(`/api/products?search=${search}`);
      };

      fetchSearch();
    }
  }, [search]);

  function updateSearch(event) {
    setSearchText(event.target.value);
  }

  let navigate = useNavigate();
  function handleSearch () {
    if (searchText.trim()) {
      navigate(`/?search=${encodeURIComponent(searchText)}`);
    }
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
          <input className="search-bar" type="text" placeholder="Search" value={searchText} onChange={updateSearch} />

          <button className="search-button" onClick={handleSearch}>
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