import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ndraise_super_secret_jwt_key_2026_change_in_production';

// Verify Authenticated Session Token (via HttpOnly cookie or Bearer token)
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies?.auth_token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please sign in.'
      });
    }

    // Verify JWT signature
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from DB using parameterized query to ensure account is active and role is valid
    const userRes = await query('SELECT id, name, email, role, lockout_until FROM users WHERE id = $1', [decoded.id]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'User session no longer valid.' });
    }

    const user = userRes.rows[0];

    // Check account lockout
    if (user.lockout_until && new Date(user.lockout_until) > new Date()) {
      return res.status(403).json({ success: false, error: 'Account is temporarily locked. Try again later.' });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired session token.'
    });
  }
};

// Enforce Role-Based Access Control (RBAC)
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden. You do not have permission to access this resource.'
      });
    }

    next();
  };
};

// Enforce IDOR / Resource Access Protection (User can only access their own data unless admin)
export const requireSelfOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  const requestedUserId = parseInt(req.params.id || req.params.userId || req.query.userId, 10);

  const isSelf = req.user.id === requestedUserId;
  const isAdmin = ['admin', 'super_admin'].includes(req.user.role);

  if (!isSelf && !isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden. You cannot access another user\'s private data.'
    });
  }

  next();
};
