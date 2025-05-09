import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FarmerProducts = ({ farmerId }) => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'vegetables',
    stock: '0'
  });

  // Load products and cart on component mount
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    loadCart();
    fetchProducts();
  }, [farmerId]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again.');
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Handle adding to cart
  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(item => item.productId === productToAdd.productId);
      
      let updatedCart;
      if (existingItem) {
        // If exists, increment quantity
        updatedCart = prevItems.map(item =>
          item.productId === productToAdd.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add to cart with quantity 1
        updatedCart = [...prevItems, { ...productToAdd, quantity: 1 }];
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success(`${productToAdd.name} added to cart!`);
      return updatedCart;
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0,
        farmerId
      };
      
      const response = await axios.post('http://localhost:5000/api/products', productToAdd);
      
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'vegetables',
        stock: '0'
      });
      setShowForm(false);
      toast.success('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      toast.error('Failed to add product');
    }
  };

  

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <Navbar cartItems={cartItems} />
        <div className="content-wrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <div>Loading products...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="page-container">
        <Navbar cartItems={cartItems} />
        <div className="content-wrap" style={{ textAlign: 'center', padding: '2rem', color: '#dc3545' }}>
          <div>{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Main render
  return (
    <div className="page-container">
      <Navbar cartItems={cartItems} />
      <div className="content-wrap">
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#2c3e50', fontSize: '2rem', fontWeight: '600', margin: 0 }}>Products</h2>
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)} 
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                + Add Product
              </button>
            )}
          </div>
          
          {showForm && (
            <form onSubmit={handleSubmit} style={{
              backgroundColor: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#2c3e50', fontSize: '1.25rem', margin: 0 }}>Add New Product</h3>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6c757d'
                  }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ced4da',
                      borderRadius: '4px'
                    }}
                    required
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price* ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ced4da',
                      borderRadius: '4px'
                    }}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description*</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    minHeight: '80px'
                  }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Image URL*</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ced4da',
                    borderRadius: '4px'
                  }}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button type="submit" style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Add Product
                </button>
              </div>
            </form>
          )}

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              {!showForm && <p>You haven't added any products yet.</p>}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {products.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  cartItems={cartItems}
                  
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerProducts;