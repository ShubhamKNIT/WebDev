import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './HomePage.css'
import ProductGrid from './ProductGrid'
import { useSearchParams } from 'react-router'

export default function HomePage({ cart, loadCart }) {
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
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  // axios to fetch the data 
  // inside useEffect to run code only once even though react rerender
  // useEffect(() => {
  //   axios.get('/api/products')
  //     .then((response) => {
  //       // console.log(response.data[0])
  //       setProducts(response.data);
  //     })
  // }, []);

  // useEffect does not allows to run promises
  // but we have a cheat to run promise inside the useEffect
  useEffect(() => {
    // 1. create a function 
    const getHomeData = async () => {
      // const response = await axios.get('/api/products');
      const urlPath = search ? `/api/products?search=${search}` : `/api/products`;
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    // 2. call it
    getHomeData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/png" href="https://supersimple.dev/images/home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}