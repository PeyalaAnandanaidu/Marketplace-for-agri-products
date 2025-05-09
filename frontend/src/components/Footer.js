import React, { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  useEffect(() => {
    // Chatling config
    window.chtlConfig = { chatbotId: '9757819188' };

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://chatling.ai/js/embed.js';
    script.async = true;
    script.setAttribute('data-id', '9757819188');
    script.id = 'chatling-embed-script';

    // Append script to body (or head)
    document.body.appendChild(script);

    // Clean up script on unmount (optional but good practice)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '20px',
        marginTop: 'auto',
        backgroundColor: '#001f3f',
        color: '#ffffff',
      }}
    >
      <p style={{ margin: 0, fontSize: '1rem' }}>
        &copy; 2023 Marketplace. All rights reserved.
      </p>
      <div style={{ marginTop: '10px' }}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffffff', margin: '0 10px' }}
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffffff', margin: '0 10px' }}
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffffff', margin: '0 10px' }}
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
