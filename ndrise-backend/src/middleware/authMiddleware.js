const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const JWT_SECRET = process.env.JWT_SECRET || 'ndraise_super_secret_jwt_key_2026_change_in_production';

async function verifyToken(req, res, next) {
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
    return res.status(401).json({ success: false, error: 'Authentication required. Please sign in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Optional DB check to verify account active & not locked
    const user = await prisma.user.findUnique({
      where: { id: String(decoded.id) },
      select: { id: true, name: true, email: true, role: true, lockoutUntil: true }
    });

    if (!user) {
      return res.status(401).json({ success: false, error: 'User session no longer valid.' });
    }

    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      return res.status(403).json({ success: false, error: 'Account is temporarily locked. Try again later.' });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
  }
}

function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }
  const role = String(req.user.role || '').toUpperCase();
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    return res.status(403).json({ success: false, error: 'Forbidden. You do not have permission to access this resource.' });
  }
  next();
}

function requireRole(...allowedRoles) {
  const normalizedAllowed = allowedRoles.map(r => String(r).toUpperCase());

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    const userRole = String(req.user.role || '').toUpperCase();

    if (!normalizedAllowed.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden. You do not have permission to access this resource.'
      });
    }

    next();
  };
}

function requireSelfOrAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  const requestedUserId = req.params.id || req.params.userId || req.query.userId;
  const isSelf = String(req.user.id) === String(requestedUserId);
  const userRole = String(req.user.role || '').toUpperCase();
  const isAdminUser = ['ADMIN', 'SUPER_ADMIN'].includes(userRole);

  if (!isSelf && !isAdminUser) {
    return res.status(403).json({
      success: false,
      error: "Forbidden. You cannot access another user's private data."
    });
  }

  next();
}

module.exports = {
  verifyToken,
  isAdmin,
  requireRole,
  requireSelfOrAdmin
};
