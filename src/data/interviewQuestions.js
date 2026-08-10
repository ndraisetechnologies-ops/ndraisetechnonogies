// Interview Question Database & Helper Utilities

export const TARGET_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Python Developer',
  'Data Analyst',
  'Data Scientist',
  'UI/UX Designer',
  'Digital Marketing',
  'Java Developer',
  'Software Developer'
];

export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const INTERVIEW_TYPES = ['Technical', 'HR', 'Behavioral', 'Mixed'];
export const PREP_MODES = ['Practice Questions', 'Mock Interview'];

export const INTERVIEW_CATEGORIES = [
  {
    id: 'Technical',
    title: 'Technical Interview',
    description: 'Practice questions related to your technical skills, algorithms, and target role.',
    count: 50,
    iconName: 'Code'
  },
  {
    id: 'HR',
    title: 'HR Interview',
    description: 'Prepare for common HR, recruiter background checks, and career vision questions.',
    count: 30,
    iconName: 'UserCheck'
  },
  {
    id: 'Behavioral',
    title: 'Behavioral Interview',
    description: 'Learn how to answer questions about teamwork, challenges, and problem solving using the STAR framework.',
    count: 20,
    iconName: 'Users'
  },
  {
    id: 'Resume',
    title: 'Resume-Based Interview',
    description: 'Practice questions based on your specific projects, tech stack, and practical experience.',
    count: 15,
    iconName: 'FileText'
  }
];

export const STAR_FRAMEWORK = {
  S: { letter: 'S', title: 'Situation', desc: 'Describe the specific situation or context where the event occurred.' },
  T: { letter: 'T', title: 'Task', desc: 'Explain the goal or specific task you were responsible for achieving.' },
  A: { letter: 'A', title: 'Action', desc: 'Detail the concrete action steps you took to address the challenge.' },
  R: { letter: 'R', title: 'Result', desc: 'Share the positive outcome, measurable results, or lessons learned.' }
};

export const MOCK_QUESTIONS = [
  // Technical - Frontend
  {
    id: 'tech-fe-1',
    category: 'Technical',
    role: 'Frontend Developer',
    difficulty: 'Beginner',
    question: 'What is the difference between useState and useEffect in React?',
    hint: 'Think about local component state management versus side effects during lifecycle rendering.',
    expectations: [
      'Understanding of state reactivity vs side effect hooks',
      'Clear explanation of dependency arrays in useEffect',
      'Practical example (e.g. API fetching or DOM listeners)'
    ],
    suggestedAnswer: 'useState is a React Hook used to store and update reactive local state within a component. useEffect is used to handle side effects such as fetching data from an API, subscribing to external stores, or directly manipulating DOM elements after rendering. useEffect accepts a callback function and a dependency array to control when it executes.',
    improvementTip: 'Mention how missing dependencies in useEffect can lead to memory leaks or infinite re-render loops.'
  },
  {
    id: 'tech-fe-2',
    category: 'Technical',
    role: 'Frontend Developer',
    difficulty: 'Intermediate',
    question: 'What is the Virtual DOM in React and how does reconciliation work?',
    hint: 'Focus on in-memory representation, diffing algorithm, and batch DOM updates.',
    expectations: [
      'Concept of lightweight JavaScript object tree',
      'Diffing algorithm mechanics between old and new Virtual DOM',
      'Performance benefit of minimizing direct real DOM updates'
    ],
    suggestedAnswer: 'The Virtual DOM is an in-memory lightweight representation of the actual DOM tree. When state changes, React creates a new Virtual DOM tree and compares it with the previous snapshot using a diffing algorithm (reconciliation). React then computes the minimal set of changes required and updates only those specific nodes in the real DOM, boosting rendering efficiency.',
    improvementTip: 'Explain how using proper unique "key" props helps React reconcile list items efficiently.'
  },

  // Technical - Python
  {
    id: 'tech-py-1',
    category: 'Technical',
    role: 'Python Developer',
    difficulty: 'Beginner',
    question: 'What is the difference between lists and tuples in Python?',
    hint: 'Think about mutability, memory efficiency, and syntax.',
    expectations: [
      'Mutability (lists can change, tuples cannot)',
      'Syntax brackets [] vs ()',
      'Performance and tuple immutability use cases'
    ],
    suggestedAnswer: 'In Python, lists are mutable data structures defined with square brackets [], meaning their elements can be added, removed, or modified after creation. Tuples are immutable data structures defined with parentheses (), meaning their elements cannot be changed once created. Tuples consume less memory and execute faster than lists.',
    improvementTip: 'Mention that tuples can be used as keys in dictionaries because they are hashable, whereas lists cannot.'
  },

  // HR Questions
  {
    id: 'hr-1',
    category: 'HR',
    role: 'Software Developer',
    difficulty: 'Beginner',
    question: 'Tell me about yourself.',
    hint: 'Structure your answer: Present -> Past Experience -> Future Career Goals.',
    expectations: [
      'Concise 60-90 second introduction',
      'Focus on technical background and relevant projects',
      'Enthusiasm for the role and company'
    ],
    suggestedAnswer: 'I am a Computer Science student with a strong passion for building responsive web applications. Recently, I have completed practical virtual tracks in Frontend Development where I built real-world projects using React and REST APIs. I am eager to apply my technical skills to solve real user problems and grow as an engineer at your organization.',
    improvementTip: 'Avoid summarizing your entire resume line-by-line; focus on key achievements and what drives your passion.'
  },
  {
    id: 'hr-2',
    category: 'HR',
    role: 'Frontend Developer',
    difficulty: 'Beginner',
    question: 'Why do you want this internship at NDRise Technologies?',
    hint: 'Connect your personal learning goals with the company mission.',
    expectations: [
      'Knowledge of company learning culture',
      'Clear goal alignment (Learn, Code, Grow)',
      'Genuine interest in practical project mentorship'
    ],
    suggestedAnswer: 'I am specifically drawn to NDRise Technologies because of your commitment to bridging the gap between college learning and real-world industry experience. Your emphasis on hands-on project building and structured mentorship aligns perfectly with my goal to become a industry-ready software developer.',
    improvementTip: 'Mention a specific project or domain track that inspired you to apply.'
  },

  // Behavioral Questions
  {
    id: 'beh-1',
    category: 'Behavioral',
    role: 'Full Stack Developer',
    difficulty: 'Intermediate',
    question: 'Tell me about a difficult technical problem you solved.',
    hint: 'Use the STAR framework (Situation, Task, Action, Result).',
    expectations: [
      'Clear problem identification',
      'Logical troubleshooting approach',
      'Measurable outcome or positive result'
    ],
    suggestedAnswer: 'Situation: During a group web project, our application suffered from slow initial load times.\nTask: I was tasked with optimizing the component bundle and image assets.\nAction: I implemented lazy loading for routes, optimized image formats, and memoized expensive computations.\nResult: We reduced page load time by 42% and achieved smooth 60fps interaction speed.',
    improvementTip: 'Quantify your result whenever possible (e.g. reduced load time by X%, improved score by Y).'
  },
  {
    id: 'beh-2',
    category: 'Behavioral',
    role: 'Frontend Developer',
    difficulty: 'Intermediate',
    question: 'Tell me about a time you disagreed with a teammate on a project design.',
    hint: 'Highlight constructive communication, active listening, and objective decision making.',
    expectations: [
      'Professional demeanor during conflict',
      'Focus on user benefit over personal ego',
      'Collaborative consensus or data-driven resolution'
    ],
    suggestedAnswer: 'Situation: A teammate and I disagreed on whether to use client-side local storage or a backend database for caching user filter preferences.\nTask: We needed to settle on a clean architecture without delaying our deadline.\nAction: I proposed a quick benchmark test comparing data load latency and security requirements.\nResult: We objectively agreed on local storage for non-sensitive theme filters, meeting our launch deadline smoothly.',
    improvementTip: 'Emphasize that the outcome prioritized project quality and team harmony.'
  }
];

export const QUESTION_OF_THE_DAY = {
  question: 'Tell me about a project you are proud of.',
  category: 'Behavioral',
  role: 'Software Developer',
  hint: 'Highlight your role, technologies used, challenges overcome, and final impact.'
};

export function getFilteredQuestions(role, category, difficulty) {
  return MOCK_QUESTIONS.filter((q) => {
    const matchRole = !role || q.role === role || q.role === 'Software Developer';
    const matchCategory = !category || category === 'All' || q.category === category;
    const matchDiff = !difficulty || difficulty === 'All' || q.difficulty === difficulty;
    return matchRole && matchCategory && matchDiff;
  });
}
