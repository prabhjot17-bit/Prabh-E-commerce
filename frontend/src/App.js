import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart'; 

function App() {
  const [cart, setCart] = useState(() => {
    

    
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
  sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const adjustQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
      item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} adjustQuantity={adjustQuantity} />} />
        <Route path="/" element={<Products addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
