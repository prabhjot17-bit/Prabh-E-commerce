import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          // i have to implement product details 
          // <Route path="/products/:id" element={<div>Product detail</div>} /> {}
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
