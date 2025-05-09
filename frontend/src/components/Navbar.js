import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleProductsClick = () => {
    navigate('/products', { state: { showAddProduct: true } });
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#001f3f' }}>
      <Container>
        <Navbar.Brand as={Link} to="/farmer" style={{ color: '#ffffff' }}>
          Marketplace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/farmer" style={{ color: '#ffffff' }}>
              Home
            </Nav.Link>
            <Nav.Link
              onClick={handleProductsClick}
              style={{ color: '#ffffff', cursor: 'pointer' }}
            >
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: '#ffffff' }}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={handleCartClick}
              style={{ color: '#ffffff', marginRight: '15px' }}
            >
              <FaShoppingCart size={20} />
            </Nav.Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
