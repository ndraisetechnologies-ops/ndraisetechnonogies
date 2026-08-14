import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';
import { loginLimiter, adminLoginLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/auth.js';
import { logAuditEvent } from '../middleware/auditLogger.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'ndraise_super_secret_jwt_key_2026_change_in_production';

// Cookie Configuration helper (HttpOnly, SameSite, Secure in prod)
const setAuthCookie = (res, token) => {
  res.cookie('auth_token', token, {
    httpOnly: true, // Prevents JavaScript document.cookie access (XSS defense)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
};

// Generic invalid credentials message to prevent user enumeration
const GENERIC_AUTH_ERROR = 'Invalid email or password.';

// POST /api/auth/login (Student / General Login)
router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    // Parameterized SQL query - completely safe against SQL Injection
    const userRes = await query('SELECT * FROM users WHERE email = $1', [email]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    const user = userRes.rows[0];

    // Password Hash verification using bcrypt
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      await logAuditEvent({
        actorEmail: email,
        action: 'FAILED_LOGIN',
        req,
        metadata: { roleAttempted: user.role }
      });
      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    setAuthCookie(res, token);

    await logAuditEvent({
      actorId: user.id,
      actorEmail: user.email,
      action: 'USER_LOGIN',
      req,
      metadata: { role: user.role }
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/admin-login (Admin & Super Admin Login with Rate Limiting & Account Lockout)
router.post('/admin-login', adminLoginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    // Parameterized SQL query
    const userRes = await query('SELECT * FROM users WHERE email = $1', [email]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    const user = userRes.rows[0];

    // Verify user role is admin or super_admin
    if (!['admin', 'super_admin'].includes(user.role)) {
      await logAuditEvent({
        actorEmail: email,
        action: 'UNAUTHORIZED_ADMIN_LOGIN_ATTEMPT',
        req,
        metadata: { role: user.role }
      });
      return res.status(403).json({ success: false, error: 'Access denied. Account is not an administrator.' });
    }

    // Verify account lockout
    if (user.lockout_until && new Date(user.lockout_until) > new Date()) {
      return res.status(429).json({
        success: false,
        error: 'Account temporarily locked due to repeated failed login attempts. Try again later.'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      const newFailed = (user.failed_login_attempts || 0) + 1;
      let lockout = null;

      if (newFailed >= 5) {
        lockout = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      }

      await query('UPDATE users SET failed_login_attempts = $1, lockout_until = $2 WHERE email = $3', [
        newFailed, lockout, email
      ]);

      await logAuditEvent({
        actorId: user.id,
        actorEmail: user.email,
        action: 'FAILED_ADMIN_LOGIN',
        req,
        metadata: { failedAttempts: newFailed, lockedOut: !!lockout }
      });

      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    // Reset failed attempts on success
    await query('UPDATE users SET failed_login_attempts = 0, lockout_until = NULL WHERE email = $1', [email]);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    setAuthCookie(res, token);

    await logAuditEvent({
      actorId: user.id,
      actorEmail: user.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      req,
      metadata: { role: user.role }
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/register (Student Account Registration)
router.post('/register', loginLimiter, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    const existingRes = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingRes.rows.length > 0) {
      return res.status(400).json({ success: false, error: 'Email address is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUserRes = await query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, passwordHash, 'student']
    );

    const newUser = newUserRes.rows[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    setAuthCookie(res, token);

    await logAuditEvent({
      actorId: newUser.id,
      actorEmail: newUser.email,
      action: 'STUDENT_REGISTERED',
      req
    });

    return res.status(201).json({
      success: true,
      user: newUser,
      token
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me (Current Session Verification)
router.get('/me', verifyToken, (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
});

// POST /api/auth/logout (Session Invalidation)
router.post('/logout', verifyToken, async (req, res) => {
  res.clearCookie('auth_token');

  await logAuditEvent({
    actorId: req.user.id,
    actorEmail: req.user.email,
    action: 'LOGOUT',
    req
  });

  return res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
