const Order = require('../models/Order');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      products: [{ product: productId, quantity }],
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
};