const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyAdmin= (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: 'You are not authorized to access this' });
  }

  try {
    
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.role) {
      return res.status(403).json({ message: 'Access denied. Authorized user only.' });
    }
    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'You are not authorized to access this',error:err });
  }
};

module.exports = verifyAdmin;
