const express = require('express');
const prisma = require('../lib/prisma');
const { verifyToken, requireSelfOrAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply session verification to all student routes
router.use(verifyToken);

// GET /api/student/dashboard (Protected - Fetch logged in student metrics & applications)
router.get('/dashboard', async (req, res, next) => {
  try {
    const userId = String(req.user.id);

    const [user, applications, submissions, testResults, certificates] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          college: true,
          degree: true,
          graduationYear: true,
          resumeUrl: true,
          atsScore: true,
          createdAt: true
        }
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
      : 82;

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
    next(error);
  }
});

// GET /api/students/:id (Profile Fetch with IDOR Protection)
router.get('/:id', requireSelfOrAdmin, async (req, res, next) => {
  try {
    const studentId = String(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        college: true,
        degree: true,
        graduationYear: true,
        resumeUrl: true,
        atsScore: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'Student profile not found.' });
    }

    return res.json({
      success: true,
      user,
      profile: {
        college: user.college,
        degree: user.degree,
        graduationYear: user.graduationYear,
        resumeUrl: user.resumeUrl,
        atsScore: user.atsScore
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/students/:id/applications (Student Applications Fetch with IDOR Protection)
router.get('/:id/applications', requireSelfOrAdmin, async (req, res, next) => {
  try {
    const studentId = String(req.params.id);

    const applications = await prisma.application.findMany({
      where: { userId: studentId },
      include: { internship: true },
      orderBy: { appliedAt: 'desc' }
    });

    const formatted = applications.map(a => ({
      id: a.id,
      internship_id: a.internshipId,
      internship_title: a.internship?.title,
      status: a.status,
      applied_at: a.appliedAt
    }));

    return res.json({
      success: true,
      applications: formatted
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/students/:id/certificates (Student Certificates Fetch with IDOR Protection)
router.get('/:id/certificates', requireSelfOrAdmin, async (req, res, next) => {
  try {
    const studentId = String(req.params.id);

    const certificates = await prisma.certificate.findMany({
      where: { userId: studentId },
      orderBy: { issueDate: 'desc' }
    });

    return res.json({
      success: true,
      certificates
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
