const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.redirect('/login');
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decodedToken.id;
    next();
  });
};

module.exports = { createToken, requireAuth };
