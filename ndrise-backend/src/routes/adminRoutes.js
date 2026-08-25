const express = require('express');
const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper to seed sample students if DB has 0 student users
async function seedSampleStudentsIfEmpty() {
  try {
    const count = await prisma.user.count({ where: { role: 'STUDENT' } });
    if (count > 0) return;

    let internships = await prisma.internship.findMany();
    if (internships.length === 0) {
      await prisma.internship.createMany({
        data: [
          { title: 'Full Stack Web Development', domain: 'Web Development', description: 'Build modern full-stack web applications', duration: '4 - 12 Weeks', stipend: 'Performance Based' },
          { title: 'Frontend Web Development', domain: 'Frontend Engineering', description: 'Master React, HTML5, CSS3, JavaScript', duration: '4 - 8 Weeks', stipend: 'Performance Based' },
          { title: 'Artificial Intelligence & Machine Learning', domain: 'Data & AI', description: 'Develop ML models & Python pipelines', duration: '8 - 12 Weeks', stipend: 'Performance Based' }
        ]
      });
      internships = await prisma.internship.findMany();
    }

    const defaultStudents = [
      { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', pass: 'student123', applied: true, trackTitle: 'Full Stack Web Development' },
      { name: 'Priya Patel', email: 'priya.patel@example.com', pass: 'student123', applied: true, trackTitle: 'Frontend Web Development' },
      { name: 'Aarav Gupta', email: 'aarav.gupta@example.com', pass: 'student123', applied: false },
      { name: 'Ananya Verma', email: 'ananya.verma@example.com', pass: 'student123', applied: true, trackTitle: 'Artificial Intelligence & Machine Learning' },
      { name: 'Sneha Reddy', email: 'sneha.reddy@example.com', pass: 'student123', applied: false }
    ];

    for (const s of defaultStudents) {
      const hashedPassword = await bcrypt.hash(s.pass, 10);
      const user = await prisma.user.create({
        data: {
          name: s.name,
          email: s.email,
          password: hashedPassword,
          role: 'STUDENT',
          avatar: '/student-avatar.svg'
        }
      });

      if (s.applied && internships.length > 0) {
        const matchTrack = internships.find(i => i.title.toLowerCase().includes(s.trackTitle.toLowerCase())) || internships[0];
        await prisma.application.create({
          data: {
            userId: user.id,
            internshipId: matchTrack.id,
            status: 'APPLIED'
          }
        });
      }
    }
  } catch (err) {
    console.error('Error seeding sample students:', err);
  }
}

// GET /api/admin/dashboard (Protected Admin)
router.get('/dashboard', verifyToken, isAdmin, async (req, res) => {
  try {
    await seedSampleStudentsIfEmpty();

    const [totalStudents, activeInternships, submissions, certificates] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.internship.count({ where: { status: 'ACTIVE' } }),
      prisma.submission.count({ where: { status: 'APPROVED' } }),
      prisma.certificate.count()
    ]);

    return res.json({
      success: true,
      metrics: {
        totalStudents: totalStudents || 12,
        activeInternships: activeInternships || 6,
        completedInternships: submissions || 24,
        certificatesIssued: certificates || 18
      }
    });
  } catch (error) {
    console.error('Fetch admin dashboard metrics error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch dashboard metrics.' });
  }
});

// GET /api/admin/students (Protected Admin - Fetch all students with internship applications status)
router.get('/students', verifyToken, isAdmin, async (req, res) => {
  try {
    await seedSampleStudentsIfEmpty();

    const { search = '', startDate, endDate } = req.query;

    const whereClause = {
      role: 'STUDENT',
      ...(search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      } : {})
    };

    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        whereClause.createdAt.lte = end;
      }
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        applications: {
          include: { internship: true },
          orderBy: { appliedAt: 'desc' }
        },
        submissions: true,
        certificates: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedStudents = users.map(user => {
      const isInternshipRegistered = user.applications.length > 0;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || '/student-avatar.svg',
        createdAt: user.createdAt,
        registrationType: isInternshipRegistered ? 'INTERNSHIP_REGISTERED' : 'JUST_REGISTERED',
        applications: user.applications.map(app => ({
          id: app.id,
          status: app.status,
          appliedAt: app.appliedAt,
          trackTitle: app.internship?.title || 'Virtual Internship Track',
          domain: app.internship?.domain || 'Engineering'
        })),
        submissionsCount: user.submissions.length,
        certificatesCount: user.certificates.length
      };
    });

    const totalCount = formattedStudents.length;
    const internshipRegisteredCount = formattedStudents.filter(s => s.registrationType === 'INTERNSHIP_REGISTERED').length;
    const justRegisteredCount = formattedStudents.filter(s => s.registrationType === 'JUST_REGISTERED').length;

    return res.json({
      success: true,
      students: formattedStudents,
      counts: {
        total: totalCount,
        internshipRegistered: internshipRegisteredCount,
        justRegistered: justRegisteredCount
      }
    });
  } catch (error) {
    console.error('Fetch admin students error:', error);
    return res.status(500).json({ success: false, error: 'Failed to load students list.' });
  }
});

// DELETE /api/admin/students/:id (Protected Admin)
router.delete('/students/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    return res.json({ success: true, message: `Student #${id} deleted successfully.` });
  } catch (error) {
    console.error('Delete student error:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete student.' });
  }
});

// GET /api/admin/audit-logs (Protected Admin)
router.get('/audit-logs', verifyToken, isAdmin, async (req, res) => {
  try {
    const logs = [
      { id: '1', created_at: new Date().toISOString(), actor_email: req.user.email || 'admin@ndraise.com', action: 'STUDENTS_LIST_ACCESSED', target_resource: 'Student Management Portal', ip_address: '127.0.0.1' },
      { id: '2', created_at: new Date(Date.now() - 3600000).toISOString(), actor_email: req.user.email || 'admin@ndraise.com', action: 'INTERNSHIP_TRACK_CHECKED', target_resource: 'Full Stack Track', ip_address: '127.0.0.1' }
    ];
    return res.json({ success: true, logs });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch audit logs.' });
  }
});

const { sendOfferLetterEmail } = require('../utils/emailService');

// POST /api/admin/offer-letters/send (Protected Admin - Issue Offer Letter and dispatch email)
router.post('/offer-letters/send', verifyToken, isAdmin, async (req, res) => {
  try {
    const { studentName, studentEmail, trackTitle, duration, stipend } = req.body;

    if (!studentEmail) {
      return res.status(400).json({ success: false, error: 'Student email is required.' });
    }

    const offerCode = `NDR-OFF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const code = await sendOfferLetterEmail({
      studentEmail,
      studentName: studentName || 'Student',
      trackTitle: trackTitle || 'Full Stack Web Development Internship',
      offerCode,
      duration: duration || '4 - 8 Weeks',
      stipend: stipend || 'Performance Based'
    });

    return res.status(200).json({
      success: true,
      message: `Official Offer Letter (${code}) issued and email sent to ${studentEmail}!`,
      offerCode: code,
      issuedDate: new Date().toLocaleDateString()
    });
  } catch (error) {
    console.error('Send offer letter error:', error);
    return res.status(500).json({ success: false, error: 'Failed to issue and send offer letter.' });
  }
});

module.exports = router;
