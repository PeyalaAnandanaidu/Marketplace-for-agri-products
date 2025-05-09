import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      } catch (error) {
        toast.error('Failed to load cart');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;

    setCartItems(prevItems => {
      const updatedCart = prevItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
  };

  const total = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    ).toFixed(2);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="page-container">
        <Navbar cartItems={cartItems} />
        <div className="loading-container">
          <div>Loading your cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar cartItems={cartItems} />
      <div className="content-wrap">
        <div className="cart-container">
          <h1 className="cart-title">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p className="empty-cart-message">Your cart is empty</p>
              <Link to="/products" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="cart-items-container">
                {cartItems.map(item => (
                  <div key={item.productId} className="cart-item">
                    <div>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="cart-item-image"
                      />
                    </div>
                    
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="remove-item-btn"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="order-summary">
                <h3 className="order-summary-title">Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${total}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
                
                <button
                  className="checkout-btn"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;