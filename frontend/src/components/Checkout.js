import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      navigate('/');
    } else {
      clearCart();
      navigate('/order-confirmation', {
        state: {
          name,
          address,
          totalPrice,
          cart,
        },
      });
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-products">
        <h3>Products</h3>
        {cart.map((item) => (
          <div key={item._id} className="checkout-product-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="checkout-product-info">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
        <div className="checkout-total">
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
      <form onSubmit={handleCheckout}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            pattern="\d{16}"
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            maxLength="5"
            pattern="\d{2}/\d{2}"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength="3"
            pattern="\d{3}"
            required
          />
        </div>
        <button type="submit" className="btn checkout-btn">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
