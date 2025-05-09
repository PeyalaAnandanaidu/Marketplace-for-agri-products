module.exports = (req, res, next) => {
    if (req.user?.role !== 'farmer') {
      return res.status(403).json({ 
        error: 'Farmer access required',
        message: 'Only farmers can perform this action' 
      });
    }
    next();
  };