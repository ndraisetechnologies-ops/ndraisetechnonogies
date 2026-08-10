import React, { useState } from 'react';
import { Search, Code, BarChart2, Smartphone, Shield, Layout, Database, Cloud, Clock, HelpCircle, CheckCircle2, ArrowRight, X, Play, RotateCcw, BookOpen, Target } from 'lucide-react';
import './BrowseCoursesPage.css';

export const ALL_COURSES = [
  {
    id: 'web-dev-cert',
    title: 'Web Development',
    category: 'DEVELOPMENT',
    level: 'BEGINNER',
    levelType: 'beginner',
    iconType: 'code',
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
    description: 'Build and test your skills in HTML, CSS, JavaScript, and modern web frameworks.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which HTML element is used to define the main content of a document?',
        options: ['<main>', '<content>', '<header>', '<section>'],
        correct: 0
      },
      {
        id: 2,
        question: 'Which CSS property controls the spacing inside an element container?',
        options: ['margin', 'padding', 'border-spacing', 'gap'],
        correct: 1
      },
      {
        id: 3,
        question: 'What is the correct syntax for referring to an external script called "app.js"?',
        options: ['<script href="app.js">', '<script src="app.js">', '<script name="app.js">', '<script link="app.js">'],
        correct: 1
      }
    ]
  },
  {
    id: 'python-cert',
    title: 'Python Programming',
    category: 'PROGRAMMING',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'code',
    iconColor: '#d97706',
    iconBg: '#fffbe6',
    description: 'Evaluate your knowledge of Python fundamentals, logic building, and problem-solving.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'What is the correct data type output of type([1, 2, 3]) in Python?',
        options: ['tuple', 'list', 'set', 'dictionary'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which keyword is used to define a function in Python?',
        options: ['func', 'def', 'function', 'create'],
        correct: 1
      },
      {
        id: 3,
        question: 'How do you insert comments in Python code?',
        options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'],
        correct: 2
      }
    ]
  },
  {
    id: 'java-cert',
    title: 'Java Programming',
    category: 'PROGRAMMING',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'code',
    iconColor: '#dc2626',
    iconBg: '#fef2f2',
    description: 'Assess your understanding of Java concepts including OOP, syntax, and application logic.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which keyword is used to inherit a class in Java?',
        options: ['implements', 'extends', 'inherits', 'super'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which access modifier makes a variable accessible only within the same class?',
        options: ['public', 'protected', 'private', 'package-private'],
        correct: 2
      },
      {
        id: 3,
        question: 'What is the entry point method signature for any standard Java program?',
        options: ['public void main(String[] args)', 'public static void main(String[] args)', 'static void main()', 'public int main(String args)'],
        correct: 1
      }
    ]
  },
  {
    id: 'c-cert',
    title: 'C Programming',
    category: 'PROGRAMMING',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'code',
    iconColor: '#2563eb',
    iconBg: '#eff6ff',
    description: 'Test your core programming skills including memory management and logic building in C.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which operator is used to get the memory address of a variable in C?',
        options: ['*', '&', '->', '%'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which function is used to allocate memory dynamically in C?',
        options: ['malloc()', 'alloc()', 'new()', 'memget()'],
        correct: 0
      },
      {
        id: 3,
        question: 'What is the size of int data type in standard 64-bit GCC compiler?',
        options: ['2 bytes', '4 bytes', '8 bytes', '1 byte'],
        correct: 1
      }
    ]
  },
  {
    id: 'cpp-cert',
    title: 'C++ Programming',
    category: 'PROGRAMMING',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'code',
    iconColor: '#9333ea',
    iconBg: '#f3e8ff',
    description: 'Demonstrate mastery in C++ object-oriented design, pointers, memory allocation, and STL.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which standard library container implements a dynamic array in C++?',
        options: ['std::list', 'std::vector', 'std::deque', 'std::array'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which feature in C++ allows a function or operator to have multiple definitions?',
        options: ['Overloading', 'Encapsulation', 'Abstraction', 'Virtualization'],
        correct: 0
      },
      {
        id: 3,
        question: 'Which keyword is used to declare a virtual destructor in C++?',
        options: ['virtual', 'override', 'destructor', 'delete'],
        correct: 0
      }
    ]
  },
  {
    id: 'javascript-cert',
    title: 'JavaScript ES6+',
    category: 'PROGRAMMING',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'code',
    iconColor: '#ca8a04',
    iconBg: '#fefce8',
    description: 'Test async JS, closures, DOM manipulation, promises, arrow functions, and ES6+ features.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which keyword defines a block-scoped variable that cannot be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correct: 2
      },
      {
        id: 2,
        question: 'What does the Array.prototype.map() method return?',
        options: ['A single value', 'A new array with modified elements', 'Boolean true/false', 'The original modified array'],
        correct: 1
      },
      {
        id: 3,
        question: 'What is the output of typeof null in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correct: 2
      }
    ]
  },
  {
    id: 'data-science-cert',
    title: 'Data Science & Analytics',
    category: 'DATA SCIENCE',
    level: 'BEGINNER',
    levelType: 'beginner',
    iconType: 'chart',
    iconColor: '#16a34a',
    iconBg: '#f0fdf4',
    description: 'Analyze data, generate insights with Pandas, NumPy, visualization, and basic SQL.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which Python library is primary for data manipulation and tabular DataFrames?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'Scipy'],
        correct: 1
      },
      {
        id: 2,
        question: 'What measure of central tendency is most sensitive to extreme outliers?',
        options: ['Median', 'Mean', 'Mode', 'Range'],
        correct: 1
      },
      {
        id: 3,
        question: 'Which plot is best suited to display distribution of a single numerical variable?',
        options: ['Scatter plot', 'Pie chart', 'Histogram', 'Bar graph'],
        correct: 2
      }
    ]
  },
  {
    id: 'machine-learning-cert',
    title: 'Machine Learning & AI',
    category: 'DATA SCIENCE',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'chart',
    iconColor: '#dc2626',
    iconBg: '#fef2f2',
    description: 'Evaluate knowledge of regression, neural networks, classification algorithms, and PyTorch.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which algorithm is a supervised learning method for classification?',
        options: ['K-Means Clustering', 'Random Forest', 'PCA', 'DBSCAN'],
        correct: 1
      },
      {
        id: 2,
        question: 'What metric measures the fraction of correct predictions made by a model?',
        options: ['Recall', 'Precision', 'Accuracy', 'F1-Score'],
        correct: 2
      },
      {
        id: 3,
        question: 'Which activation function outputs values in the range (0, 1)?',
        options: ['ReLU', 'Sigmoid', 'Tanh', 'Leaky ReLU'],
        correct: 1
      }
    ]
  },
  {
    id: 'mobile-dev-cert',
    title: 'Android & Flutter Dev',
    category: 'MOBILE DEV',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'mobile',
    iconColor: '#059669',
    iconBg: '#ecfdf5',
    description: 'Build and test mobile applications using Flutter and React Native with Firebase backend.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which programming language is primarily used to write Flutter apps?',
        options: ['Java', 'Kotlin', 'Dart', 'Swift'],
        correct: 2
      },
      {
        id: 2,
        question: 'In Flutter, what component type is used for UI elements that hold internal state?',
        options: ['StatelessWidget', 'StatefulWidget', 'InheritedWidget', 'BuildWidget'],
        correct: 1
      },
      {
        id: 3,
        question: 'Which tool handles app dependencies in React Native applications?',
        options: ['npm / yarn', 'pubspec.yaml', 'Gradle', 'CocoaPods'],
        correct: 0
      }
    ]
  },
  {
    id: 'cyber-sec-cert',
    title: 'Ethical Hacking & Security',
    category: 'CYBER SECURITY',
    level: 'ADVANCED',
    levelType: 'advanced',
    iconType: 'shield',
    iconColor: '#d97706',
    iconBg: '#fffbeb',
    description: 'Validate skills in network security, packet analysis, Wireshark, and vulnerability auditing.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which tool is widely used for network packet capturing and protocol analysis?',
        options: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite'],
        correct: 1
      },
      {
        id: 2,
        question: 'What type of attack involves overwhelming a server with fictitious traffic?',
        options: ['SQL Injection', 'DDoS Attack', 'Man-in-the-Middle', 'XSS Attack'],
        correct: 1
      },
      {
        id: 3,
        question: 'What port is standard for secure HTTPS communications?',
        options: ['80', '21', '443', '22'],
        correct: 2
      }
    ]
  },
  {
    id: 'ui-ux-cert',
    title: 'UI/UX & Figma Design',
    category: 'DESIGN',
    level: 'BEGINNER',
    levelType: 'beginner',
    iconType: 'layout',
    iconColor: '#db2777',
    iconBg: '#fdf2f8',
    description: 'Test wireframing, color theory, component systems, and interactive Figma prototyping.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'What does UX stand for in digital design?',
        options: ['User Experience', 'Universal Extension', 'User Execution', 'Unified Interface'],
        correct: 0
      },
      {
        id: 2,
        question: 'Which layout feature in Figma automatically resizes containers based on content?',
        options: ['Constraints', 'Auto Layout', 'Grid System', 'Smart Animate'],
        correct: 1
      },
      {
        id: 3,
        question: 'What design artifact illustrates low-fidelity structural page layouts without color styling?',
        options: ['High-fi Prototype', 'Wireframe', 'Moodboard', 'Style Guide'],
        correct: 1
      }
    ]
  },
  {
    id: 'sql-cert',
    title: 'SQL & Database Design',
    category: 'DATA SCIENCE',
    level: 'INTERMEDIATE',
    levelType: 'intermediate',
    iconType: 'database',
    iconColor: '#0284c7',
    iconBg: '#f0f9ff',
    description: 'Assess complex SQL queries, JOINs, database normalization, indexing, and schema design.',
    duration: '12 minute',
    questions: '10 Questions',
    passScore: 'Instant Score',
    reward: 'Knowledge Check',
    quizQuestions: [
      {
        id: 1,
        question: 'Which SQL clause is used to filter records after performing GROUP BY aggregation?',
        options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
        correct: 1
      },
      {
        id: 2,
        question: 'Which JOIN returns all records from the left table and matched records from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
        correct: 1
      },
      {
        id: 3,
        question: 'Which key uniquely identifies each record in a relational database table?',
        options: ['Foreign Key', 'Primary Key', 'Candidate Key', 'Composite Key'],
        correct: 1
      }
    ]
  }
];

export default function BrowseCoursesPage({ onSelectCourse }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeQuizCourse, setActiveQuizCourse] = useState(null);
  
  // Quiz Modal State
  const [currentStep, setCurrentStep] = useState(0); // 0: Intro, 1: Quiz, 2: Result
  const [userAnswers, setUserAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);

  const categories = ['ALL', 'DEVELOPMENT', 'PROGRAMMING', 'DATA SCIENCE', 'MOBILE DEV', 'CYBER SECURITY', 'DESIGN'];

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || course.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getIcon = (type, color) => {
    switch (type) {
      case 'chart':
        return <BarChart2 size={24} color={color} />;
      case 'mobile':
        return <Smartphone size={24} color={color} />;
      case 'shield':
        return <Shield size={24} color={color} />;
      case 'layout':
        return <Layout size={24} color={color} />;
      case 'database':
        return <Database size={24} color={color} />;
      default:
        // Code bracket SVG matching reference image icon < >
        return (
          <span style={{ fontSize: '18px', fontWeight: '800', color: color, letterSpacing: '-2px' }}>
            &lt;/&gt;
          </span>
        );
    }
  };

  const handleStartCourse = (course) => {
    setActiveQuizCourse(course);
    setCurrentStep(0);
    setUserAnswers({});
    setQuizScore(0);
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCalculateScore = () => {
    if (!activeQuizCourse) return;
    let score = 0;
    activeQuizCourse.quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    const percentage = Math.round((score / activeQuizCourse.quizQuestions.length) * 100);
    setQuizScore(percentage);
    setCurrentStep(2);
  };

  return (
    <div className="browse-courses-page">
      {/* 1. Header Banner */}
      <div className="courses-header-container">
        <h1 className="courses-main-title">
          Validate Your Skills. <span className="blue-title-highlight">Knowledge Check.</span>
        </h1>
        <p className="courses-sub-title">
          Take industry-level skill assessments and test your domain knowledge to evaluate your expertise.
        </p>

        {/* 2. Search Bar */}
        <div className="search-bar-wrapper">
          <div className="search-bar-input-group">
            <Search className="search-bar-icon" size={20} />
            <input 
              type="text" 
              className="search-bar-field" 
              placeholder="Search for a skill or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills-row">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Cards Grid */}
      <div className="courses-grid-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card-item">
              
              {/* Card Top Row: Icon + Level Badge */}
              <div className="card-top-bar">
                <div 
                  className="course-icon-circle" 
                  style={{ backgroundColor: course.iconBg }}
                >
                  {getIcon(course.iconType, course.iconColor)}
                </div>
                
                <span className={`level-pill-badge level-${course.levelType}`}>
                  {course.level}
                </span>
              </div>

              {/* Category Subtitle */}
              <div className="course-category-tag">
                {course.category}
              </div>

              {/* Course Title */}
              <h3 className="course-card-title">
                {course.title}
              </h3>

              {/* Course Description */}
              <p className="course-card-description">
                {course.description}
              </p>

              {/* Metadata Info Grid */}
              <div className="course-meta-details">
                <div className="meta-info-item">
                  <Clock size={14} className="meta-info-icon" />
                  <span>{course.duration}</span>
                </div>
                <div className="meta-info-item">
                  <Search size={14} className="meta-info-icon" />
                  <span>{course.questions}</span>
                </div>
                <div className="meta-info-item">
                  <Target size={14} className="meta-info-icon" />
                  <span>{course.passScore}</span>
                </div>
                <div className="meta-info-item">
                  <BookOpen size={14} className="meta-info-icon" />
                  <span>{course.reward}</span>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="course-card-footer">
                <button 
                  className="btn-start-course"
                  onClick={() => handleStartCourse(course)}
                >
                  <span>Start Test</span>
                  <ArrowRight size={16} className="start-arrow" />
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="courses-empty-state">
            <Search size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h3>No skill assessments found</h3>
            <p>Try searching for "Python", "Web", "Java", or clear your filter.</p>
          </div>
        )}
      </div>

      {/* Interactive Quiz / Assessment Modal */}
      {activeQuizCourse && (
        <div className="modal-overlay" onClick={() => setActiveQuizCourse(null)}>
          <div className="quiz-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveQuizCourse(null)}>
              <X size={20} />
            </button>

            {currentStep === 0 && (
              <div className="quiz-intro-view">
                <div className="quiz-intro-badge">
                  {activeQuizCourse.category} • {activeQuizCourse.level}
                </div>
                <h2 className="quiz-modal-title">{activeQuizCourse.title} Knowledge Check</h2>
                <p className="quiz-modal-subtitle">{activeQuizCourse.description}</p>
                
                <div className="quiz-info-cards">
                  <div className="quiz-info-box">
                    <Clock size={20} color="#2563eb" />
                    <div>
                      <strong>Duration</strong>
                      <span>{activeQuizCourse.duration}</span>
                    </div>
                  </div>
                  <div className="quiz-info-box">
                    <HelpCircle size={20} color="#2563eb" />
                    <div>
                      <strong>Questions</strong>
                      <span>{activeQuizCourse.questions}</span>
                    </div>
                  </div>
                  <div className="quiz-info-box">
                    <BookOpen size={20} color="#2563eb" />
                    <div>
                      <strong>Assessment Type</strong>
                      <span>Knowledge Check</span>
                    </div>
                  </div>
                </div>

                <div className="quiz-actions-row">
                  <button className="btn-secondary" onClick={() => setActiveQuizCourse(null)}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={() => setCurrentStep(1)}>
                    <Play size={18} />
                    <span>Begin Knowledge Check</span>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="quiz-question-view">
                <div className="quiz-progress-bar">
                  <div className="progress-fill" style={{ width: '100%' }} />
                </div>
                <div className="quiz-step-header">
                  <span>Knowledge Assessment ({activeQuizCourse.quizQuestions.length} Questions)</span>
                  <span className="badge badge-purple">{activeQuizCourse.title}</span>
                </div>

                <div className="quiz-questions-list">
                  {activeQuizCourse.quizQuestions.map((q, qIdx) => (
                    <div key={q.id} className="quiz-q-card">
                      <h4 className="q-title">
                        Q{qIdx + 1}: {q.question}
                      </h4>
                      <div className="q-options-grid">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            type="button"
                            className={`q-option-btn ${userAnswers[qIdx] === optIdx ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(qIdx, optIdx)}
                          >
                            <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                            <span className="opt-text">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="quiz-actions-row">
                  <button className="btn-secondary" onClick={() => setCurrentStep(0)}>
                    Back
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleCalculateScore}
                    disabled={Object.keys(userAnswers).length < activeQuizCourse.quizQuestions.length}
                  >
                    <span>Submit Answers</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="quiz-result-view">
                <div className="result-icon-badge">
                  <CheckCircle2 size={48} color="#10b981" />
                </div>

                <h2 className="result-title">
                  Knowledge Check Completed!
                </h2>
                <p className="result-desc">
                  You scored {quizScore}% on the {activeQuizCourse.title} Knowledge Check. Keep practicing and strengthening your skills!
                </p>

                <div className="score-summary-box">
                  <div className="score-number">{quizScore}%</div>
                  <div className="score-label">Knowledge Check Score</div>
                </div>

                <div className="quiz-actions-row">
                  <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
                    <RotateCcw size={16} />
                    <span>Retake Test</span>
                  </button>
                  <button className="btn-primary" onClick={() => setActiveQuizCourse(null)}>
                    <CheckCircle2 size={16} />
                    <span>Finish Knowledge Check</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
