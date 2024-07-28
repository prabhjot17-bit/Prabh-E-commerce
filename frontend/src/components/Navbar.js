import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">PrabhStore</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
