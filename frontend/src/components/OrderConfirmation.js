import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, address, totalPrice, cart } = location.state || {};

  if (!cart || cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="order-confirmation">
      <h2>Order Confirmed!</h2>
      <div className="order-details">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Address:</strong> {address}</p>
        <h3>Products:</h3>
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.name} x {item.quantity} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
      <button onClick={() => navigate('/')} className="btn">Go to Homepage</button>
    </div>
  );
};

export default OrderConfirmation;
