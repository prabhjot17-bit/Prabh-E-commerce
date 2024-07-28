import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Products.css';

const Products = ({ addToCart, cart, removeFromCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const isAdded = cart.some(item => item._id === product._id);
    if (isAdded) {
      removeFromCart(product._id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="products">
      <h1>Products</h1>
      <div className="product-list">
        {products.map(product => {
          const isAdded = cart.some(item => item._id === product._id);
          return (
            <div key={product._id} className="product-item">
              <h2>{product.name}</h2>
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
              <p className="price">Price: ${product.price}</p>
              <div className="product-buttons">
                <button
                  className="btn add-to-cart"
                  onClick={() => handleAddToCart(product)}
                  title={isAdded ? 'Click to remove from cart' : 'Click to add to cart'}
                  style={isAdded ? { backgroundColor: '#ff6347' } : {}}
                >
                  {isAdded ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <button className="btn buy-now">Buy</button>
                <Link to={`/products/${product._id}`} className="more-info">
                  <button className="btn more-info">Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
