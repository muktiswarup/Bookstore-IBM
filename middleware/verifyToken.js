const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
exports.verifyToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Store the decoded token in the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  });
};
