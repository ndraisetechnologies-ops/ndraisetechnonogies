// Paste your Google Gemini API key here if you want to bypass .env
const DIRECT_GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

/**
 * Initialize Google Generative AI Client
 */
const getGeminiModel = () => {
  const rawKey = process.env.GEMINI_API_KEY || DIRECT_GEMINI_API_KEY;
  const apiKey = (rawKey || '').replace(/^["']|["']$/g, '').trim();

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.length > 10) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } catch (e) {
      console.error('[AI SERVICE] Error initializing Gemini model:', e.message);
      return null;
    }
  }
  return null;
};

/**
 * Helper to safely extract JSON from Gemini text response
 */
const parseJsonResponse = (text) => {
  try {
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse JSON from AI response:', e.message);
    return null;
  }
};

/**
 * 1. ATS Resume Scorer AI Engine
 */
const analyzeResumeAts = async ({ resumeText, jobDescription, targetRole }) => {
  const model = getGeminiModel();

  if (model) {
    try {
      console.log('[AI SERVICE] Calling live Google Gemini API for ATS Resume Scan...');
      const prompt = `
You are an expert ATS (Applicant Tracking System) Scanner & Senior Career Coach.
Analyze the following candidate resume text against the target job description/role.

Target Role: ${targetRole || 'Software Engineer / Full Stack Developer'}
Job Description: ${jobDescription || 'Standard Industry Qualifications'}

Candidate Resume Text:
"""
${resumeText}
"""

Return a valid JSON object strictly matching this schema without any markdown wrapping:
{
  "atsScore": number (0 to 100),
  "matchGrade": "Excellent" | "Good" | "Needs Improvement" | "Critical Issues",
  "summary": "Short 2-sentence summary of overall resume strength",
  "matchingSkills": ["skill1", "skill2", "skill3"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "formattingIssues": ["issue1", "issue2"],
  "actionableTips": ["tip1", "tip2", "tip3"]
}
`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      console.log('[AI SERVICE] Gemini API Response received successfully.');
      const parsed = parseJsonResponse(text);

      if (parsed && typeof parsed.atsScore === 'number') {
        return { success: true, isLiveAi: true, data: parsed };
      }
    } catch (err) {
      console.error('[AI SERVICE] Gemini ATS Scan API error:', err.message);
    }
  } else {
    console.log('[AI SERVICE] GEMINI_API_KEY is not set or process environment needs restart. Using smart fallback engine.');
  }

  // Smart Heuristic Fallback Engine
  const wordCount = (resumeText || '').split(/\s+/).filter(Boolean).length;
  let score = 72;
  if (wordCount > 150) score += 10;
  if (wordCount > 300) score += 6;
  if ((resumeText || '').toLowerCase().includes('react')) score += 4;
  if ((resumeText || '').toLowerCase().includes('node')) score += 4;
  score = Math.min(94, Math.max(45, score));

  return {
    success: true,
    isLiveAi: false,
    data: {
      atsScore: score,
      matchGrade: score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs Improvement',
      summary: `Your resume shows strong relevance for ${targetRole || 'Full Stack Web Development'}, with good structural readability and technical keyword density.`,
      matchingSkills: ['React.js', 'Node.js & Express', 'JavaScript (ES6+)', 'REST APIs', 'Git & GitHub'],
      missingKeywords: ['CI/CD Pipelines', 'PostgreSQL / Prisma', 'TypeScript', 'Docker', 'Jest Testing'],
      formattingIssues: [
        'Ensure contact details include your LinkedIn and GitHub profile URLs.',
        'Use bullet points starting with strong action verbs (e.g. Architected, Optimized, Deployed).'
      ],
      actionableTips: [
        'Add quantitative metrics to your project achievements (e.g. "Improved page load speed by 40%").',
        'Incorporate target keywords from the job description directly into your skills summary section.'
      ]
    }
  };
};

/**
 * 2. Job Email & Cold Outreach Builder AI Engine
 */
const generateJobEmail = async ({ recipientRole, companyName, jobTitle, studentSkills, emailType, userNotes }) => {
  const model = getGeminiModel();

  if (model) {
    try {
      const prompt = `
You are an expert Executive Career Communicator.
Draft a professional, compelling, and high-converting ${emailType || 'Cold Internship Email'} for a job seeker.

Recipient Role: ${recipientRole || 'Hiring Manager / Tech Recruiter'}
Company Name: ${companyName || 'Innovative Tech Company'}
Job / Internship Title: ${jobTitle || 'Full Stack Developer Intern'}
Candidate Skills: ${studentSkills || 'React, Node.js, JavaScript, Web Development'}
User Notes: ${userNotes || 'Eager to contribute to production software'}

Return a valid JSON object strictly matching this schema without any markdown wrapping:
{
  "subject": "Compelling Email Subject Line",
  "salutation": "Formal Greeting",
  "body": "Multi-paragraph high-converting email body text",
  "callToAction": "Clear closing statement and meeting request",
  "followUpTemplate": "A short 3-sentence follow-up message to send 4 days later"
}
`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = parseJsonResponse(text);

      if (parsed && parsed.subject && parsed.body) {
        return { success: true, isLiveAi: true, data: parsed };
      }
    } catch (err) {
      console.error('[AI SERVICE] Gemini Email Builder error:', err.message);
    }
  }

  // Fallback Engine
  const targetComp = companyName || 'NDRise Partner Company';
  const targetRoleName = jobTitle || 'Full Stack Developer Intern';

  return {
    success: true,
    isLiveAi: false,
    data: {
      subject: `Application for ${targetRoleName} — ${studentSkills?.split(',')[0] || 'Web Developer'} Candidate`,
      salutation: `Dear ${recipientRole || 'Hiring Team'},`,
      body: `I am writing to express my strong enthusiasm for the ${targetRoleName} position at ${targetComp}. With hands-on experience building full-stack web applications using ${studentSkills || 'React, Node.js, and PostgreSQL'}, I am confident in my ability to contribute value to your engineering team.\n\nRecently, I completed virtual internship projects delivering scalable REST APIs, responsive frontend design systems, and verified database architectures.`,
      callToAction: `I would welcome the opportunity to discuss how my technical background aligns with ${targetComp}'s goals. Please find my portfolio and resume attached for your review.`,
      followUpTemplate: `Hi ${recipientRole || 'Hiring Manager'},\n\nFollowing up on my application for the ${targetRoleName} position. I remain very excited about ${targetComp} and would love to connect for a quick 10-minute introduction.`
    }
  };
};

/**
 * 3. AI Interview Preparation & Practice Engine
 */
const generateInterviewPrep = async ({ targetRole, experienceLevel, topic }) => {
  const model = getGeminiModel();

  if (model) {
    try {
      const prompt = `
You are a Principal Software Engineer & Technical Interviewer at a top tech company.
Generate structured mock interview questions, model answers, and behavioral tips.

Target Role: ${targetRole || 'Full Stack Developer'}
Experience Level: ${experienceLevel || 'Entry Level / Intern'}
Focus Topic: ${topic || 'React, System Design, Data Structures & REST APIs'}

Return a valid JSON object strictly matching this schema without any markdown wrapping:
{
  "role": "${targetRole || 'Full Stack Developer'}",
  "questions": [
    {
      "id": 1,
      "question": "Technical question text",
      "category": "Frontend" | "Backend" | "System Design" | "Behavioral",
      "difficulty": "Easy" | "Medium" | "Hard",
      "keyConcepts": ["concept1", "concept2"],
      "modelAnswer": "Comprehensive STAR/Technical answer explanation"
    }
  ],
  "interviewerTips": ["tip1", "tip2"]
}
`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = parseJsonResponse(text);

      if (parsed && Array.isArray(parsed.questions)) {
        return { success: true, isLiveAi: true, data: parsed };
      }
    } catch (err) {
      console.error('[AI SERVICE] Gemini Interview Prep error:', err.message);
    }
  }

  // Fallback Engine
  return {
    success: true,
    isLiveAi: false,
    data: {
      role: targetRole || 'Full Stack Developer',
      questions: [
        {
          id: 1,
          question: 'How do Virtual DOM reconciliation and key props work in React?',
          category: 'Frontend',
          difficulty: 'Medium',
          keyConcepts: ['Virtual DOM', 'Diffing Algorithm', 'Reconciliation', 'Keys'],
          modelAnswer: 'React creates a lightweight in-memory Virtual DOM tree. When state changes occur, React creates a new Virtual DOM tree and diffs it with the previous snapshot using its reconciliation algorithm. Keys help React identify which items in a dynamic list have changed, added, or removed, avoiding unnecessary re-renders.'
        },
        {
          id: 2,
          question: 'Explain the difference between SQL joins and indexing in PostgreSQL.',
          category: 'Backend',
          difficulty: 'Medium',
          keyConcepts: ['B-Tree Indexes', 'INNER JOIN', 'Query Planner', 'Performance'],
          modelAnswer: 'Indexing (like B-Tree indexes on primary/foreign keys) speeds up data retrieval by reducing full table scans. Joins (INNER, LEFT, RIGHT) combine rows from two or more tables based on a related column. Using indexes on foreign key columns significantly optimizes JOIN query performance.'
        },
        {
          id: 3,
          question: 'Describe a situation where a project deliverable was delayed and how you handled it.',
          category: 'Behavioral',
          difficulty: 'Easy',
          keyConcepts: ['STAR Method', 'Communication', 'Problem Solving'],
          modelAnswer: 'Using the STAR method: Situation (blocking bug in API response), Task (needed to deliver on deadline), Action (communicated early with project lead, broke the task into smaller sub-modules, and refactored the async handler), Result (delivered within 24 hours with clean test coverage).'
        }
      ],
      interviewerTips: [
        'Always clarify requirements out loud before jumping into coding answers.',
        'Use the STAR method (Situation, Task, Action, Result) for behavioral questions.'
      ]
    }
  };
};

/**
 * 4. AI Skill-Based Job & Internship Search Engine
 */
const searchJobsBySkills = async ({ studentSkills, jobType, location, experienceLevel }) => {
  const model = getGeminiModel();

  if (model) {
    try {
      const prompt = `
You are an expert AI Technical Recruiter & Career Advisor.
Given a student's technical skills and preferences, recommend 5 realistic, high-matching software engineering and tech job/internship opportunities with AI compatibility scores.

Student Skills: ${studentSkills || 'React, Node.js, JavaScript, HTML5, CSS3, Git'}
Job Type Preference: ${jobType || 'All (Full-Time & Virtual Internships)'}
Location Preference: ${location || 'Remote / India'}
Experience Level: ${experienceLevel || 'Fresher / Entry Level (0-1 Yrs)'}

Return a valid JSON array strictly matching this schema without any markdown wrapping:
[
  {
    "id": "job-1",
    "title": "Job / Internship Title",
    "company": "Company Name",
    "location": "Remote / City",
    "type": "Virtual Internship",
    "stipend": "₹15,000 - ₹30,000 / month",
    "matchScore": 92,
    "matchingSkills": ["skill1", "skill2"],
    "missingSkills": ["skill3"],
    "description": "Short 2-sentence description of responsibilities and growth opportunities",
    "postedDate": "Just now"
  }
]
`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = parseJsonResponse(text);

      if (Array.isArray(parsed) && parsed.length > 0) {
        return { success: true, isLiveAi: true, jobs: parsed };
      }
    } catch (err) {
      console.error('[AI SERVICE] Gemini Job Search error:', err.message);
    }
  }

  // Fallback Jobs Dataset
  const skillsArr = (studentSkills || 'React, Node.js, JavaScript').toLowerCase();
  const jobsList = [
    {
      id: 'job-101',
      title: 'Junior Full-Stack Web Developer Intern',
      company: 'NDRise Technologies & Partners',
      location: '100% Remote (India)',
      type: 'Virtual Internship',
      stipend: '₹15,000 - ₹25,000 / month',
      matchScore: skillsArr.includes('react') || skillsArr.includes('node') ? 94 : 85,
      matchingSkills: ['React.js', 'Node.js & Express', 'JavaScript (ES6+)', 'REST APIs', 'Git'],
      missingSkills: ['PostgreSQL / Prisma', 'TypeScript'],
      description: 'Build production-ready React web apps, integrate REST APIs, and collaborate on real client projects.',
      postedDate: 'Today',
      applyUrl: null
    },
    {
      id: 'job-102',
      title: 'Frontend Developer (React & UI Engineering)',
      company: 'InnovateTech Labs',
      location: 'Bangalore / Remote',
      type: 'Full-Time (Entry Level)',
      stipend: '₹4.5 - ₹7.0 LPA',
      matchScore: skillsArr.includes('react') || skillsArr.includes('html') ? 90 : 80,
      matchingSkills: ['React.js', 'HTML5 & CSS3', 'JavaScript', 'Responsive Web Design'],
      missingSkills: ['Tailwind CSS', 'Redux Toolkit'],
      description: 'Develop slick UI components, optimize web performance, and maintain modern design systems.',
      postedDate: '1 day ago',
      applyUrl: 'https://careers.google.com/jobs/results/'
    },
    {
      id: 'job-103',
      title: 'Backend API Developer (Node.js & Express)',
      company: 'CloudScale Solutions',
      location: 'Hyderabad / Remote',
      type: 'Full-Time (Entry Level)',
      stipend: '₹5.0 - ₹8.5 LPA',
      matchScore: skillsArr.includes('node') || skillsArr.includes('backend') ? 91 : 78,
      matchingSkills: ['Node.js', 'Express.js', 'REST API Architecture', 'JWT Authentication'],
      missingSkills: ['PostgreSQL Indexing', 'Docker'],
      description: 'Architect REST microservices, design database models, and implement authentication systems.',
      postedDate: '2 days ago',
      applyUrl: 'https://www.linkedin.com/jobs/'
    },
    {
      id: 'job-104',
      title: 'AI & Data Science Trainee Engineer',
      company: 'Cognitive AI Research',
      location: 'Remote',
      type: 'Virtual Internship',
      stipend: '₹18,000 - ₹30,000 / month',
      matchScore: skillsArr.includes('python') || skillsArr.includes('ai') ? 92 : 75,
      matchingSkills: ['Python 3', 'Data Analysis', 'SQL Queries', 'Machine Learning Basics'],
      missingSkills: ['Pandas & NumPy', 'PyTorch'],
      description: 'Work with machine learning models, analyze dataset features, and build data pipelines.',
      postedDate: '3 days ago',
      applyUrl: 'https://careers.google.com/jobs/results/'
    }
  ];

  return { success: true, isLiveAi: false, jobs: jobsList };
};

module.exports = {
  analyzeResumeAts,
  generateJobEmail,
  generateInterviewPrep,
  searchJobsBySkills
};
