const express = require('express');
const prisma = require('../lib/prisma');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/student/dashboard (Protected - Fetch logged in student metrics & applications)
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details, applications, submissions, test results, and certificates from Neon DB
    const [user, applications, submissions, testResults, certificates] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, avatar: true, createdAt: true }
      }),
      prisma.application.findMany({
        where: { userId },
        include: { internship: true },
        orderBy: { appliedAt: 'desc' }
      }),
      prisma.submission.findMany({
        where: { userId },
        orderBy: { submittedAt: 'desc' }
      }),
      prisma.testResult.findMany({
        where: { userId },
        include: { course: true },
        orderBy: { completedAt: 'desc' }
      }),
      prisma.certificate.findMany({
        where: { userId },
        orderBy: { issueDate: 'desc' }
      })
    ]);

    const approvedSubmissionsCount = submissions.filter(s => s.status === 'APPROVED').length;
    const pendingSubmissionsCount = submissions.filter(s => s.status === 'PENDING' || s.status === 'REVISION_REQUESTED').length;
    const avgScore = testResults.length > 0
      ? Math.round(testResults.reduce((acc, t) => acc + t.score, 0) / testResults.length)
      : 82; // Default baseline score

    const metrics = {
      user,
      totalApplications: applications.length,
      activeInternships: applications.filter(a => ['APPLIED', 'SHORTLISTED', 'UNDER_REVIEW', 'SELECTED'].includes(a.status)).length,
      completedInternships: approvedSubmissionsCount,
      projectsCompleted: approvedSubmissionsCount,
      projectsInProgress: pendingSubmissionsCount,
      totalSubmissions: submissions.length,
      testsAttended: testResults.length,
      averageTestScore: avgScore,
      totalCertificates: certificates.length,
      primaryTrack: applications[0]?.internship?.title || null
    };

    return res.json({
      success: true,
      metrics,
      applications,
      submissions,
      testResults,
      certificates
    });
  } catch (error) {
    console.error('Fetch student dashboard data error:', error);
    return res.status(500).json({ success: false, error: 'Failed to load student dashboard metrics.' });
  }
});

module.exports = router;
