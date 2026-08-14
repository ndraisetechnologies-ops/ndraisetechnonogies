const express = require('express');
const prisma = require('../lib/prisma');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/submissions (Protected - Students submit project)
router.post('/submissions', verifyToken, async (req, res) => {
  try {
    const { projectTitle, domain, fileUrl } = req.body;
    const userId = req.user.id;

    if (!projectTitle || !fileUrl) {
      return res.status(400).json({
        success: false,
        error: 'Project title and file URL / repository link are required.'
      });
    }

    const submission = await prisma.submission.create({
      data: {
        userId,
        projectTitle,
        domain: domain || 'Software Development',
        fileUrl,
        status: 'PENDING'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Project submitted successfully for review!',
      submission
    });
  } catch (error) {
    console.error('Create submission error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit project. Please try again.' });
  }
});

// GET /api/submissions/my (Protected - Student fetches their submissions)
router.get('/submissions/my', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const submissions = await prisma.submission.findMany({
      where: { userId },
      orderBy: { submittedAt: 'desc' }
    });

    return res.json({ success: true, submissions });
  } catch (error) {
    console.error('Fetch my submissions error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch submissions.' });
  }
});

// GET /api/admin/submissions (Protected Admin - View all submissions)
router.get('/admin/submissions', verifyToken, isAdmin, async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, avatar: true }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    return res.json({ success: true, submissions });
  } catch (error) {
    console.error('Admin fetch submissions error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch student submissions.' });
  }
});

// PATCH /api/admin/submissions/:id/status (Protected Admin - Approve/Reject)
router.patch('/admin/submissions/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || (status !== 'APPROVED' && status !== 'REJECTED' && status !== 'PENDING')) {
      return res.status(400).json({ success: false, error: 'Invalid status. Must be APPROVED, REJECTED, or PENDING.' });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: { status }
    });

    return res.json({
      success: true,
      message: `Submission status updated to ${status}`,
      submission: updated
    });
  } catch (error) {
    console.error('Update submission status error:', error);
    return res.status(500).json({ success: false, error: 'Failed to update submission status.' });
  }
});

module.exports = router;
