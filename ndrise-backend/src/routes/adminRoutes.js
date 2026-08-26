const express = require('express');
const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const { verifyToken, isAdmin, requireRole } = require('../middleware/authMiddleware');
const { logAuditEvent } = require('../middleware/auditLogger');
const { sendOfferLetterEmail } = require('../utils/emailService');

const router = express.Router();

// Apply backend authentication + admin role check to ALL admin routes
router.use(verifyToken);
router.use(isAdmin);

// GET /api/admin/dashboard (Dashboard Analytics Metrics)
router.get('/dashboard', async (req, res, next) => {
  try {
    const [totalStudents, activeInternships, applicationsCount, certificatesCount] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.internship.count({ where: { status: 'ACTIVE' } }),
      prisma.application.count(),
      prisma.certificate.count()
    ]);

    return res.json({
      success: true,
      metrics: {
        totalStudents,
        activeInternships,
        completedInternships: applicationsCount,
        certificatesIssued: certificatesCount
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/students (List Students with Parameterized Search & Date Filters)
router.get('/students', async (req, res, next) => {
  try {
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
        lastLogin: user.lastLogin,
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
    next(error);
  }
});

// DELETE /api/admin/students/:id (Delete Student Account)
router.delete('/students/:id', async (req, res, next) => {
  try {
    const studentId = String(req.params.id);

    const student = await prisma.user.findFirst({
      where: { id: studentId, role: 'STUDENT' }
    });

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found.' });
    }

    await prisma.user.delete({ where: { id: studentId } });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'DELETE_STUDENT',
      targetResource: `User #${studentId}`,
      req,
      metadata: { deletedStudentEmail: student.email }
    });

    return res.json({ success: true, message: `Student #${studentId} deleted successfully.` });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/internships (List Internships)
router.get('/internships', async (req, res, next) => {
  try {
    const internships = await prisma.internship.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, internships });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/internships (Add New Internship Track)
router.post('/internships', async (req, res, next) => {
  try {
    const { title, category, domain, stipend, duration, description } = req.body;

    const trackTitle = title;
    const trackDomain = category || domain;

    if (!trackTitle || !trackDomain) {
      return res.status(400).json({ success: false, error: 'Title and category/domain are required.' });
    }

    const newInternship = await prisma.internship.create({
      data: {
        title: trackTitle,
        domain: trackDomain,
        description: description || 'Hands-on virtual internship track.',
        stipend: stipend || 'Performance Based',
        duration: duration || '1-3 Months',
        status: 'ACTIVE'
      }
    });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'CREATE_INTERNSHIP',
      targetResource: trackTitle,
      req
    });

    return res.status(201).json({ success: true, internship: newInternship });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/internships/:id (Delete Internship Track)
router.delete('/internships/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.internship.delete({ where: { id } });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'DELETE_INTERNSHIP',
      targetResource: `Internship #${id}`,
      req
    });

    return res.json({ success: true, message: 'Internship track deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/applications (List Applications)
router.get('/applications', async (req, res, next) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        internship: { select: { id: true, title: true } }
      },
      orderBy: { appliedAt: 'desc' }
    });

    const formatted = applications.map(a => ({
      id: a.id,
      user_id: a.userId,
      student_name: a.user?.name,
      student_email: a.user?.email,
      internship_title: a.internship?.title,
      status: a.status,
      applied_at: a.appliedAt
    }));

    return res.json({ success: true, applications: formatted });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/applications/:id (Update Application Status)
router.put('/applications/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required.' });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status }
    });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'UPDATE_APPLICATION_STATUS',
      targetResource: `Application #${id}`,
      req,
      metadata: { newStatus: status }
    });

    return res.json({ success: true, application: updated });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/certificates (List Certificates)
router.get('/certificates', async (req, res, next) => {
  try {
    const certificates = await prisma.certificate.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { issueDate: 'desc' }
    });
    return res.json({ success: true, certificates });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/certificates (Issue Certificate)
router.post('/certificates', async (req, res, next) => {
  try {
    const { userId, internshipTitle } = req.body;
    const certCode = `ND2026-CERT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCert = await prisma.certificate.create({
      data: {
        certificateCode: certCode,
        userId,
        trackTitle: internshipTitle || 'Virtual Internship',
        issueDate: new Date()
      }
    });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'ISSUE_CERTIFICATE',
      targetResource: certCode,
      req,
      metadata: { targetUserId: userId }
    });

    return res.status(201).json({ success: true, certificate: newCert });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/offer-letters/send (Issue Offer Letter and dispatch email)
router.post('/offer-letters/send', async (req, res, next) => {
  try {
    const { studentName, studentEmail, trackTitle, duration, stipend } = req.body;

    if (!studentEmail) {
      return res.status(400).json({ success: false, error: 'Student email is required.' });
    }

    const offerCode = `NDR-OFF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Store in DB
    await prisma.offerLetter.create({
      data: {
        offerCode,
        studentEmail: studentEmail.toLowerCase().trim(),
        studentName: studentName || 'Student',
        trackTitle: trackTitle || 'Full Stack Web Development Internship',
        duration: duration || '4 - 8 Weeks',
        stipend: stipend || 'Performance Based'
      }
    });

    const code = await sendOfferLetterEmail({
      studentEmail,
      studentName: studentName || 'Student',
      trackTitle: trackTitle || 'Full Stack Web Development Internship',
      offerCode,
      duration: duration || '4 - 8 Weeks',
      stipend: stipend || 'Performance Based'
    });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'SEND_OFFER_LETTER',
      targetResource: code,
      req,
      metadata: { studentEmail }
    });

    return res.status(200).json({
      success: true,
      message: `Official Offer Letter (${code}) issued and email sent to ${studentEmail}!`,
      offerCode: code,
      issuedDate: new Date().toLocaleDateString()
    });
  } catch (error) {
    next(error);
  }
});

// SUPER ADMIN ONLY ENDPOINTS (Role enforcement: SUPER_ADMIN)

// GET /api/admin/users (Manage Admin & System Users - Super Admin Only)
router.get('/users', requireRole('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true
      },
      orderBy: { createdAt: 'asc' }
    });
    return res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id/role (Change User Role - Super Admin Only)
router.put('/users/:id/role', requireRole('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const targetUserId = String(req.params.id);
    const { newRole } = req.body;

    const validRoles = ['STUDENT', 'ADMIN', 'SUPER_ADMIN', 'REVIEWER', 'SUPPORT'];
    const normalizedRole = String(newRole || '').toUpperCase();

    if (!validRoles.includes(normalizedRole)) {
      return res.status(400).json({ success: false, error: 'Invalid role specified.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: { role: normalizedRole },
      select: { id: true, name: true, email: true, role: true }
    });

    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'CHANGE_USER_ROLE',
      targetResource: `User #${targetUserId}`,
      req,
      metadata: { newRole: normalizedRole }
    });

    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/audit-logs (View Audit Logs - Super Admin Only)
router.get('/audit-logs', requireRole('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const logs = await prisma.auditLog.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, logs });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/settings & PUT /api/admin/settings (Super Admin Only)
router.get('/settings', requireRole('SUPER_ADMIN'), (req, res) => {
  res.json({
    success: true,
    settings: {
      siteName: 'ND Raise Technologies',
      requireEmailVerification: true,
      maxFailedAttempts: 5,
      sessionTimeoutHours: 24
    }
  });
});

router.put('/settings', requireRole('SUPER_ADMIN'), async (req, res, next) => {
  try {
    await logAuditEvent({
      actorId: req.user.id,
      actorEmail: req.user.email,
      action: 'UPDATE_SECURITY_SETTINGS',
      req,
      metadata: req.body
    });
    return res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
