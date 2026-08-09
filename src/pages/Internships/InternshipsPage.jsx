import React, { useState } from 'react';
import { Search, Filter, Atom, Server, Terminal, BarChart2, Smartphone, Cloud, Cpu, Shield, Layout, CheckCircle2, ArrowRight } from 'lucide-react';
import './InternshipsPage.css';

export const ALL_INTERNSHIPS = [
  {
    id: 'web-dev',
    title: 'Web Development Virtual Internship',
    category: 'Web Development',
    duration: '4 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Build real-world web applications including personal portfolio, interactive JavaScript tools, and dynamic web apps to earn your verifiable certificate.',
    icon: Atom,
    iconColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Design', 'Git & GitHub', 'REST API'],
    tasks: [
      { id: 1, title: 'Task 1: Personal Portfolio Website', difficulty: 'Easy', desc: 'Design and build a responsive personal developer portfolio website showcasing your skills, bio, project gallery, and contact form.' },
      { id: 2, title: 'Task 2: Interactive Web Application (Calculator / To-Do App)', difficulty: 'Medium', desc: 'Create a fully functional interactive web app using DOM manipulation or React hooks with clean UI and smooth state persistence.' },
      { id: 3, title: 'Task 3: Dynamic E-Commerce Store or Dashboard UI', difficulty: 'Hard', desc: 'Develop a modern multi-page e-commerce product catalog or dashboard with search filter, cart functionality, and responsive grid layout.' }
    ]
  },
  {
    id: 'python-dev',
    title: 'Python Programming Virtual Internship',
    category: 'Python',
    duration: '4 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Master Python fundamentals, OOP, file handling, web scraping, and GUI development through practical project tasks.',
    icon: Terminal,
    iconColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    skills: ['Python 3', 'OOP Concepts', 'File I/O', 'Web Scraping (BeautifulSoup)', 'GUI (Tkinter/PyQt)', 'Automation'],
    tasks: [
      { id: 1, title: 'Task 1: Command-Line Music Player or Quiz Game', difficulty: 'Easy', desc: 'Build an interactive CLI tool with object-oriented structure, scoring system, and input validation.' },
      { id: 2, title: 'Task 2: Real-time Weather App or Currency Converter', difficulty: 'Medium', desc: 'Fetch live data using OpenWeatherMap/Exchange REST API and display formatted results with error handling.' },
      { id: 3, title: 'Task 3: Automated Web Scraper or Task Automation Script', difficulty: 'Hard', desc: 'Create a Python script using BeautifulSoup or Selenium to extract structural data from websites into CSV/JSON format.' }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics Virtual Internship',
    category: 'Data Science',
    duration: '4 Weeks',
    level: 'Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Analyze real datasets, perform exploratory data analysis (EDA), data cleaning, and build predictive machine learning models.',
    icon: BarChart2,
    iconColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    skills: ['Python Pandas', 'NumPy', 'Matplotlib & Seaborn', 'SQL', 'Scikit-Learn', 'EDA', 'Data Cleaning'],
    tasks: [
      { id: 1, title: 'Task 1: Exploratory Data Analysis (EDA) on Dataset', difficulty: 'Easy', desc: 'Clean, filter, and visualize statistical insights and correlations using Pandas and Seaborn.' },
      { id: 2, title: 'Task 2: Iris Flower Classification or Customer Segmentation Model', difficulty: 'Medium', desc: 'Train supervised machine learning classification algorithms and evaluate model accuracy with confusion matrix.' },
      { id: 3, title: 'Task 3: Predictive Sales Forecasting or Sentiment Analysis', difficulty: 'Hard', desc: 'Build an end-to-end regression or NLP pipeline to forecast future trends and output visual reports.' }
    ]
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & ML Virtual Internship',
    category: 'AI & ML',
    duration: '4 Weeks',
    level: 'Intermediate to Advanced',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Train neural networks, deep learning models, computer vision tasks, and natural language processing pipelines.',
    icon: Cpu,
    iconColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Deep Learning', 'Neural Networks', 'NLP'],
    tasks: [
      { id: 1, title: 'Task 1: Handwritten Digit Recognition (MNIST CNN)', difficulty: 'Easy', desc: 'Build a Convolutional Neural Network (CNN) to recognize digits with >98% test accuracy.' },
      { id: 2, title: 'Task 2: Face & Object Detection System (OpenCV)', difficulty: 'Medium', desc: 'Implement real-time bounding box detection using pre-trained YOLO/Haar cascades.' },
      { id: 3, title: 'Task 3: Generative AI Chatbot UI or Text Summarizer', difficulty: 'Hard', desc: 'Deploy an AI model using Hugging Face Transformers or OpenAI API with an interactive web UI.' }
    ]
  },
  {
    id: 'app-dev',
    title: 'Mobile App Development Virtual Internship',
    category: 'Mobile Development',
    duration: '4 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Build native & cross-platform Android/iOS mobile applications using Flutter or React Native with Firebase integration.',
    icon: Smartphone,
    iconColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    skills: ['Flutter', 'Dart', 'React Native', 'Mobile UI Components', 'Firebase Auth', 'REST APIs'],
    tasks: [
      { id: 1, title: 'Task 1: Flashcard / Quiz App UI', difficulty: 'Easy', desc: 'Create a smooth animated mobile quiz app with score tracking and custom theme toggle.' },
      { id: 2, title: 'Task 2: Personal Expense Tracker & Analytics App', difficulty: 'Medium', desc: 'Build an app that tracks daily expenses with visual charts, local storage, and category filters.' },
      { id: 3, title: 'Task 3: Real-time Fitness / E-Commerce Mobile App', difficulty: 'Hard', desc: 'Develop a full mobile UI connected to Firebase backend with user auth, live data, and shopping cart.' }
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security Virtual Internship',
    category: 'Cybersecurity',
    duration: '4 Weeks',
    level: 'Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Learn ethical hacking fundamentals, network vulnerability assessment, packet analysis, and security auditing.',
    icon: Shield,
    iconColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    skills: ['Ethical Hacking', 'Network Security', 'Wireshark', 'Python Security Scripts', 'Vulnerability Assessment', 'Penetration Testing'],
    tasks: [
      { id: 1, title: 'Task 1: Python Port Scanner Tool', difficulty: 'Easy', desc: 'Develop a multi-threaded Python CLI port scanner that identifies open network ports and services.' },
      { id: 2, title: 'Task 2: Wireshark Network Packet Inspection Report', difficulty: 'Medium', desc: 'Analyze packet capture (pcap) logs to detect suspicious traffic, HTTP plain text credentials, and ARP spoofing.' },
      { id: 3, title: 'Task 3: Vulnerability Assessment & Security Audit Report', difficulty: 'Hard', desc: 'Perform a simulated vulnerability scan on OWASP Juice Shop and write a remediation report.' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Virtual Internship',
    category: 'UI/UX Design',
    duration: '4 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Design user journeys, wireframes, interactive Figma prototypes, micro-interactions, and design systems.',
    icon: Layout,
    iconColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.15)',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'Micro-animations', 'User Persona'],
    tasks: [
      { id: 1, title: 'Task 1: Mobile App Redesign (Food Delivery / EdTech)', difficulty: 'Easy', desc: 'Create low-fidelity wireframes and user flow diagram for improving a popular app UI.' },
      { id: 2, title: 'Task 2: High-Fidelity Interactive Figma Prototype', difficulty: 'Medium', desc: 'Design full high-fidelity screens with auto-layout, interactive component states, and dark mode variant.' },
      { id: 3, title: 'Task 3: Comprehensive Design System & Case Study', difficulty: 'Hard', desc: 'Build a reusable design system (typography, color tokens, buttons, cards) and write a Behance/Medium case study.' }
    ]
  },
  {
    id: 'java-dev',
    title: 'Java Development Virtual Internship',
    category: 'Java',
    duration: '4 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Virtual / Self-Paced',
    tasksCount: 3,
    description: 'Master Core Java, Object-Oriented Programming (OOP), Data Structures, and Spring Boot backend APIs.',
    icon: Server,
    iconColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    skills: ['Java 17+', 'OOP Principles', 'Collections Framework', 'Multithreading', 'Spring Boot Basics', 'JDBC/Hibernate'],
    tasks: [
      { id: 1, title: 'Task 1: Bank Management System (Console / GUI)', difficulty: 'Easy', desc: 'Build a Java OOP application managing bank accounts, deposits, withdrawals, and transaction history.' },
      { id: 2, title: 'Task 2: Student Course Registration System', difficulty: 'Medium', desc: 'Develop a Java system with file persistence/database connecting students, courses, and grade calculation.' },
      { id: 3, title: 'Task 3: Spring Boot REST API for E-Commerce / LMS', difficulty: 'Hard', desc: 'Create CRUD REST APIs using Spring Boot, JPA, and H2/MySQL database with Swagger documentation.' }
    ]
  }
];

export default function InternshipsPage({ onSelectInternship, onOpenTasksModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    'All Categories',
    'Web Development',
    'Python',
    'Data Science',
    'AI & ML',
    'Mobile Development',
    'Cybersecurity',
    'UI/UX Design',
    'Java'
  ];

  const filteredInternships = ALL_INTERNSHIPS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="internships-page">
      <div className="internships-hero-banner">
        <h1 className="internships-page-title">
          Explore Virtual <span>Internship Domains</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0.5rem auto 1.5rem', fontSize: '0.95rem' }}>
          Select your domain, receive an official offer letter within 24 hours, complete 3 hands-on tasks, and earn your verifiable certificate & Letter of Recommendation.
        </p>

        <div className="search-box-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search domain by title, Python, React, Data Science, Figma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="catalog-layout">
        {/* Left Sidebar */}
        <div className="glass-panel sidebar-categories">
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
            Domain Categories
          </div>
          {categories.map(cat => (
            <div 
              key={cat}
              className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
            </div>
          ))}
        </div>

        {/* Right Cards Grid */}
        <div className="catalog-grid">
          {filteredInternships.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="glass-panel internship-card">
                <div 
                  className="card-icon-box"
                  style={{ background: item.glowColor, color: item.iconColor }}
                >
                  <Icon size={32} />
                </div>

                <div className="card-tag-row">
                  <span className="badge-4weeks">4-Week Track</span>
                  <span className="badge-tasks">{item.tasksCount} Assigned Tasks</span>
                </div>

                <h3 className="card-title">{item.title}</h3>

                <div className="card-meta">
                  <span>⏱ {item.duration}</span>
                  <span className="meta-divider"></span>
                  <span>🎯 {item.level}</span>
                  <span className="meta-divider"></span>
                  <span>🌐 {item.mode}</span>
                </div>

                <p className="card-desc">{item.description}</p>

                <div className="skills-chip-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {item.skills.slice(0, 4).map(skill => (
                    <span key={skill} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>
                      {skill}
                    </span>
                  ))}
                  {item.skills.length > 4 && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>+{item.skills.length - 4} more</span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
                    onClick={() => onOpenTasksModal && onOpenTasksModal(item)}
                  >
                    View Tasks
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '0.6rem 0.5rem' }}
                    onClick={() => onSelectInternship(item)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
