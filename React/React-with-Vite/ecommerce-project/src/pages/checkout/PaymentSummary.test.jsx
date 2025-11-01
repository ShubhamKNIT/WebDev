import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import PaymentSummary from './PaymentSummary';

vi.mock('axios');

describe('Payment Summary', () => {
  let paymentSummary, loadCart, user;
  beforeEach(() => {
    paymentSummary = {
      "totalItems": 3,
      "productCostCents": 6688,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 6688,
      "taxCents": 669,
      "totalCostCents": 7357
    }
    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('displays the payment summary', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
      </MemoryRouter>
    );
    
    // 1. getByText() + toBeInTheDocument()
    expect(screen.getByText('Items (3):')).toBeInTheDocument();

    // 2. within() + getByTestId() + toHaveContent()
    expect(
      within(screen.getByTestId('payment-summary-product-cost')).getByText('$66.88')
    ).toBeInTheDocument();

    // 3. getByTestId() + toHaveContext()
    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$0.00');

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$66.88');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$6.69');

    expect(
      screen.getByTestId('payment-summary-total')
    ).toHaveTextContent('$73.57');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
});