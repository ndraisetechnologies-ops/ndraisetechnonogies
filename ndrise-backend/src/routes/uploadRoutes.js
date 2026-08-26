const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const ALLOWED_MIME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// POST /api/upload/resume (Secure File Upload Handler)
router.post('/resume', verifyToken, (req, res) => {
  try {
    const { filename, fileType, fileSize } = req.body || {};

    if (!filename || !fileType || !fileSize) {
      return res.status(400).json({ success: false, error: 'File metadata required.' });
    }

    if (fileSize > MAX_FILE_SIZE) {
      return res.status(400).json({ success: false, error: 'File size exceeds maximum 5MB limit.' });
    }

    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME_TYPES.includes(fileType)) {
      return res.status(400).json({ success: false, error: 'Invalid file type. Only PDF, DOC, DOCX, JPG, and PNG are allowed.' });
    }

    // Generate safe, non-guessable, sanitized filename
    const safeFilename = `upload_${req.user.id}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;

    return res.json({
      success: true,
      message: 'File metadata validated successfully.',
      safeFilename,
      fileUrl: `/uploads/${safeFilename}`
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Upload validation failed.' });
  }
});

module.exports = router;
