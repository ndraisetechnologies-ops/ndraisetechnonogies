const express = require('express');
const prisma = require('../lib/prisma');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { sendCertificateNotificationEmail } = require('../utils/emailService');

const router = express.Router();

// POST /api/certificates/claim (Protected Student - Claim Certificate after completing all projects)
router.post('/certificates/claim', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { trackTitle } = req.body;

    // Fetch user details for email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    });

    // Check if user already claimed certificate for this track
    const existingCert = await prisma.certificate.findFirst({
      where: {
        userId,
        trackTitle: trackTitle || 'Web Development Virtual Internship'
      }
    });

    if (existingCert) {
      return res.status(200).json({
        success: true,
        message: 'Certificate already issued for this track!',
        certificate: existingCert
      });
    }

    // Generate unique code
    const certCode = `NDR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const certificate = await prisma.certificate.create({
      data: {
        certificateCode: certCode,
        userId,
        trackTitle: trackTitle || 'Web Development Virtual Internship',
        issueDate: new Date()
      }
    });

    // Dispatch Notification Email
    sendCertificateNotificationEmail({
      studentEmail: user?.email || 'student@example.com',
      studentName: user?.name || 'Student',
      trackTitle: trackTitle || 'Web Development Virtual Internship',
      certificateCode: certCode
    }).catch((e) => console.error('Async email error:', e));

    return res.status(201).json({
      success: true,
      message: 'Official Verifiable Certificate & LOR claimed successfully!',
      certificate
    });
  } catch (error) {
    console.error('Claim certificate error:', error);
    return res.status(500).json({ success: false, error: 'Failed to claim certificate. Please try again.' });
  }
});

// GET /api/certificates/my (Protected Student - Fetch earned certificates)
router.get('/certificates/my', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      orderBy: { issueDate: 'desc' }
    });

    return res.json({ success: true, certificates });
  } catch (error) {
    console.error('Fetch my certificates error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch certificates.' });
  }
});

// GET /api/admin/certificates (Protected Admin - Fetch all issued certificates)
router.get('/admin/certificates', verifyToken, isAdmin, async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { issueDate: 'desc' }
    });

    return res.json({ success: true, certificates });
  } catch (error) {
    console.error('Admin fetch certificates error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch certificates registry.' });
  }
});

module.exports = router;
