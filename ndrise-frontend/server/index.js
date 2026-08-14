import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { securityHeaders, errorHandler } from './middleware/security.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(securityHeaders);
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(apiLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// Central Error Handler Middleware
app.use(errorHandler);

// Start server if executed directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[ND Raise Secure Backend Server] listening on port ${PORT}`);
  });
}

export default app;
