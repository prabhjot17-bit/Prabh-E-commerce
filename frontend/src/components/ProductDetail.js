import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/');
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
          <button className="btn add-to-cart">Add to Cart</button>
          <button className="btn buy-now">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
