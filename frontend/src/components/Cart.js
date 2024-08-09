import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = ({ cart, removeFromCart, adjustQuantity }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1) {
      adjustQuantity(productId, quantity);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                min="1"
                className="quantity-input"
              />
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
      <div className="cart-checkout">
        <button className="btn checkout-btn" onClick={() => navigate('/checkout')} disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
