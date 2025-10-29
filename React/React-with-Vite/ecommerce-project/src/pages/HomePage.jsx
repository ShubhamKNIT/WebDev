import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import formatMoney from '../utils/money'
import './HomePage.css'

export default function HomePage({ cart }) {
  // JS fetch
  // fetch('http://localhost:3000/api/products') // fetch is a promise to get response in future
  //   .then((response) => { 
  //     // run code after promise is completed
  //     // console.log(response)
  //     response.json() // response is also a promise
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   })

  // fetch('http://localhost:3000/api/products')
  //   .then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     console.log(data);
  //   });

  const [products, setProducts] = useState([]);

  // axios to fetch the data 
  // inside useEffect to run code only once even though react rerender
  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        // console.log(response.data[0])
        setProducts(response.data);
      })
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="https://supersimple.dev/images/home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {
            products.map((product) => {
              return (
                <div key={product.id} className='product-container'>
                  <div className='product-image-container'>
                    <img className='product-image' src={product.image}/>
                  </div>

                  <div className="product-name limit-text-to-2-lines">
                    {product.name}
                  </div>

                  <div className="product-rating-container">
                    <img className="product-rating-stars"
                      src={`src/assets/images/ratings/rating-${product.rating.stars * 10}.png`} />
                    <div className="product-rating-count link-primary">
                      {product.rating.count}
                    </div>
                  </div>

                  <div className="product-price">
                    {formatMoney(product.priceCents)}
                  </div>

                  <div className="product-quantity-container">
                    <select>
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

                  <div className="added-to-cart">
                    <img src="src/assets/images/icons/checkmark.png" />
                    Added
                  </div>

                  <button className="add-to-cart-button button-primary">
                    Add to Cart
                  </button>
                </div>
              )
            })
          }

          {/* <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src="src/assets/images/products/athletic-cotton-socks-6-pairs.jpg" />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Black and Gray Athletic Cotton Socks - 6 Pairs
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="src/assets/images/ratings/rating-45.png" />
              <div className="product-rating-count link-primary">
                87
              </div>
            </div>

            <div className="product-price">
              $10.90
            </div>

            <div className="product-quantity-container">
              <select>
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

            <div className="added-to-cart">
              <img src="src/assets/images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>

          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src="src/assets/images/products/intermediate-composite-basketball.jpg" />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Intermediate Size Basketball
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="src/assets/images/ratings/rating-40.png" />
              <div className="product-rating-count link-primary">
                127
              </div>
            </div>

            <div className="product-price">
              $20.95
            </div>

            <div className="product-quantity-container">
              <select>
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

            <div className="added-to-cart">
              <img src="src/assets/images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div>

          <div className="product-container">
            <div className="product-image-container">
              <img className="product-image"
                src="src/assets/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" />
            </div>

            <div className="product-name limit-text-to-2-lines">
              Adults Plain Cotton T-Shirt - 2 Pack
            </div>

            <div className="product-rating-container">
              <img className="product-rating-stars"
                src="src/assets/images/ratings/rating-45.png" />
              <div className="product-rating-count link-primary">
                56
              </div>
            </div>

            <div className="product-price">
              $7.99
            </div>

            <div className="product-quantity-container">
              <select>
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

            <div className="added-to-cart">
              <img src="src/assets/images/icons/checkmark.png" />
              Added
            </div>

            <button className="add-to-cart-button button-primary">
              Add to Cart
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}