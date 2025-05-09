import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const [vegetableCosts, setVegetableCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vegetable costs from backend
  useEffect(() => {
    const fetchVegetableCosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Adjust backend URL if deployed
        const data = await response.json();
        setVegetableCosts(data);
      } catch (error) {
        console.error('Error fetching vegetable costs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVegetableCosts();
  }, []);

  // JWT decode logic (same as before)
  const token = localStorage.getItem('token');
  const userInfo = (() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn('Token expired');
        localStorage.removeItem('token');
        return null;
      }
      return decoded;
    } catch {
      console.error('Invalid token');
      return null;
    }
  })();

  return (
    <div className="homepage-container">
      <Navbar />

      <div className="homepage-content">
        <h1 className="welcome-heading">Welcome To MarketPlace</h1>

        {userInfo ? (
          <p className="welcome-text">Hello <strong>{userInfo.email}</strong>, manage your products and grow your business.</p>
        ) : (
          <p className="welcome-text">Please <Link to="/login">login</Link> to manage your products and grow your business.</p>
        )}

        <p className="action-text">
          You can add, update, and manage your products on the{' '}
          <Link to="/products" className="products-link">
            Products Page
          </Link>.
        </p>

        {/* Daily Vegetable Costs Section */}
        <div className="vegetable-costs">
          <h2 className="section-heading">Daily Vegetable Costs</h2>

          {loading ? (
            <p>Loading vegetable prices...</p>
          ) : (
            <table className="cost-table">
              <thead>
                <tr>
                  <th>Vegetable</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {vegetableCosts.map((vegetable, index) => (
                  <tr key={index}>
                    <td>{vegetable.name}</td>
                    <td>{vegetable.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
