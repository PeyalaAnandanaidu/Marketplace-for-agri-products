import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import './land.css'; // Import Home.css

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">
          Welcome to the{' '}
          <TypeAnimation
            sequence={[
              'Marketplace',
              1000, // Wait 1 second
              'Farmers Hub',
              1000,
              'Fresh Produce',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="home-description">
          Buy fresh agricultural products directly from farmers. Explore our wide range of products and enjoy the best prices!
        </p>
        <div className="home-button">
          <Button variant="primary" onClick={() => navigate('/login')}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;