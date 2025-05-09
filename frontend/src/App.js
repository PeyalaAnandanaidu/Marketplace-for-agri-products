import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/land';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerProducts from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Homepage from './pages/home';
import Footer from './components/Footer';
import ProtectedRoute from './components/protectroutes';
import { AuthProvider } from './context/AuthContext';
import './App.css'; 

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<FarmerProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<Checkout />} />
        <Route path="/farmer" element={
                <Homepage />
            } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;