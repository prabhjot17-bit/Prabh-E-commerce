import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' });
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToUpdate, setCategoryToUpdate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const navigate = useNavigate();
  const API_URL = 'http://localhost:4000/api';
  const hasTriedLogin = useRef(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLogin = async () => {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');

    try {
      const response = await axios.post(`${API_URL}/admin/login`, { username, password });
      if (response.data.token) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid credentials');
        navigate('/');
      }
    } catch (error) {
      alert('Invalid credentials');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !hasTriedLogin.current) {
      hasTriedLogin.current = true;
      handleLogin();
    }
  }, [isAuthenticated]);

  const handleAddProduct = async () => {
    try {
      await axios.post(`${API_URL}/products`, newProduct);
      setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '' });
      fetchProducts();
      if (!categories.includes(newProduct.category)) {
        setCategories((prevCategories) => [...prevCategories, newProduct.category]);
      }
      setStatusMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      setStatusMessage('Failed to add product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      fetchProducts();
      setStatusMessage('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      setStatusMessage('Failed to delete product.');
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`${API_URL}/categories/${categoryToUpdate}`, { newCategory: newCategoryName });
      setCategoryToUpdate('');
      setNewCategoryName('');
      fetchCategories();
      fetchProducts();
      setStatusMessage('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      setStatusMessage('Failed to update category.');
    }
  };

  const handleDeleteCategory = async (category) => {
    try {
      await axios.delete(`${API_URL}/categories/${category}`);
      fetchCategories();
      fetchProducts();
      setStatusMessage('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      setStatusMessage('Failed to delete category.');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {statusMessage && <div className="status-message">{statusMessage}</div>}
      <div className="admin-section">
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <div className="category-select">
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option value="">Select Existing Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or enter new category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </div>
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="admin-section">
        <h2>Manage Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-section">
        <h2>Manage Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <input
                type="text"
                value={categoryToUpdate === category ? newCategoryName : category}
                onChange={(e) => {
                  setCategoryToUpdate(category);
                  setNewCategoryName(e.target.value);
                }}
              />
              <button onClick={handleUpdateCategory}>Update</button>
              <button onClick={() => handleDeleteCategory(category)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
