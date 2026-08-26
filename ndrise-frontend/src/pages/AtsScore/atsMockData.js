// Mock ATS Analysis Dataset and Generator
export const TARGET_INTERNSHIP_OPTIONS = [
  { id: 'general', label: 'General Resume Analysis' },
  { id: 'react-dev', label: 'React Development Internship' },
  { id: 'frontend-dev', label: 'Frontend Developer Internship' },
  { id: 'python-dev', label: 'Python Developer Internship' },
  { id: 'data-science', label: 'Data Science Internship' },
  { id: 'ui-ux', label: 'UI/UX Design Internship' }
];

export const defaultATSResult = {
  score: 78,
  grade: 'Good',
  feedback: 'Your resume is reasonably optimized, but there are key areas you can improve before applying.',
  breakdown: [
    { category: 'Keyword Match', score: 72, key: 'keywords' },
    { category: 'Skills', score: 88, key: 'skills' },
    { category: 'Experience', score: 76, key: 'experience' },
    { category: 'Projects', score: 81, key: 'projects' },
    { category: 'Formatting', score: 85, key: 'formatting' },
    { category: 'Education', score: 100, key: 'education' },
    { category: 'Contact Information', score: 100, key: 'contact' }
  ],
  matchedKeywords: [
    'React',
    'JavaScript',
    'HTML5',
    'CSS3',
    'GitHub',
    'Responsive Design',
    'Git'
  ],
  missingKeywords: [
    'REST API Integration',
    'React Router',
    'State Management (Redux/Zustand)',
    'Unit Testing (Jest/RTL)',
    'CI/CD Pipelines'
  ],
  suggestions: [
    {
      id: 1,
      priority: 'High',
      title: 'Improve Keyword Alignment',
      description: 'Add essential keywords like "REST API Integration" and "React Router" to your technical skills section to match automated ATS filters.'
    },
    {
      id: 2,
      priority: 'Medium',
      title: 'Enhance Project Descriptions',
      description: 'Clearly describe what you built, specific technologies used, and state persistence or API integrations implemented.'
    },
    {
      id: 3,
      priority: 'Medium',
      title: 'Add Measurable Achievements',
      description: 'Include quantifiable metrics in your experience or projects (e.g., "Improved page load speed by 35% through component optimization").'
    },
    {
      id: 4,
      priority: 'Low',
      title: 'Highlight Live Project Links',
      description: 'Ensure Vercel, Netlify, or GitHub deployment URLs are explicitly linked in your project section for evaluator verification.'
    }
  ]
};

// Returns domain-specific ATS result tailored to chosen internship track
export function getATSAnalysisResult(targetTrackId, fileName, fileSize = 0) {
  const combined = (fileName || 'resume') + (fileSize || '');
  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = (seed * 31 + combined.charCodeAt(i)) % 100000;
  }

  let baseScore = 65 + (seed % 22); // Score varies between 65 and 87
  let matchedKeywords = [...defaultATSResult.matchedKeywords];
  let missingKeywords = [...defaultATSResult.missingKeywords];

  if (targetTrackId === 'react-dev' || targetTrackId === 'frontend-dev') {
    baseScore += 4;
    matchedKeywords = ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3/Sass', 'Git & GitHub', 'DOM Manipulation', 'Vite'];
    missingKeywords = ['REST API Consumption', 'React Hooks (useContext)', 'Tailwind CSS', 'Jest Unit Tests'];
  } else if (targetTrackId === 'python-dev') {
    baseScore -= 2;
    matchedKeywords = ['Python 3', 'OOP Concepts', 'File I/O', 'Web Scraping', 'Automation Scripts', 'Git'];
    missingKeywords = ['Django / FastAPI', 'SQL Database Schema', 'Docker Containers', 'REST API Architecture'];
  } else if (targetTrackId === 'data-science') {
    baseScore -= 3;
    matchedKeywords = ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Exploratory Data Analysis', 'SQL Queries'];
    missingKeywords = ['Scikit-Learn', 'Statistical Hypothesis Testing', 'Machine Learning Pipelines', 'Tableau'];
  } else if (targetTrackId === 'ui-ux') {
    baseScore += 5;
    matchedKeywords = ['Figma', 'Wireframing', 'User Research', 'Interactive Prototyping', 'Design Systems', 'Auto-Layout'];
    missingKeywords = ['Usability Testing Reports', 'Accessibility (WCAG)', 'Micro-Animations', 'Information Architecture'];
  }

  const score = Math.min(96, Math.max(48, baseScore));
  let grade = score >= 90 ? 'Excellent' : score >= 78 ? 'Very Good' : score >= 65 ? 'Good' : 'Needs Improvement';

  const breakdown = [
    { category: 'Keyword Match', score: Math.min(100, Math.max(40, score - 3)), key: 'keywords' },
    { category: 'Skills', score: Math.min(100, Math.max(45, score + 5)), key: 'skills' },
    { category: 'Formatting', score: Math.min(100, Math.max(50, score + 2)), key: 'formatting' },
    { category: 'Contact Information', score: 100, key: 'contact' }
  ];

  let feedback = `Your resume "${fileName || 'Uploaded Resume'}" is ${grade.toLowerCase()} optimized for ${TARGET_INTERNSHIP_OPTIONS.find(t => t.id === targetTrackId)?.label || 'general software roles'}, with an overall compatibility rating of ${score}/100.`;

  return {
    score,
    grade,
    feedback,
    breakdown,
    matchedKeywords,
    missingKeywords,
    suggestions: defaultATSResult.suggestions,
    analyzedFile: fileName || 'Uploaded Resume',
    analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

