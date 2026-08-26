const rateLimit = require('express-rate-limit');

// Rate Limiting for Admin Login to prevent brute-force attacks
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // Maximum 5 failed attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many admin login attempts from this IP. Please try again after 15 minutes.'
  }
});

// General Login Limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: 'Too many login attempts. Please wait 15 minutes before trying again.'
  }
});

// General API Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please try again later.'
  }
});

module.exports = {
  adminLoginLimiter,
  loginLimiter,
  apiLimiter
};
