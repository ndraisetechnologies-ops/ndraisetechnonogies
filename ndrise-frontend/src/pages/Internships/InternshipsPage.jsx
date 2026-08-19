import React, { useState } from 'react';
import { Search, Users, Clock, ArrowRight, Code, Server, Terminal, BarChart2, Cpu, Shield, Layout, Smartphone, Atom, Cloud } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './InternshipsPage.css';

export const ALL_INTERNSHIPS = [
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    category: 'Development',
    duration: '4 Weeks',
    applicants: '23.9K',
    level: 'Beginner to Intermediate',
    icon: Code,
    iconColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    bannerTag: 'Development • Frontend Development',
    image: '/banner_frontend.png',
    tasksCount: 3,
    description: 'Build responsive web apps, interactive React dashboards, and modern UI components.',
    skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Design', 'Git'],
    tasks: [
      { id: 1, title: 'Task 1: Personal Portfolio Website', difficulty: 'Easy', desc: 'Design and build a responsive personal developer portfolio website showcasing your skills, bio, project gallery, and contact form.' },
      { id: 2, title: 'Task 2: Interactive Web Application', difficulty: 'Medium', desc: 'Create a fully functional interactive web app using DOM manipulation or React hooks with clean UI and smooth state persistence.' },
      { id: 3, title: 'Task 3: Dynamic E-Commerce Store UI', difficulty: 'Hard', desc: 'Develop a modern multi-page e-commerce product catalog with search filter and cart functionality.' }
    ]
  },
  {
    id: 'backend-dev',
    title: 'Backend Development',
    category: 'Development',
    duration: '4 Weeks',
    applicants: '21.9K',
    level: 'Intermediate',
    icon: Server,
    iconColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    bannerTag: 'Development • Backend Development',
    image: '/banner_backend.png',
    tasksCount: 3,
    description: 'Architect REST APIs, database schemas, authentication systems, and server logic.',
    skills: ['Node.js', 'Express', 'Python', 'MongoDB', 'SQL', 'REST API'],
    tasks: [
      { id: 1, title: 'Task 1: User Auth & Registration API', difficulty: 'Easy', desc: 'Build secure authentication APIs with JWT tokens and password hashing.' },
      { id: 2, title: 'Task 2: CRUD RESTful Service for E-Commerce', difficulty: 'Medium', desc: 'Develop API endpoints connecting to database with request validation and error handling.' },
      { id: 3, title: 'Task 3: Microservice Architecture & API Gateway', difficulty: 'Hard', desc: 'Deploy multi-service backend with database relationships and documentation.' }
    ]
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Development',
    category: 'Development',
    duration: '4 Weeks',
    applicants: '91.5K',
    level: 'Intermediate to Advanced',
    icon: Atom,
    iconColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    bannerTag: 'Development • Full Stack Development',
    image: '/banner_fullstack.png',
    tasksCount: 3,
    description: 'Master end-to-end web applications combining dynamic frontends and robust backends.',
    skills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Full Stack Architecture'],
    tasks: [
      { id: 1, title: 'Task 1: Full Stack Task Manager App', difficulty: 'Easy', desc: 'Build React UI connected to Node/Express backend database.' },
      { id: 2, title: 'Task 2: Real-time Collaboration Platform', difficulty: 'Medium', desc: 'Create live real-time messaging application with WebSockets.' },
      { id: 3, title: 'Task 3: Full Stack E-Commerce Platform', difficulty: 'Hard', desc: 'Develop full e-commerce system with payment gateway and admin dashboard.' }
    ]
  },
  {
    id: 'python-dev',
    title: 'Python Programming',
    category: 'Development',
    duration: '4 Weeks',
    applicants: '45.2K',
    level: 'Beginner to Intermediate',
    icon: Terminal,
    iconColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    bannerTag: 'Development • Python Programming',
    image: '/banner_python.png',
    tasksCount: 3,
    description: 'Master Python fundamentals, object-oriented programming, data scraping, and automation tools.',
    skills: ['Python 3', 'OOP Concepts', 'File I/O', 'Web Scraping', 'GUI', 'Automation'],
    tasks: [
      { id: 1, title: 'Task 1: CLI Quiz Game or Music Player', difficulty: 'Easy', desc: 'Build OOP interactive command-line app with scoring and validation.' },
      { id: 2, title: 'Task 2: Real-time Weather App', difficulty: 'Medium', desc: 'Fetch live weather API data and present formatted CLI/GUI report.' },
      { id: 3, title: 'Task 3: Automated Web Scraper', difficulty: 'Hard', desc: 'Extract structured web data into CSV/JSON format.' }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    category: 'AI & Data Science',
    duration: '4 Weeks',
    applicants: '38.4K',
    level: 'Intermediate',
    icon: BarChart2,
    iconColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    bannerTag: 'AI & Data Science • Analytics',
    image: '/banner_datascience.png',
    tasksCount: 3,
    description: 'Clean real-world datasets, perform exploratory analysis, build statistical charts and predictive models.',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Predictive Modeling'],
    tasks: [
      { id: 1, title: 'Task 1: Exploratory Data Analysis (EDA)', difficulty: 'Easy', desc: 'Clean, filter, and visualize statistical insights from real datasets.' },
      { id: 2, title: 'Task 2: Customer Segmentation Model', difficulty: 'Medium', desc: 'Train classification machine learning models and evaluate accuracy.' },
      { id: 3, title: 'Task 3: Sales Forecasting Pipeline', difficulty: 'Hard', desc: 'Build regression pipeline to forecast future trends.' }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    category: 'AI & Data Science',
    duration: '4 Weeks',
    applicants: '52.1K',
    level: 'Intermediate to Advanced',
    icon: Cpu,
    iconColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    bannerTag: 'AI & Data Science • Machine Learning',
    image: '/banner_aiml.png',
    tasksCount: 3,
    description: 'Train deep neural networks, computer vision algorithms, and natural language processing pipelines.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Neural Networks', 'NLP'],
    tasks: [
      { id: 1, title: 'Task 1: Handwritten Digit Recognition (MNIST)', difficulty: 'Easy', desc: 'Build CNN model with high accuracy test predictions.' },
      { id: 2, title: 'Task 2: Object Detection System (OpenCV)', difficulty: 'Medium', desc: 'Implement real-time object detection cascades.' },
      { id: 3, title: 'Task 3: Generative AI Chatbot UI', difficulty: 'Hard', desc: 'Deploy AI transformer model with interactive web UI.' }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    category: 'Design',
    duration: '4 Weeks',
    applicants: '18.7K',
    level: 'Beginner to Intermediate',
    icon: Layout,
    iconColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.15)',
    bannerTag: 'Design • UI/UX Design',
    image: '/banner_uiux.svg',
    tasksCount: 3,
    description: 'Design user flows, wireframes, interactive Figma prototypes, and cohesive design systems.',
    skills: ['Figma', 'Wireframing', 'Interactive Prototyping', 'Design Systems', 'User Research'],
    tasks: [
      { id: 1, title: 'Task 1: Mobile App Redesign Wireframe', difficulty: 'Easy', desc: 'Create low-fidelity wireframes and user flow diagram.' },
      { id: 2, title: 'Task 2: High-Fidelity Interactive Figma Prototype', difficulty: 'Medium', desc: 'Design full interactive screens with auto-layout.' },
      { id: 3, title: 'Task 3: Comprehensive Design System & Case Study', difficulty: 'Hard', desc: 'Build component design system and document Behance case study.' }
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    category: 'Development',
    duration: '4 Weeks',
    applicants: '27.3K',
    level: 'Beginner to Intermediate',
    icon: Smartphone,
    iconColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    bannerTag: 'Development • Mobile Development',
    image: '/banner_mobile.svg',
    tasksCount: 3,
    description: 'Build cross-platform mobile apps for Android & iOS using Flutter or React Native.',
    skills: ['Flutter', 'Dart', 'React Native', 'Firebase Auth', 'Mobile UI'],
    tasks: [
      { id: 1, title: 'Task 1: Mobile Quiz & Flashcard App', difficulty: 'Easy', desc: 'Create animated mobile quiz app with score tracking.' },
      { id: 2, title: 'Task 2: Personal Expense Tracker App', difficulty: 'Medium', desc: 'Build expense tracker app with visual charts and local storage.' },
      { id: 3, title: 'Task 3: Real-time Fitness Mobile App', difficulty: 'Hard', desc: 'Develop full mobile UI connected to Firebase backend.' }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    category: 'Emerging Tech',
    duration: '4 Weeks',
    applicants: '15.8K',
    level: 'Intermediate',
    icon: Shield,
    iconColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    bannerTag: 'Emerging Tech • Cyber Security',
    image: '/banner_backend.png',
    tasksCount: 3,
    description: 'Learn network security analysis, packet inspection, port scanning, and vulnerability auditing.',
    skills: ['Ethical Hacking', 'Network Security', 'Wireshark', 'Vulnerability Scan'],
    tasks: [
      { id: 1, title: 'Task 1: Python Port Scanner Tool', difficulty: 'Easy', desc: 'Build multi-threaded port scanner CLI tool.' },
      { id: 2, title: 'Task 2: Wireshark Packet Inspection Report', difficulty: 'Medium', desc: 'Analyze pcap logs for suspicious network activity.' },
      { id: 3, title: 'Task 3: Security Audit & Vulnerability Report', difficulty: 'Hard', desc: 'Perform vulnerability audit and write remediation report.' }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineering',
    category: 'Engineering',
    duration: '4 Weeks',
    applicants: '19.4K',
    level: 'Intermediate to Advanced',
    icon: Cloud,
    iconColor: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.15)',
    bannerTag: 'Engineering • Cloud & DevOps',
    image: '/banner_cloud.png',
    tasksCount: 3,
    description: 'Master cloud infrastructure, containerization with Docker, and automated CI/CD deployment pipelines.',
    skills: ['AWS Essentials', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux Shell'],
    tasks: [
      { id: 1, title: 'Task 1: Containerize App with Docker', difficulty: 'Easy', desc: 'Create Dockerfiles and compose multi-container environment.' },
      { id: 2, title: 'Task 2: Automated GitHub Actions CI/CD Pipeline', difficulty: 'Medium', desc: 'Set up automated build, test, and deployment workflow.' },
      { id: 3, title: 'Task 3: AWS Cloud Architecture Deployment', difficulty: 'Hard', desc: 'Deploy web app on AWS EC2 with load balancer and SSL.' }
    ]
  },
  {
    id: 'java-dev',
    title: 'Java Development',
    category: 'Development',
    duration: '4 Weeks',
    applicants: '32.6K',
    level: 'Beginner to Intermediate',
    icon: Server,
    iconColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    bannerTag: 'Development • Java Development',
    image: '/banner_java.png',
    tasksCount: 3,
    description: 'Master Core Java, Object-Oriented principles, Data Structures, and Spring Boot REST APIs.',
    skills: ['Java 17+', 'OOP Principles', 'Spring Boot', 'JPA/Hibernate', 'SQL'],
    tasks: [
      { id: 1, title: 'Task 1: Bank Management System', difficulty: 'Easy', desc: 'Build Java OOP console app for account operations.' },
      { id: 2, title: 'Task 2: Student Course Registration System', difficulty: 'Medium', desc: 'Develop system managing student course enrollments.' },
      { id: 3, title: 'Task 3: Spring Boot REST API for E-Commerce', difficulty: 'Hard', desc: 'Create CRUD REST APIs using Spring Boot and H2/MySQL.' }
    ]
  },
  {
    id: 'business-analytics',
    title: 'Business Analytics',
    category: 'Business',
    duration: '4 Weeks',
    applicants: '14.1K',
    level: 'Beginner to Intermediate',
    icon: BarChart2,
    iconColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    bannerTag: 'Business • Business Analytics',
    image: '/banner_datascience.png',
    tasksCount: 3,
    description: 'Transform raw enterprise data into interactive Power BI dashboards and strategic business insights.',
    skills: ['Power BI', 'Advanced Excel', 'SQL Queries', 'Tableau', 'KPI Reporting'],
    tasks: [
      { id: 1, title: 'Task 1: Executive Sales Performance Dashboard', difficulty: 'Easy', desc: 'Build interactive Excel/Power BI dashboard with KPIs.' },
      { id: 2, title: 'Task 2: Market Funnel & Conversion Analysis', difficulty: 'Medium', desc: 'Analyze user acquisition metrics and retention trends.' },
      { id: 3, title: 'Task 3: Strategic Business Intelligence Report', difficulty: 'Hard', desc: 'Generate executive BI deck with actionable insights.' }
    ]
  }
];

export default function InternshipsPage({ onSelectInternship }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Programs');
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    'All Programs',
    'Development',
    'AI & Data Science',
    'Design',
    'Business',
    'Engineering',
    'Emerging Tech'
  ];

  const filteredInternships = ALL_INTERNSHIPS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Programs' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="internships-domains-page">
      {/* 1. Header Banner */}
      <div className="domains-header-container">
        <motion.h1 
          className="domains-main-title"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Available <span className="blue-highlight-text">Internships</span>
        </motion.h1>
        <motion.p 
          className="domains-sub-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Choose from a wide range of technical and non-technical domains. Gain hands-on experience and get certified.
        </motion.p>

        {/* 2. Search Input */}
        <motion.div 
          className="domains-search-wrapper"
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="domains-search-box">
            <Search className="domains-search-icon" size={20} />
            <input 
              type="text"
              className="domains-search-input"
              placeholder="Search domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* 3. Category Filter Pills */}
        <motion.div 
          className="domains-category-pills"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {categories.map(cat => (
            <motion.button 
              key={cat}
              className={`domain-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* 4. Domains Cards Grid */}
      <motion.div 
        className="domains-grid-container"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="domain-card-item"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.018 }}
                transition={{ 
                  duration: 0.4, 
                  delay: Math.min(index * 0.04, 0.25),
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                
                {/* Image Banner Top */}
                <div className="domain-card-banner">
                  <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    className="domain-banner-img" 
                    whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="banner-tag-badge">
                    <span>{item.bannerTag}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="domain-card-body">
                  <h3 className="domain-card-title">{item.title}</h3>

                  {/* Metadata Row: Enrolled count + Duration */}
                  <div className="domain-meta-row">
                    <div className="domain-meta-item">
                      <Users size={16} className="meta-icon" />
                      <span>{item.applicants}</span>
                    </div>
                    <div className="domain-meta-item">
                      <Clock size={16} className="meta-icon" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <motion.button 
                    className="btn-domain-apply"
                    onClick={() => onSelectInternship && onSelectInternship(item)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={16} className="apply-arrow-icon" />
                  </motion.button>
                </div>

              </motion.div>
            ))
          ) : (
            <motion.div 
              className="domains-empty-state"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <Search size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
              <h3>No internship domains found</h3>
              <p>Try searching for keywords like "Frontend", "Python", "Data", or select another category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}

