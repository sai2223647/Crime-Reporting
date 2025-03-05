const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};