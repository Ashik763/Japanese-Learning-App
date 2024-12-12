const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyAdmin= (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: 'You are not authorized to access this' });
  }

  try {
    // Remove "Bearer " if token has the prefix
    // const accessToken = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Verify the token
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: 'You are not authorized to access this',error:err });
  }
};

module.exports = verifyAdmin;
