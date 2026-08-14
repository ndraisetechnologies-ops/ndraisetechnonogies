const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ndraise_super_secret_jwt_key_2026_change_in_production';

function verifyToken(req, res, next) {
  let token = null;

  // 1. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2. Check auth_token cookie
  if (!token && req.cookies && req.cookies.auth_token) {
    token = req.cookies.auth_token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token.' });
  }
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, error: 'Forbidden. Admin access required.' });
  }
  next();
}

module.exports = {
  verifyToken,
  isAdmin
};
