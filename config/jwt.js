const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'a3c8e4e25791d62f051a77a308c3195e1e2e34b28e32821be70e5da07561d0a2';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
