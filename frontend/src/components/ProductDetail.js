import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';

const ProductDetail = ({ addToCart, cart, removeFromCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (cart.some((item) => item._id === id)) {
      setIsAdded(true);
    }
  }, [cart, id]);

  const handleAddToCart = () => {
    if (isAdded) {
      removeFromCart(product._id);
    } else {
      addToCart(product);
    }
    setIsAdded(!isAdded);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price}</p>
        <p className="category">Category: {product.category}</p>
        <div className="product-buttons">
          <button
            className="btn add-to-cart"
            onClick={handleAddToCart}
            title={isAdded ? 'Click to remove from cart' : 'Click to add to cart'}
            style={isAdded ? { backgroundColor: '#ff6347' } : {}}
          >
            {isAdded ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          <button className="btn buy-now">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
