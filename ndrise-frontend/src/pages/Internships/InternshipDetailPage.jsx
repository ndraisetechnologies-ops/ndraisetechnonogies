import React, { useState } from 'react';
import { 
  ArrowLeft, Share2, Clock, Target, Globe, BookOpen, 
  Award, CheckCircle2, ChevronDown, ChevronUp, Code, 
  Terminal, FileText, Check, ExternalLink, Sparkles, Layers
} from 'lucide-react';
import './InternshipDetailPage.css';

export default function InternshipDetailPage({ internship, onBack, onApplyClick, onShareClick, onOpenTasksModal }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!internship) return null;

  const Icon = internship.icon || Code;

  const tabs = [
    { name: 'Overview', id: 'overview' },
    { name: "What You'll Learn", id: 'what-youll-learn' },
    { name: 'Curriculum', id: 'curriculum' },
    { name: 'Projects', id: 'projects' },
    { name: 'FAQ', id: 'faq' }
  ];

  const handleTabClick = (tabName, tabId) => {
    setActiveTab(tabName);
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const defaultSkills = [
    "HTML5, CSS3, JavaScript ES6+",
    "React.js & Component Architecture",
    "State Management & Hooks",
    "RESTful API Integration",
    "Responsive UI Design",
    "Git & GitHub Collaboration",
    "Production Build & Deployment"
  ];

  const skillsToDisplay = internship.skills || defaultSkills;

  const faqs = [
    {
      q: "Who can apply for this virtual internship?",
      a: "This program is open to all students, freshers, and self-taught developers eager to gain hands-on experience and build industry-ready projects."
    },
    {
      q: "How is the internship structured?",
      a: "It is a self-paced 4-week program. You complete practical projects, follow guidelines, and submit your code repositories for mentor review."
    },
    {
      q: "Will I receive an Offer Letter and Verified Certificate?",
      a: "Yes! An official Offer Letter is issued immediately upon application, and a QR-verified Certificate of Completion is awarded after task submission."
    },
    {
      q: "What if I need extra time to complete my tasks?",
      a: "Submissions are flexible. You can work at your own pace and submit your tasks whenever you complete them without penalty."
    },
    {
      q: "Is there any registration fee?",
      a: "No! Enrollment, access to guidelines, and certificate verification in our virtual internship program are 100% free."
    }
  ];

  const curriculumModules = [
    {
      week: "Week 1",
      title: "Foundations & Development Environment",
      desc: "Set up professional developer tools, learn version control with Git & GitHub, and master semantic structure and responsive layouts.",
      topics: ["Environment & CLI Setup", "Git Branching & GitHub Workflow", "Core Architecture & Semantics"]
    },
    {
      week: "Week 2",
      title: "Component Design & State Logic",
      desc: "Understand dynamic UI patterns, modular state management, custom hooks, and interactive event flows.",
      topics: ["Component Architecture", "State & Effect Hooks", "Form Validation & Controlled Components"]
    },
    {
      week: "Week 3",
      title: "API Integration & Async Operations",
      desc: "Connect frontends with backend endpoints, handle async HTTP requests, implement caching, and deal with error boundaries.",
      topics: ["REST API Consumption", "Async/Await Patterns", "Client-side Routing & Persistence"]
    },
    {
      week: "Week 4",
      title: "Capstone Project & Production Deployment",
      desc: "Build your final capstone project, write clean documentation, optimize performance, and deploy live to production hosting.",
      topics: ["Capstone Development", "Performance & Lighthouse Optimization", "Live Vercel/Netlify Deployment"]
    }
  ];

  return (
    <div className="detail-page">
      {/* High-visibility Back Button */}
      <button className="btn-back-nav" onClick={onBack}>
        <ArrowLeft size={18} />
        <span>Back to Internships</span>
      </button>

      {/* Course Header Banner */}
      <div className="detail-header-banner">
        <div className="detail-header-content">
          {internship.bannerTag && (
            <div className="detail-header-tag">
              <span>{internship.bannerTag}</span>
            </div>
          )}

          <h1 className="detail-title">{internship.title}</h1>

          <div className="detail-badges">
            <span className="badge badge-purple">⏱ {internship.duration}</span>
            <span className="badge badge-blue">🎯 {internship.level}</span>
            <span className="badge badge-cyan">🌐 {internship.mode || 'Online'}</span>
            <span className="badge badge-green">👥 {internship.applicants || '20K+'} Enrolled</span>
          </div>

          <p className="detail-header-desc">
            {internship.description} Build portfolio-ready projects and master industry standards under expert mentorship.
          </p>

          <div className="detail-actions">
            <button className="btn-primary" style={{ padding: '0.85rem 2rem', gap: '0.6rem' }} onClick={() => onApplyClick(internship)}>
              <Sparkles size={18} />
              Apply Now
            </button>
            <button className="btn-secondary" onClick={onShareClick}>
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* Right Side Banner Picture */}
        <div className="detail-header-graphic">
          {internship.image ? (
            <img src={internship.image} alt={internship.title} className="detail-header-img" />
          ) : (
            <div className="detail-fallback-icon">
              <Icon size={64} color="#38bdf8" />
            </div>
          )}
        </div>
      </div>

      {/* Sticky Navigation Tabs */}
      <div className="detail-tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`detail-tab-btn ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.name, tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="detail-layout">
        <div className="detail-main-content">
          
          {/* TAB 1: OVERVIEW */}
          <section id="overview" className="glass-panel detail-section-card">
            <h2 className="detail-section-title">
              <BookOpen size={22} className="section-title-icon" />
              Overview
            </h2>
            <p className="detail-text-paragraph">
              This <strong>{internship.title}</strong> internship is structured for students and developers who want hands-on experience building real-world projects. You will learn modern industry workflows, clean code architecture, and deployment standards.
            </p>
            <p className="detail-text-paragraph">
              Throughout the duration of <strong>{internship.duration}</strong>, you will work on production-style assignments, receive guidance, and compile a strong developer portfolio to showcase to prospective recruiters.
            </p>

            <div className="overview-features-grid">
              <div className="feature-mini-card">
                <Layers className="feature-icon" size={24} />
                <div>
                  <h4>Practical Projects</h4>
                  <p>Build 3 production-grade projects for your portfolio.</p>
                </div>
              </div>
              <div className="feature-mini-card">
                <Award className="feature-icon" size={24} />
                <div>
                  <h4>Verified Credentials</h4>
                  <p>Receive an official Offer Letter & QR-verified Certificate.</p>
                </div>
              </div>
              <div className="feature-mini-card">
                <Target className="feature-icon" size={24} />
                <div>
                  <h4>Expert Guidelines</h4>
                  <p>Step-by-step instructions and code review standards.</p>
                </div>
              </div>
              <div className="feature-mini-card">
                <Globe className="feature-icon" size={24} />
                <div>
                  <h4>100% Online & Flexible</h4>
                  <p>Self-paced schedule tailored for students & freshers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* TAB 2: WHAT YOU'LL LEARN */}
          <section id="what-youll-learn" className="glass-panel detail-section-card">
            <h2 className="detail-section-title">
              <Target size={22} className="section-title-icon" />
              What You'll Learn
            </h2>
            <p className="detail-text-paragraph">
              Gain practical competencies across key tools, libraries, and design patterns essential for professional engineering roles:
            </p>

            <div className="learn-skills-grid">
              {skillsToDisplay.map((skill, idx) => (
                <div key={idx} className="learn-skill-card">
                  <CheckCircle2 size={20} className="check-bullet" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TAB 3: CURRICULUM */}
          <section id="curriculum" className="glass-panel detail-section-card">
            <h2 className="detail-section-title">
              <Clock size={22} className="section-title-icon" />
              Curriculum Roadmap
            </h2>

            <div className="curriculum-timeline">
              {curriculumModules.map((mod, idx) => (
                <div key={idx} className="curriculum-card">
                  <div className="curriculum-badge">{mod.week}</div>
                  <div className="curriculum-body">
                    <h4>{mod.title}</h4>
                    <p>{mod.desc}</p>
                    <div className="curriculum-topics">
                      {mod.topics.map((t, i) => (
                        <span key={i} className="topic-chip">✓ {t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TAB 4: PROJECTS */}
          <section id="projects" className="glass-panel detail-section-card">
            <h2 className="detail-section-title">
              <Code size={22} className="section-title-icon" />
              Assigned Projects ({internship.tasks ? internship.tasks.length : 3})
            </h2>
            <p className="detail-text-paragraph">
              Complete these practical assignments to earn your verified certificate of completion:
            </p>

            <div className="tasks-detail-list">
              {(internship.tasks || [
                { id: 1, title: 'Task 1: Portfolio & Profile Interface', difficulty: 'Easy', desc: 'Build a responsive personal website with modern styling and project gallery.' },
                { id: 2, title: 'Task 2: Interactive Web App', difficulty: 'Medium', desc: 'Develop a dynamic application with state management and live API data.' },
                { id: 3, title: 'Task 3: Full Capstone Application', difficulty: 'Hard', desc: 'Deploy a complete full-stack web application with authentication and routing.' }
              ]).map((task, idx) => (
                <div key={task.id || idx} className="task-detail-card">
                  <div className="task-header-row">
                    <span className={`task-diff-tag diff-${(task.difficulty || 'Easy').toLowerCase()}`}>
                      {task.difficulty || 'Easy'}
                    </span>
                    <h3 className="task-card-title">{task.title}</h3>
                  </div>

                  <p className="task-card-desc">{task.desc}</p>

                  <div className="task-actions-row">
                    <button 
                      className="btn-task-action btn-task-outline"
                      onClick={() => onOpenTasksModal && onOpenTasksModal(internship, task)}
                    >
                      <FileText size={15} />
                      <span>View Guidelines</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TAB 5: FAQ */}
          <section id="faq" className="glass-panel detail-section-card">
            <h2 className="detail-section-title">
              <Award size={22} className="section-title-icon" />
              Frequently Asked Questions
            </h2>

            <div className="faq-accordion">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {openFaqIndex === idx && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Sidebar Sticky Details */}
        <div className="detail-sidebar-container">
          <div className="glass-panel detail-section-card">
            <h3 className="detail-sidebar-title">Key Program Highlights</h3>
            
            <div className="info-row">
              <span className="info-label">Duration</span>
              <span className="info-value">{internship.duration}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Difficulty</span>
              <span className="info-value">{internship.level}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Learning Format</span>
              <span className="info-value">{internship.mode || 'Online / Remote'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Offer Letter</span>
              <span className="info-value" style={{ color: '#34d399' }}>Instant Included</span>
            </div>
            <div className="info-row">
              <span className="info-label">Certificate</span>
              <span className="info-value" style={{ color: '#38bdf8' }}>Verified QR Code</span>
            </div>
            <div className="info-row">
              <span className="info-label">Enrollment Fee</span>
              <span className="info-value" style={{ color: '#34d399' }}>Free ($0)</span>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
              onClick={() => onApplyClick(internship)}
            >
              Apply Now
            </button>
          </div>

          <div className="glass-panel detail-section-card">
            <h3 className="detail-sidebar-title">Skills Overview</h3>
            <div className="skills-list">
              {skillsToDisplay.map((s, idx) => (
                <div key={idx} className="skill-item">
                  <CheckCircle2 className="skill-check-icon" size={16} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
