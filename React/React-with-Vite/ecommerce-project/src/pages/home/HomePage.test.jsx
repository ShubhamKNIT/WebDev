import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router'; // specifically for test
import userEvent from '@testing-library/user-event';
import axios from 'axios'; 
import HomePage from './HomePage';

vi.mock('axios');

describe('HomePage Component', () => {
  let loadCart, user;
 
  beforeEach(() => {
    
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => { // runs fake function
      if (urlPath === '/api/products') {
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "src/assets/images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "src/assets/images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        }
      }
    });

    user = userEvent.setup();
  });

  it('displays the products correct', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart}/>
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container') // async code // since homepage would be loading
    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();
  });

  it('check add to cart button', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart}/>
      </MemoryRouter>
    );
    
    // test add-to-cart-button clicks and quantity-selectors of both the product container 
    const productContainers = await screen.findAllByTestId('product-container'); // async code // since homepage would be loading
    expect(productContainers.length).toBe(2);

    const quantitySelector1 = within(productContainers[0]).getByTestId('product-quantity-selector');
    expect(quantitySelector1).toHaveValue('1');
    await user.selectOptions(quantitySelector1, '2');
  
    const addToCartButton1 = within(productContainers[0]).getByTestId('add-to-cart-button');
    await user.click(addToCartButton1);

    const quantitySelector2 = within(productContainers[1]).getByTestId('product-quantity-selector');
    expect(quantitySelector2).toHaveValue('1');
    await user.selectOptions(quantitySelector2, '3');

    const addToCartButton2 = within(productContainers[1]).getByTestId('add-to-cart-button');
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  })
});