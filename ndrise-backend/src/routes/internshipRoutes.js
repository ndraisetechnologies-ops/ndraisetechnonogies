const express = require('express');
const prisma = require('../lib/prisma');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Seed data if internships table is empty
const DEFAULT_INTERNSHIPS = [
  {
    title: 'Full Stack Web Development',
    domain: 'Web Development',
    description: 'Build modern responsive full-stack applications using React, Node.js, and PostgreSQL.',
    duration: '4 - 12 Weeks',
    stipend: 'Performance Based'
  },
  {
    title: 'Frontend Web Development',
    domain: 'Frontend Engineering',
    description: 'Master HTML5, CSS3, JavaScript ES6+, React, and modern UI/UX design systems.',
    duration: '4 - 8 Weeks',
    stipend: 'Performance Based'
  },
  {
    title: 'Artificial Intelligence & Machine Learning',
    domain: 'Data & AI',
    description: 'Develop machine learning models, neural networks, and computer vision pipelines using Python.',
    duration: '8 - 12 Weeks',
    stipend: 'Performance Based'
  },
  {
    title: 'Python Software Development',
    domain: 'Software Engineering',
    description: 'Build scalable automation scripts, REST APIs with FastAPI/Django, and backend servers.',
    duration: '4 - 8 Weeks',
    stipend: 'Performance Based'
  },
  {
    title: 'Backend Engineering & APIs',
    domain: 'Backend Development',
    description: 'Design robust microservices, database schemas, authentication systems, and cloud architectures.',
    duration: '4 - 8 Weeks',
    stipend: 'Performance Based'
  },
  {
    title: 'Cloud Engineering & DevOps',
    domain: 'DevOps & Cloud',
    description: 'Deploy cloud infrastructure, Docker containers, CI/CD pipelines, and AWS services.',
    duration: '4 - 12 Weeks',
    stipend: 'Performance Based'
  }
];

// GET /api/internships (Public)
router.get('/internships', async (req, res) => {
  try {
    let internships = await prisma.internship.findMany({
      orderBy: { createdAt: 'asc' }
    });

    // Auto-seed if database is empty
    if (internships.length === 0) {
      await prisma.internship.createMany({
        data: DEFAULT_INTERNSHIPS
      });
      internships = await prisma.internship.findMany({
        orderBy: { createdAt: 'asc' }
      });
    }

    return res.json({ success: true, internships });
  } catch (error) {
    console.error('Fetch internships error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch internships.' });
  }
});

// POST /api/applications (Protected)
router.post('/applications', verifyToken, async (req, res) => {
  try {
    const { internshipId, title } = req.body;
    const userId = req.user.id;

    let targetInternshipId = internshipId;

    // If internshipId is not provided or valid UUID, find by title
    if (!targetInternshipId && title) {
      const found = await prisma.internship.findFirst({
        where: { title: { contains: title, mode: 'insensitive' } }
      });
      if (found) {
        targetInternshipId = found.id;
      }
    }

    if (!targetInternshipId) {
      // Fallback: get first available internship
      const first = await prisma.internship.findFirst();
      if (first) {
        targetInternshipId = first.id;
      } else {
        return res.status(400).json({ success: false, error: 'Valid internship ID is required.' });
      }
    }

    // Check for existing application
    const existing = await prisma.application.findFirst({
      where: {
        userId,
        internshipId: targetInternshipId
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'You have already submitted an application for this internship track.',
        application: existing
      });
    }

    const application = await prisma.application.create({
      data: {
        userId,
        internshipId: targetInternshipId,
        status: 'APPLIED'
      },
      include: {
        internship: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application
    });
  } catch (error) {
    console.error('Submit application error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit application. Please try again.' });
  }
});

// GET /api/applications/my (Protected)
router.get('/applications/my', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        internship: true
      },
      orderBy: { appliedAt: 'desc' }
    });

    return res.json({ success: true, applications });
  } catch (error) {
    console.error('Fetch my applications error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch applications.' });
  }
});

module.exports = router;
