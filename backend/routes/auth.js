const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);


// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account', // Force account selection
  accessType: 'offline', // Request refresh token
  session: false // Disable session if using JWT
}));
  
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT for user
    const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Redirect to frontend with token as query param
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000/farmer'}?token=${token}`;
    res.redirect(redirectUrl);
  }
);
  // Logout route
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;