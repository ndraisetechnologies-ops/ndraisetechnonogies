import express from 'express';
import { query } from '../db.js';
import { verifyToken, requireSelfOrAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply session verification to student routes
router.use(verifyToken);

// GET /api/students/:id (Profile Fetch with IDOR Protection)
router.get('/:id', requireSelfOrAdmin, async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id, 10);

    // Fetch user without exposing password_hash or lockout details
    const userRes = await query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [studentId]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Student profile not found.' });
    }

    const profileRes = await query('SELECT * FROM student_profiles WHERE user_id = $1', [studentId]);

    return res.json({
      success: true,
      user: userRes.rows[0],
      profile: profileRes.rows[0] || null
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/students/:id/applications (Student Applications Fetch with IDOR Protection)
router.get('/:id/applications', requireSelfOrAdmin, async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id, 10);

    const appsRes = await query(
      `SELECT a.id, a.internship_id, i.title as internship_title, a.status, a.applied_at
       FROM applications a
       JOIN internships i ON a.internship_id = i.id
       WHERE a.user_id = $1
       ORDER BY a.id DESC`,
      [studentId]
    );

    return res.json({
      success: true,
      applications: appsRes.rows
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/students/:id/certificates (Student Certificates Fetch with IDOR Protection)
router.get('/:id/certificates', requireSelfOrAdmin, async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id, 10);

    const certsRes = await query('SELECT * FROM certificates WHERE user_id = $1 ORDER BY id DESC', [studentId]);

    return res.json({
      success: true,
      certificates: certsRes.rows
    });
  } catch (error) {
    next(error);
  }
});

export default router;
