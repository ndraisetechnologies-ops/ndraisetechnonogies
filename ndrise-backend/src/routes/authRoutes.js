const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { verifyToken } = require('../middleware/authMiddleware');

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
// Auto-seed default Admin & Super Admin accounts into Neon PostgreSQL
(async function seedDefaultAdmins() {
  try {
    const defaultAccounts = [
      {
        name: 'NDRise Admin',
        email: 'admin@ndtech.com',
        password: 'Admin123!',
        role: 'ADMIN',
        avatar: '/admin-avatar.svg'
      },
      {
        name: 'NDRaise Admin',
        email: 'admin@ndraise.com',
        password: 'admin123',
        role: 'ADMIN',
        avatar: '/admin-avatar.svg'
      },
      {
        name: 'NDRaise Super Admin',
        email: 'superadmin@ndraise.com',
        password: 'superadmin123',
        role: 'SUPER_ADMIN',
        avatar: '/admin-avatar.svg'
      }
    ];

    for (const acc of defaultAccounts) {
      const existing = await prisma.user.findUnique({
        where: { email: acc.email }
      });

      const hashedPassword = await bcrypt.hash(acc.password, 10);

      if (!existing) {
        await prisma.user.create({
          data: {
            name: acc.name,
            email: acc.email,
            password: hashedPassword,
            role: acc.role,
            avatar: acc.avatar
          }
        });
        console.log(`✅ Created default account in Neon PostgreSQL: ${acc.email} / ${acc.password} (${acc.role})`);
      } else {
        await prisma.user.update({
          where: { email: acc.email },
          data: {
            password: hashedPassword,
            role: acc.role
          }
        });
        console.log(`✅ Updated account in Neon PostgreSQL: ${acc.email} / ${acc.password} (${acc.role})`);
      }
    }
  } catch (err) {
    console.error('Admin auto-seed error:', err);
  }
})();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = (role && role.toUpperCase() === 'ADMIN') ? 'ADMIN' : 'STUDENT';

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: userRole,
        avatar: '/student-avatar.svg'
      }
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    setAuthCookie(res, token);

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
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, error: 'Failed to register account. Please try again.' });
  }
});

// POST /api/auth/login (Student Login Portal Only)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Role Guard: Reject Admin / Super Admin accounts on Student Login
    const userRole = (user.role || '').toUpperCase();
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
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Login failed. Please try again.' });
  }
});

// POST /api/auth/admin-login (Admin Security Portal Only)
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    const userRole = (user?.role || '').toUpperCase();
    if (!user || (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN')) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: Student accounts cannot log in through the Admin Security Portal.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    setAuthCookie(res, token);

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
    console.error('Admin Login error:', error);
    return res.status(500).json({ success: false, error: 'Admin login failed.' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
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
        createdAt: true
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
    console.error('Get user profile error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch user profile.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
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
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process forgot password request.' });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, error: 'Email address and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
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
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, error: 'Failed to reset password.' });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { email, name, avatar } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Google email is required.' });
    }

    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      const defaultPassword = await bcrypt.hash('GoogleAuth_' + Math.random(), 10);
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email: email.toLowerCase(),
          password: defaultPassword,
          role: 'STUDENT',
          avatar: avatar || '/student-avatar.svg'
        }
      });
    }

    // Role Guard: Admin users cannot log in via student Google auth
    const userRole = (user.role || '').toUpperCase();
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
    console.error('Google auth error:', error);
    return res.status(500).json({ success: false, error: 'Google authentication failed.' });
  }
});

module.exports = router;
