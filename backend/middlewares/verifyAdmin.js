const jwt = require('jsonwebtoken');

// Middleware to verify JWT and check admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: 'You are not authorized to access this' });
  }

  try {
    // Verify the token
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the role is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Attach user information to the request
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'You are not authorized to access this', error: err });
  }
};

module.exports = verifyAdmin;