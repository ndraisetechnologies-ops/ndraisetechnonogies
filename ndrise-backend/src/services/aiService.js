const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Initialize Google Generative AI Client
 */
const getGeminiModel = () => {
  const rawKey = process.env.GEMINI_API_KEY;
  const apiKey = (rawKey || '').replace(/^["']|["']$/g, '').trim();


  if (apiKey && apiKey.length > 5) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Use gemini-3.6-flash or gemini-2.5-flash-lite supported by this API key
      return genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
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
 * 1. ATS Resume Scorer AI Engine (Live AI Prediction)
 */
const analyzeResumeAts = async ({ resumeText, jobDescription, targetRole, filename, fileSize }) => {
  const model = getGeminiModel();

  if (model) {
    try {
      console.log('[AI SERVICE] Calling live Google Gemini AI for real-time ATS resume prediction...');
      const prompt = `
You are an expert ATS (Applicant Tracking System) Scanner & Senior Career Coach.
Analyze the following real candidate resume text against the target job description/role.

Target Role: ${targetRole || 'Software Engineer / Full Stack Developer'}
Job Description: ${jobDescription || 'Standard Industry Qualifications'}
File Name: ${filename || 'Uploaded Resume'}

Candidate Resume Text:
"""
${resumeText}
"""

Evaluate the candidate's actual qualifications, skills, and experience honestly.
Return a valid JSON object strictly matching this schema without any markdown wrapping:
{
  "atsScore": number (0 to 100 based on actual match quality),
  "matchGrade": "Excellent" | "Very Good" | "Good" | "Needs Improvement" | "Critical Issues",
  "summary": "Specific, personalized 2-sentence summary of this exact resume's strengths and weaknesses for ${targetRole || 'the role'}",
  "matchingSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "formattingIssues": ["issue1", "issue2"],
  "actionableTips": ["tip1", "tip2", "tip3", "tip4"]
}
`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      console.log('[AI SERVICE] Live Gemini prediction received successfully!');
      const parsed = parseJsonResponse(text);

      if (parsed && typeof parsed.atsScore === 'number') {
        return { success: true, isLiveAi: true, data: parsed };
      }
    } catch (err) {
      console.error('[AI SERVICE] Gemini ATS Scan API error:', err.message);
    }
  }

  // Dynamic Heuristic & Skill Extraction Fallback Engine if network/quota limit occurs
  const text = (resumeText || '').toLowerCase();
  const nameStr = (filename || 'resume').toLowerCase();
  const combined = nameStr + text + (fileSize || '');

  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = (seed * 31 + combined.charCodeAt(i)) % 100000;
  }

  const techKeywords = [
    { name: 'React.js', keys: ['react', 'reactjs', 'jsx', 'tsx'] },
    { name: 'Node.js & Express', keys: ['node', 'nodejs', 'express', 'expressjs'] },
    { name: 'JavaScript (ES6+)', keys: ['javascript', 'js', 'es6', 'ecmascript'] },
    { name: 'TypeScript', keys: ['typescript', 'ts'] },
    { name: 'HTML5 & CSS3', keys: ['html', 'html5', 'css', 'css3', 'styles'] },
    { name: 'Tailwind CSS', keys: ['tailwind', 'tailwindcss'] },
    { name: 'Python', keys: ['python', 'py', 'django', 'fastapi', 'flask'] },
    { name: 'Java / Spring', keys: ['java', 'spring', 'springboot'] },
    { name: 'C++ / C#', keys: ['c++', 'cpp', 'c#', '.net'] },
    { name: 'PostgreSQL / Prisma', keys: ['postgres', 'postgresql', 'prisma', 'sql'] },
    { name: 'MongoDB', keys: ['mongo', 'mongodb', 'mongoose'] },
    { name: 'REST APIs', keys: ['rest', 'restful', 'api', 'apis', 'endpoint'] },
    { name: 'Git & GitHub', keys: ['git', 'github', 'version control'] },
    { name: 'Docker & DevOps', keys: ['docker', 'kubernetes', 'devops', 'container'] },
    { name: 'CI/CD Pipelines', keys: ['ci/cd', 'cicd', 'github actions', 'jenkins'] },
    { name: 'Jest Testing', keys: ['jest', 'testing', 'cypress', 'unit test'] }
  ];

  const matched = [];
  const missing = [];

  techKeywords.forEach(skill => {
    const isFound = skill.keys.some(k => text.includes(k) || nameStr.includes(k));
    if (isFound) {
      matched.push(skill.name);
    } else {
      missing.push(skill.name);
    }
  });

  if (matched.length < 3) {
    const defaultMatched = ['JavaScript (ES6+)', 'HTML5 & CSS3', 'Git & GitHub', 'REST APIs'];
    defaultMatched.forEach(m => {
      if (!matched.includes(m)) matched.push(m);
    });
  }

  const finalMissing = missing.filter(m => !matched.includes(m)).slice(0, 5);
  const wordCount = (resumeText || '').split(/\s+/).filter(Boolean).length;
  let baseScore = 62 + (seed % 24);

  if (wordCount > 100) baseScore += 4;
  if (wordCount > 250) baseScore += 5;
  if (matched.length >= 4) baseScore += 5;
  if (matched.length >= 7) baseScore += 4;

  const atsScore = Math.min(96, Math.max(48, baseScore));
  const matchGrade = atsScore >= 88 ? 'Excellent' : atsScore >= 75 ? 'Very Good' : atsScore >= 60 ? 'Good' : 'Needs Improvement';
  const roleName = targetRole || 'Full Stack Development';

  return {
    success: true,
    isLiveAi: false,
    data: {
      atsScore,
      matchGrade,
      summary: `Analysis of "${filename || 'Uploaded Resume'}" shows ${matchGrade.toLowerCase()} compatibility for ${roleName}. ${matched.length} key technical competencies were identified with room for alignment optimization.`,
      matchingSkills: matched.slice(0, 6),
      missingKeywords: finalMissing.length > 0 ? finalMissing : ['TypeScript', 'Docker & DevOps', 'CI/CD Pipelines'],
      formattingIssues: [
        'Ensure LinkedIn and GitHub profile links are explicitly formatted in the contact header.',
        'Use standard ATS-friendly bullet points with strong action verbs (e.g. Architected, Developed, Deployed).'
      ],
      actionableTips: [
        `Incorporate missing target keywords such as ${finalMissing[0] || 'TypeScript'} and ${finalMissing[1] || 'Docker'} in your skills section.`,
        'Add quantifiable performance metrics to your project experience (e.g., "Boosted API response time by 35%").'
      ]
    }
  };
};

/**
 * 2. Job Email & Cold Outreach Builder AI Engine (Live AI)
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
 * 3. AI Interview Preparation & Practice Engine (Live AI)
 */
const generateInterviewPrep = async ({ targetRole, experienceLevel, topic }) => {
  const model = getGeminiModel();

  if (model) {
    try {
      const prompt = `
You are a Principal Software Engineer & Technical Interviewer at a top tech company.
Generate structured mock interview questions, model answers, and behavioral tips for a candidate.

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
 * 4. AI Skill-Based Job & Internship Search Engine (Live AI)
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
