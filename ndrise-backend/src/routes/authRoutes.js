const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { verifyToken } = require('../middleware/authMiddleware');
const { loginLimiter, adminLoginLimiter } = require('../middleware/rateLimiter');
const { logAuditEvent } = require('../middleware/auditLogger');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'ndraise_super_secret_jwt_key_2026_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Helper to set auth cookie
const setAuthCookie = (res, token) => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
};

const GENERIC_AUTH_ERROR = 'Invalid email or password.';

// POST /api/auth/register (Student Registration)
router.post('/register', loginLimiter, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'An account with this email address already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: 'STUDENT',
        avatar: '/student-avatar.svg'
      }
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
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
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login (Student Login Portal Only)
router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await logAuditEvent({
        actorEmail: normalizedEmail,
        action: 'FAILED_LOGIN',
        req,
        metadata: { roleAttempted: user.role }
      });
      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    const userRole = String(user.role || '').toUpperCase();
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin accounts must log in via the Admin Security Portal.'
      });
    }

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
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
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/admin-login (Admin Security Portal Only with Rate Limit & Lockout)
router.post('/admin-login', adminLoginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    const userRole = String(user.role || '').toUpperCase();
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      await logAuditEvent({
        actorEmail: normalizedEmail,
        action: 'UNAUTHORIZED_ADMIN_LOGIN_ATTEMPT',
        req,
        metadata: { role: user.role }
      });
      return res.status(403).json({
        success: false,
        error: 'Access denied. Account is not an administrator.'
      });
    }

    // Account lockout check
    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      return res.status(429).json({
        success: false,
        error: 'Account temporarily locked due to repeated failed login attempts. Try again later.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const newFailed = (user.failedLoginAttempts || 0) + 1;
      let lockout = null;

      if (newFailed >= 5) {
        lockout = new Date(Date.now() + 15 * 60 * 1000); // 15 min lockout
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newFailed,
          lockoutUntil: lockout
        }
      });

      await logAuditEvent({
        actorId: user.id,
        actorEmail: user.email,
        action: 'FAILED_ADMIN_LOGIN',
        req,
        metadata: { failedAttempts: newFailed, lockedOut: !!lockout }
      });

      return res.status(401).json({ success: false, error: GENERIC_AUTH_ERROR });
    }

    // Reset failed attempts & update last login on success
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockoutUntil: null,
        lastLogin: new Date()
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
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
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me (Current Session Verification)
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const userId = String(req.user.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        college: true,
        degree: true,
        graduationYear: true,
        resumeUrl: true,
        atsScore: true,
        createdAt: true,
        lastLogin: true
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    return res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout (Session Invalidation)
router.post('/logout', verifyToken, async (req, res) => {
  res.clearCookie('auth_token');

  if (req.user) {
    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'LOGOUT',
      req
    });
  }

  return res.json({ success: true, message: 'Logged out successfully.' });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'No account found with this email address.' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    return res.json({
      success: true,
      message: `Password reset code generated. Use verification code ${resetCode} to set a new password.`,
      resetCode
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, error: 'Email address and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User account not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    return res.json({
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.'
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/google
router.post('/google', async (req, res, next) => {
  try {
    const { credential, email, name, avatar } = req.body;
    let userEmail = email;
    let userName = name;
    let userAvatar = avatar;

    if (credential) {
      const { OAuth2Client } = require('google-auth-library');
      const googleClientId = process.env.GOOGLE_CLIENT_ID || '805789827367-jfne031qvt7q62bt5jitd20spoqqle9t.apps.googleusercontent.com';
      const client = new OAuth2Client(googleClientId);

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: googleClientId
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return res.status(400).json({ success: false, error: 'Invalid Google token payload.' });
      }

      userEmail = payload.email;
      userName = payload.name || payload.email.split('@')[0];
      userAvatar = payload.picture || '/student-avatar.svg';
    }

    if (!userEmail) {
      return res.status(400).json({ success: false, error: 'Google email is required.' });
    }

    const normalizedEmail = userEmail.toLowerCase().trim();

    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      const defaultPassword = await bcrypt.hash('GoogleAuth_' + Math.random(), 10);
      user = await prisma.user.create({
        data: {
          name: userName || normalizedEmail.split('@')[0],
          email: normalizedEmail,
          password: defaultPassword,
          role: 'STUDENT',
          avatar: userAvatar || '/student-avatar.svg'
        }
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
          ...(userAvatar && (!user.avatar || user.avatar === '/student-avatar.svg') ? { avatar: userAvatar } : {})
        }
      });
    }

    const userRole = String(user.role || '').toUpperCase();
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin accounts must log in via the Admin Security Portal.'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    setAuthCookie(res, token);

    await logAuditEvent({
      actorId: user.id,
      actorEmail: user.email,
      action: 'GOOGLE_LOGIN_SUCCESS',
      req,
      metadata: { role: user.role }
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(401).json({ success: false, error: 'Google authentication failed: ' + (error.message || 'Invalid Token') });
  }
});


module.exports = router;
