import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';
import { FaCartPlus, FaSpinner, FaImage } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, cartItems }) => {  // Add cartItems prop
  const { user } = useAuth();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Check if product already exists in cart
  const existingCartItem = cartItems?.find(item => item.productId === product._id);
  const currentQuantity = existingCartItem?.quantity || 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    
    try {
      await onAddToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: currentQuantity + 1  // Increment quantity if exists
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`} 
      data-testid="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id}`} className="product-image-link" aria-label={`View ${product.name} details`}>
        <div className="product-image-container">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">
              <FaSpinner className="spinner" aria-hidden="true" />
            </div>
          )}
          {imageError ? (
            <div className="image-error">
              <FaImage aria-hidden="true" />
              <span>Image not available</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className={`product-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
              loading="lazy"
            />
          )}
        </div>
      </Link>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <div className="product-actions">
          <button 
            onClick={handleAddToCart}
            className={`btn btn-add-to-cart  btn-info ${isAdding ? 'adding' : ''}`}
            aria-label={`Add ${product.name} to cart`}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <FaSpinner className="spinner-icon" aria-hidden="true" /> Adding...
              </>
            ) : (
              <>
                <FaCartPlus className="cart-icon" aria-hidden="true" /> 
                {currentQuantity > 0 ? `Add More (${currentQuantity})` : 'Add to Cart'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    farmer: PropTypes.shape({
      _id: PropTypes.string
    })
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }))
};

export default ProductCard;