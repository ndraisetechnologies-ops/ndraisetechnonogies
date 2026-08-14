const express = require('express');
const prisma = require('../lib/prisma');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/submissions (Protected - Students submit or update project task)
router.post('/submissions', verifyToken, async (req, res) => {
  try {
    const { projectTitle, domain, fileUrl, notes } = req.body;
    const userId = req.user.id;

    if (!projectTitle || !fileUrl) {
      return res.status(400).json({
        success: false,
        error: 'Project title and submission link / file URL are required.'
      });
    }

    // Check if user already submitted for this specific project title
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        userId,
        projectTitle
      }
    });

    let submission;

    if (existingSubmission) {
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          domain: domain || existingSubmission.domain,
          fileUrl,
          notes: notes !== undefined ? notes : existingSubmission.notes,
          status: 'PENDING',
          adminFeedback: null,
          submittedAt: new Date()
        }
      });
    } else {
      submission = await prisma.submission.create({
        data: {
          userId,
          projectTitle,
          domain: domain || 'Frontend Development Internship',
          fileUrl,
          notes: notes || null,
          status: 'PENDING'
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project task submitted live to Neon PostgreSQL for review!',
      submission
    });
  } catch (error) {
    console.error('Create/Update submission error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit project task. Please try again.' });
  }
});

// GET /api/submissions/my (Protected - Student fetches their live submissions)
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

// GET /api/admin/submissions (Protected Admin - View all student project submissions)
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

// PATCH /api/admin/submissions/:id/status (Protected Admin - Approve, Reject, or Request Revision)
router.patch('/admin/submissions/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminFeedback } = req.body;

    const validStatuses = ['APPROVED', 'REJECTED', 'REVISION_REQUESTED', 'PENDING'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await prisma.submission.update({
      where: { id },
      data: {
        status,
        ...(adminFeedback !== undefined ? { adminFeedback } : {})
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
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
