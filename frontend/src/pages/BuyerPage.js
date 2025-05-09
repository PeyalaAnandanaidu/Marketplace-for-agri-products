// BuyerPage.js
import React from 'react';
import Footer from '../components/Footer';

const BuyerPage = () => {
  return (
    <div>
        <Navbar />
      <h1>Welcome to the Buyer Dashboard</h1>
      <p>You are logged in as a buyer.</p>
      <Footer />
    </div>
  );
};

export default BuyerPage;