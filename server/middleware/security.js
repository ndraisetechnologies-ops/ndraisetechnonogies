import helmet from 'helmet';

// Security Headers Middleware using Helmet
export const securityHeaders = helmet({
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
export const errorHandler = (err, req, res, next) => {
  // Log detailed internal server error only on backend server console
  console.error(`[SERVER ERROR] [${req.method} ${req.path}]:`, err.stack || err.message || err);

  // Send generic safe error message to clients to prevent exposing SQL/stack traces
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An internal server error occurred' : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

// Input Sanitization Helper
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};
