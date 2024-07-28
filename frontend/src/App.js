import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';


function App() {
  return (
    <Router>
      <div className="App">
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
