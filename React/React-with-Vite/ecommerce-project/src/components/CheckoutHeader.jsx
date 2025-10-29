import { NavLink } from 'react-router'
import './CheckoutHeader.css'

export default function CheckoutHeader() {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <NavLink to="/">
              <img className="logo" src="src/assets/images/logo.png" />
              <img className="mobile-logo" src="src/assets/images/mobile-logo.png" />
            </NavLink>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<NavLink className="return-to-home-link"
              to="/">3 items</NavLink>)
          </div>

          <div className="checkout-header-right-section">
            <img src="src/assets/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  )
}