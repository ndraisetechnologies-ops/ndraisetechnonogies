const helmet = require('helmet');

// Security Headers Middleware using Helmet
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});

// Centralized Safe Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(`[SERVER ERROR] [${req.method} ${req.path}]:`, err.stack || err.message || err);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An internal server error occurred' : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

// Input Sanitization Helper
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

module.exports = {
  securityHeaders,
  errorHandler,
  sanitizeInput
};
