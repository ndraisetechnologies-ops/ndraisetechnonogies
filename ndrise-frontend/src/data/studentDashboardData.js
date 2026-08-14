// Student Dashboard Career Command Center Centralized Mock Dataset

export const studentDashboardData = {
  welcome: {
    name: 'Nikhil Sharma',
  },

  overview: {
    applied: 12,
    appliedThisMonth: 3,
    completed: 3,
    active: 2,
    shortlisted: 3,
    selected: 2,
    underReview: 5,
    rejected: 2,

    testsAttended: 18,
    testsPassed: 15,
    averageTestScore: 82,
    highestTestScore: 96,

    atsScore: 78,
    atsGrade: 'Good',
  },

  ats: {
    score: 78,
    grade: 'Good'
  },

  certificates: {
    total: 5,
    internship: 3,
    course: 2,
    nextUnlockProgress: 66
  },

  projects: {
    total: 10,
    completed: 8,
    inProgress: 2,
    progressPercent: 80
  },

  overviewProjects: {
    projectsCompleted: 8,
    projectsInProgress: 2,
    totalProjects: 10,
    projectProgressPercent: 80,

    totalCertificates: 5,
    internshipCertificates: 3,
    courseCertificates: 2,
    nextCertificateProgress: 66
  },

  currentInternship: {
    title: 'Frontend Development Internship',
    company: 'NDRise Technologies',
    progressPercent: 66,
    currentStage: 'Task 2 of 3',
    nextAction: 'Submit Task 3',
    batchStartDate: 'August 01, 2026',
    submissionDeadline: 'August 28, 2026'
  },

  applicationsList: [
    {
      id: 1,
      title: 'React Developer Intern',
      company: 'NDRise Technologies',
      appliedDate: 'Aug 05, 2026',
      status: 'Shortlisted',
      type: 'Remote • 8 Weeks'
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'ABC Technologies',
      appliedDate: 'Aug 02, 2026',
      status: 'Under Review',
      type: 'Hybrid • 12 Weeks'
    },
    {
      id: 3,
      title: 'Python Developer Intern',
      company: 'XYZ Technologies',
      appliedDate: 'Jul 28, 2026',
      status: 'Rejected',
      type: 'Remote • 6 Weeks'
    },
    {
      id: 4,
      title: 'Web Development Trainee',
      company: 'NDRise Learning Hub',
      appliedDate: 'Jul 15, 2026',
      status: 'Selected',
      type: 'Virtual • 4 Weeks'
    }
  ],

  testPerformance: {
    attended: 18,
    passed: 15,
    averageScore: 82,
    highestScore: 96,
    recentScores: [
      { id: 1, name: 'Test 1', score: 78, date: 'Aug 01' },
      { id: 2, name: 'Test 2', score: 84, date: 'Aug 03' },
      { id: 3, name: 'Test 3', score: 91, date: 'Aug 05' },
      { id: 4, name: 'Test 4', score: 76, date: 'Aug 07' },
      { id: 5, name: 'Test 5', score: 88, date: 'Aug 09' }
    ]
  },

  atsBreakdown: [
    { name: 'Keyword Match', score: 72 },
    { name: 'Skills', score: 88 },
    { name: 'Experience', score: 76 },
    { name: 'Projects', score: 81 },
    { name: 'Formatting', score: 85 }
  ],

  projectsList: [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      status: 'Completed',
      progress: 100,
      techStack: 'React + CSS'
    },
    {
      id: 2,
      title: 'E-Commerce Web Application',
      status: 'Completed',
      progress: 100,
      techStack: 'React + REST API'
    },
    {
      id: 3,
      title: 'Full-Stack Task Management App',
      status: 'In Progress',
      progress: 65,
      techStack: 'React + Node.js'
    }
  ],

  certificatesList: [
    {
      id: 1,
      title: 'Frontend Development Internship',
      company: 'NDRise Technologies',
      date: 'August 2026',
      type: 'Internship'
    },
    {
      id: 2,
      title: 'React Development Mastery',
      company: 'NDRise Learning Hub',
      date: 'July 2026',
      type: 'Course'
    },
    {
      id: 3,
      title: 'Web Fundamentals & CSS Grid',
      company: 'NDRise Learning Hub',
      date: 'June 2026',
      type: 'Course'
    }
  ],

  careerReadiness: {
    overall: 78,
    breakdown: [
      { name: 'Profile', score: 90 },
      { name: 'Resume', score: 85 },
      { name: 'ATS Score', score: 78 },
      { name: 'Projects', score: 82 },
      { name: 'Technical Tests', score: 82 },
      { name: 'Interview Prep', score: 72 }
    ],
    strongestArea: 'Projects — 82%',
    recommendedImprovement: 'Interview Preparation — 72%'
  },

  careerJourney: [
    { stage: 'Learn', status: 'completed' },
    { stage: 'Build', status: 'completed' },
    { stage: 'Practice', status: 'completed' },
    { stage: 'Apply', status: 'completed' },
    { stage: 'Interview', status: 'completed' },
    { stage: 'Internship', status: 'active' },
    { stage: 'Project', status: 'pending' },
    { stage: 'Certificate', status: 'pending' },
    { stage: 'Career', status: 'pending' }
  ],

  recentActivity: [
    { id: 1, text: 'React Development Test completed (Score: 88%)', time: '2 hours ago', icon: 'Award' },
    { id: 2, text: 'Internship application submitted: Frontend Developer Intern', time: 'Yesterday', icon: 'Send' },
    { id: 3, text: 'Project Task 2 approved: E-Commerce Application', time: 'Yesterday', icon: 'CheckCircle2' },
    { id: 4, text: 'ATS score updated (72 → 78)', time: '2 days ago', icon: 'Target' },
    { id: 5, text: 'Certificate earned: React Development', time: '5 days ago', icon: 'Award' }
  ],

  upcomingDeadlines: [
    {
      id: 1,
      title: 'Task 3 Submission',
      subtitle: 'Full-Stack Task Management App',
      dueDate: 'August 28, 2026',
      daysRemaining: 3,
      urgency: 'high' // <3 days -> Red
    },
    {
      id: 2,
      title: 'Technical Assessment',
      subtitle: 'Frontend Developer Internship',
      dueDate: 'August 30, 2026',
      daysRemaining: 5,
      urgency: 'medium' // 3-7 days -> Yellow
    }
  ],
  
  recommendedInternships: [
    {
      id: 'rec-1',
      title: 'React Developer Intern',
      details: 'Remote • 8 Weeks • Beginner',
      company: 'NDRise Technologies'
    },
    {
      id: 'rec-2',
      title: 'Frontend Developer Intern',
      details: 'Hybrid • 12 Weeks • Intermediate',
      company: 'ABC Tech'
    }
  ]
};
