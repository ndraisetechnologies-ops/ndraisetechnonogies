const express = require('express');
const { analyzeResumeAts, generateJobEmail, generateInterviewPrep, searchJobsBySkills } = require('../services/aiService');

const router = express.Router();

// POST /api/career/ats-score (Public / Student - Scan Resume text against Job Description)
router.post('/career/ats-score', async (req, res) => {
  try {
    const { resumeText, jobDescription, targetRole, filename, fileSize } = req.body;
    if (!resumeText || resumeText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please provide valid resume content.'
      });
    }

    const result = await analyzeResumeAts({ resumeText, jobDescription, targetRole, filename, fileSize });
    return res.json(result);
  } catch (error) {
    console.error('Career ATS Score route error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process ATS score analysis.' });
  }
});


// POST /api/career/job-email (Public / Student - Generate Cold Email & Outreach)
router.post('/career/job-email', async (req, res) => {
  try {
    const { recipientRole, companyName, jobTitle, studentSkills, emailType, userNotes } = req.body;
    const result = await generateJobEmail({ recipientRole, companyName, jobTitle, studentSkills, emailType, userNotes });
    return res.json(result);
  } catch (error) {
    console.error('Career Job Email route error:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate job outreach email.' });
  }
});

// POST /api/career/interview-prep (Public / Student - Generate Interview Prep Questions)
router.post('/career/interview-prep', async (req, res) => {
  try {
    const { targetRole, experienceLevel, topic } = req.body;
    const result = await generateInterviewPrep({ targetRole, experienceLevel, topic });
    return res.json(result);
  } catch (error) {
    console.error('Career Interview Prep route error:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate interview preparation questions.' });
  }
});

// POST /api/career/job-search (Public / Student - AI Skill-Based Job & Internship Finder)
router.post('/career/job-search', async (req, res) => {
  try {
    const { studentSkills, jobType, location, experienceLevel } = req.body;
    const result = await searchJobsBySkills({ studentSkills, jobType, location, experienceLevel });
    return res.json(result);
  } catch (error) {
    console.error('Career Job Search route error:', error);
    return res.status(500).json({ success: false, error: 'Failed to search skill-matched job openings.' });
  }
});

module.exports = router;
