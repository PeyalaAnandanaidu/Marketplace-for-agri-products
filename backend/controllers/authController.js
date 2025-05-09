const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log('Registering user:', { name, email, role }); // Debugging

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email); // Debugging
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, password, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // user.password = password;

    // Save user to databaseconst isMatch = await bcrypt.compare(user.password, password);
    await user.save();
    console.log('User registered successfully:', user); // Debugging

    // Generate JWT
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Registration error:', err.message); // Debugging
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log('Login request:', { email }); // Debugging
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email); // Debugging
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check if password is correct
      console.log(user.password)
      console.log(password)
      const isMatch = await bcrypt.compare(password, user.password);
    //   const isMatch = password == user.password
      console.log(isMatch)
      if (!isMatch) {
        console.log('Invalid password for user:', email); // Debugging
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT
      const payload = { user: { id: user.id, role: user.role } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        console.log('Login successful, token generated:', token); // Debugging
        res.json({ token, role: user.role });
      });
    } catch (err) {
      console.error('Login error:', err.message); // Debugging
      res.status(500).send('Server error');
    }
  };