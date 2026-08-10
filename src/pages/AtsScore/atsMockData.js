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
export function getATSAnalysisResult(targetTrackId, fileName) {
  let score = 78;
  let grade = 'Good';
  let matchedKeywords = [...defaultATSResult.matchedKeywords];
  let missingKeywords = [...defaultATSResult.missingKeywords];
  let breakdown = defaultATSResult.breakdown.map(b => ({ ...b }));

  if (targetTrackId === 'react-dev' || targetTrackId === 'frontend-dev') {
    score = 82;
    grade = 'Very Good';
    matchedKeywords = ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3/Sass', 'Git & GitHub', 'DOM Manipulation', 'Vite'];
    missingKeywords = ['REST API Consumption', 'React Hooks (useContext/useReducer)', 'Tailwind / CSS Modules', 'Jest Unit Tests'];
    breakdown[0].score = 78;
    breakdown[1].score = 90;
  } else if (targetTrackId === 'python-dev') {
    score = 74;
    grade = 'Good';
    matchedKeywords = ['Python 3', 'OOP Concepts', 'File I/O', 'Web Scraping', 'Automation Scripts', 'Git'];
    missingKeywords = ['Django / FastAPI', 'SQL Database Schema', 'Docker Containers', 'REST API Architecture'];
    breakdown[0].score = 70;
    breakdown[1].score = 82;
  } else if (targetTrackId === 'data-science') {
    score = 71;
    grade = 'Good';
    matchedKeywords = ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Exploratory Data Analysis', 'SQL Queries'];
    missingKeywords = ['Scikit-Learn', 'Statistical Hypothesis Testing', 'Machine Learning Pipelines', 'Power BI / Tableau'];
    breakdown[0].score = 68;
    breakdown[1].score = 78;
  } else if (targetTrackId === 'ui-ux') {
    score = 86;
    grade = 'Very Good';
    matchedKeywords = ['Figma', 'Wireframing', 'User Research', 'Interactive Prototyping', 'Design Systems', 'Auto-Layout'];
    missingKeywords = ['Usability Testing Reports', 'Accessibility (WCAG)', 'Micro-Animations', 'Information Architecture'];
    breakdown[0].score = 84;
    breakdown[1].score = 92;
  }

  // Derive human-readable grade text
  if (score >= 90) grade = 'Excellent';
  else if (score >= 75) grade = 'Very Good';
  else if (score >= 60) grade = 'Good';
  else if (score >= 40) grade = 'Fair';
  else grade = 'Needs Improvement';

  let feedback = `Your resume is ${grade.toLowerCase()} optimized for ${TARGET_INTERNSHIP_OPTIONS.find(t => t.id === targetTrackId)?.label || 'general software roles'}, but addressing the missing keywords can significantly boost your ATS pass rate.`;

  return {
    score,
    grade,
    feedback,
    breakdown,
    matchedKeywords,
    missingKeywords,
    suggestions: defaultATSResult.suggestions,
    analyzedFile: fileName,
    analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}
