import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  // Internal CSS styles as JS objects
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    content: {
      flex: 1,
      padding: '40px 20px',
      maxWidth: '900px',
      margin: 'auto',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
    },
    description: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      marginBottom: '30px',
      color: '#555',
    },
    sectionHeading: {
      fontSize: '1.8rem',
      marginTop: '40px',
      marginBottom: '15px',
      color: '#222',
    },
    list: {
      listStyle: 'none',
      paddingLeft: 0,
      fontSize: '1.1rem',
      color: '#444',
    },
    listItem: {
      marginBottom: '10px',
    },
    contactInfo: {
      fontSize: '1.1rem',
      marginTop: '15px',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.content}>
        <h1 style={styles.heading}>About MarketPlace</h1>

        <p style={styles.description}>
          <strong>MarketPlace</strong> is a modern platform designed to help vendors manage and sell their products efficiently, while providing customers with up-to-date information on daily market prices. Our goal is to empower small businesses, farmers, and vendors by offering digital tools that simplify product management and business growth.
        </p>

        <h2 style={styles.sectionHeading}>Key Features</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>🛒 Manage and update your products easily.</li>
          <li style={styles.listItem}>📊 View daily vegetable prices with real-time updates.</li>
          <li style={styles.listItem}>🔐 Secure login and user management using JWT authentication.</li>
          <li style={styles.listItem}>📈 Track and monitor your sales and inventory.</li>
          <li style={styles.listItem}>💬 Connect with customers through a simple and intuitive interface.</li>
        </ul>

        <h2 style={styles.sectionHeading}>Our Technology Stack</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>⚛️ <strong>Frontend:</strong> React.js</li>
          <li style={styles.listItem}>🛠️ <strong>Backend:</strong> Node.js & Express.js</li>
          <li style={styles.listItem}>💾 <strong>Database:</strong> MongoDB</li>
          <li style={styles.listItem}>🎨 <strong>Styling:</strong> CSS3</li>
          <li style={styles.listItem}>🔐 <strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
        </ul>

        <h2 style={styles.sectionHeading}>Contact Us</h2>
        <p style={styles.contactInfo}>
          Have questions or feedback? Reach out to us at{' '}
          <a href="mailto:marketplace@example.com" style={styles.link}>marketplace@example.com</a>.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default About;
