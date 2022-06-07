import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';

export default function CartButton() {
  const { cart } = useContext(CustomerContext);
  const [total, setTotal] = useState('0');

  const navigate = useNavigate();

  useEffect(() => {
    const getTotalPrice = () => {
      const price = cart.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
      setTotal(price.toFixed(2));
    };

    getTotalPrice();
  }, [cart]);

  return (
    <button
      data-testid="customer_products__button-cart"
      disabled={ cart.length === 0 }
      onClick={ () => navigate('/customer/checkout') }
      type="button"
    >
      Ver Carrinho: R$
      <span
        data-testid="customer_products__checkout-bottom-value"
      >
        { total.replace('.', ',') }
      </span>
    </button>
  );
}