const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const { securityHeaders, errorHandler } = require('./middleware/security');
const { apiLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const careerRoutes = require('./routes/careerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Robust CORS configuration (Supports production frontend URL, Vercel deployments & local dev)
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://ndraisetechnonogies.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173'
    ].filter(Boolean).map(u => u.replace(/\/$/, ''));

    if (
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(securityHeaders);
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(apiLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NDRise Backend API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Unified API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', internshipRoutes);
app.use('/api', submissionRoutes);
app.use('/api', certificateRoutes);
app.use('/api', careerRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// Central Error Handler
app.use(errorHandler);

// Start server if executed directly
if (process.env.NODE_ENV !== 'test' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 NDRise Backend server running on port ${PORT}`);
  });
}


module.exports = app;
