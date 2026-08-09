import React, { useState } from 'react';
import { Search, Filter, Atom, Server, Terminal, BarChart2, Smartphone, Cloud, Cpu, Shield, Layout } from 'lucide-react';
import './InternshipsPage.css';

export const ALL_INTERNSHIPS = [
  {
    id: 'react-dev',
    title: 'React Development Internship',
    category: 'Web Development',
    duration: '8 Weeks',
    level: 'Beginner',
    mode: 'Online',
    description: 'Learn React from scratch and build real-world applications that make your portfolio stand out.',
    icon: Atom,
    iconColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Components & Props', 'State & Hooks', 'React Router', 'API Integration', 'Git & GitHub']
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Development',
    category: 'Web Development',
    duration: '12 Weeks',
    level: 'Intermediate',
    mode: 'Online',
    description: 'Master MERN stack (MongoDB, Express, React, Node) and build end-to-end scalable web applications.',
    icon: Server,
    iconColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST APIs', 'Deployment']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Internship',
    category: 'UI/UX Design',
    duration: '8 Weeks',
    level: 'Beginner',
    mode: 'Online',
    description: 'Learn Figma, wireframing, high-fidelity prototypes, user research, and modern dark glassmorphic design systems.',
    icon: Layout,
    iconColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.15)',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Usability Testing']
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics Internship',
    category: 'Data Science',
    duration: '8 Weeks',
    level: 'Beginner',
    mode: 'Online',
    description: 'Master SQL, PowerBI, Excel dashboarding, and Python data manipulation to generate actionable business insights.',
    icon: BarChart2,
    iconColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.15)',
    skills: ['SQL', 'Excel', 'PowerBI', 'Python Pandas', 'Data Viz', 'Dashboards']
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    category: 'AI & ML',
    duration: '12 Weeks',
    level: 'Intermediate',
    mode: 'Online',
    description: 'Build predictive AI models, neural networks, computer vision, and LLM integrations using PyTorch and Scikit-Learn.',
    icon: Cpu,
    iconColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Deep Learning', 'Generative AI']
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing & DevOps',
    category: 'Cloud Computing',
    duration: '10 Weeks',
    level: 'Intermediate',
    mode: 'Online',
    description: 'Learn AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure management for modern tech stacks.',
    icon: Cloud,
    iconColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform']
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    category: 'Mobile Development',
    duration: '10 Weeks',
    level: 'Intermediate',
    mode: 'Online',
    description: 'Build cross-platform iOS and Android mobile apps using React Native and Flutter with rich interactive UIs.',
    icon: Smartphone,
    iconColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    skills: ['Flutter', 'React Native', 'Dart/JS', 'State Management', 'Firebase', 'App Store Deploy']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    category: 'Cybersecurity',
    duration: '8 Weeks',
    level: 'Beginner',
    mode: 'Online',
    description: 'Learn ethical hacking, network security auditing, vulnerability assessment, and threat defense strategies.',
    icon: Shield,
    iconColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    skills: ['Network Security', 'Wireshark', 'Metasploit', 'Penetration Testing', 'SOC Operations']
  }
];

export default function InternshipsPage({ onSelectInternship }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');

  const categories = [
    'All Categories',
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Cloud Computing',
    'AI & ML',
    'Cybersecurity',
    'UI/UX Design'
  ];

  const filteredInternships = ALL_INTERNSHIPS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
    const matchesDuration = selectedDuration === 'All' || item.duration.includes(selectedDuration);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
  });

  return (
    <div className="internships-page">
      <div className="internships-hero-banner">
        <h1 className="internships-page-title">
          Find the Perfect <span>Internship</span> for You
        </h1>

        <div className="search-box-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search internships by skill, title, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-bar">
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            className="filter-select"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value="All">Duration: All</option>
            <option value="8">8 Weeks</option>
            <option value="10">10 Weeks</option>
            <option value="12">12 Weeks</option>
          </select>

          <select 
            className="filter-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="All">Level: All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>
      </div>

      <div className="catalog-layout">
        {/* Left Sidebar */}
        <div className="glass-panel sidebar-categories">
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
            Categories
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

                <h3 className="card-title">{item.title}</h3>

                <div className="card-meta">
                  <span>⏱ {item.duration}</span>
                  <span className="meta-divider"></span>
                  <span>🎯 {item.level}</span>
                  <span className="meta-divider"></span>
                  <span>🌐 {item.mode}</span>
                </div>

                <p className="card-desc">{item.description}</p>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => onSelectInternship(item)}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
