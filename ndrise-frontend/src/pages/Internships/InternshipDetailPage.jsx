import React, { useState } from 'react';
import { 
  ArrowLeft, Share2, Clock, Target, Globe, BookOpen, 
  Award, CheckCircle2, ChevronDown, ChevronUp, Code, 
  Terminal, FileText, Check, ExternalLink, Sparkles, Layers
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { AccordionContent } from '../../components/Motion/MotionUtils';
import './InternshipDetailPage.css';

export default function InternshipDetailPage({ internship, onBack, onApplyClick, onShareClick, onOpenTasksModal }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

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
      <motion.button 
        className="btn-back-nav" 
        onClick={onBack}
        whileHover={shouldReduceMotion ? {} : { x: -4 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft size={18} />
        <span>Back to Internships</span>
      </motion.button>

      {/* Course Header Banner */}
      <motion.div 
        className="detail-header-banner"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="detail-header-content">
          {internship.bannerTag && (
            <motion.div 
              className="detail-header-tag"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span>{internship.bannerTag}</span>
            </motion.div>
          )}

          <motion.h1 
            className="detail-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            {internship.title}
          </motion.h1>

          <motion.div 
            className="detail-badges"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
          >
            <span className="badge badge-purple">⏱ {internship.duration}</span>
            <span className="badge badge-blue">🎯 {internship.level}</span>
            <span className="badge badge-cyan">🌐 {internship.mode || 'Online'}</span>
            <span className="badge badge-green">👥 {internship.applicants || '20K+'} Enrolled</span>
          </motion.div>

          <motion.p 
            className="detail-header-desc"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {internship.description} Build portfolio-ready projects and master industry standards under expert mentorship.
          </motion.p>

          <motion.div 
            className="detail-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
          >
            <motion.button 
              className="btn-primary" 
              style={{ padding: '0.85rem 2rem', gap: '0.6rem' }} 
              onClick={() => onApplyClick(internship)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles size={18} />
              Apply Now
            </motion.button>
            <motion.button 
              className="btn-secondary" 
              onClick={onShareClick}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <Share2 size={16} />
              Share
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side Banner Picture */}
        <motion.div 
          className="detail-header-graphic"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {internship.image ? (
            <motion.img 
              src={internship.image} 
              alt={internship.title} 
              className="detail-header-img"
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              transition={{ duration: 0.35 }}
            />
          ) : (
            <div className="detail-fallback-icon">
              <Icon size={64} color="#38bdf8" />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Sticky Navigation Tabs */}
      <motion.div 
        className="detail-tabs-bar"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            className={`detail-tab-btn ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.name, tab.id)}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {tab.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Main Grid Content */}
      <div className="detail-layout">
        <div className="detail-main-content">
          
          {/* TAB 1: OVERVIEW */}
          <motion.section 
            id="overview" 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
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
              {[
                { icon: Layers, title: "Practical Projects", desc: "Build 3 production-grade projects for your portfolio." },
                { icon: Award, title: "Verified Credentials", desc: "Receive an official Offer Letter & QR-verified Certificate." },
                { icon: Target, title: "Expert Guidelines", desc: "Step-by-step instructions and code review standards." },
                { icon: Globe, title: "100% Online & Flexible", desc: "Self-paced schedule tailored for students & freshers." }
              ].map((feat, i) => {
                const FeatIcon = feat.icon;
                return (
                  <motion.div 
                    key={i} 
                    className="feature-mini-card"
                    whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FeatIcon className="feature-icon" size={24} />
                    <div>
                      <h4>{feat.title}</h4>
                      <p>{feat.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* TAB 2: WHAT YOU'LL LEARN */}
          <motion.section 
            id="what-youll-learn" 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="detail-section-title">
              <Target size={22} className="section-title-icon" />
              What You'll Learn
            </h2>
            <p className="detail-text-paragraph">
              Gain practical competencies across key tools, libraries, and design patterns essential for professional engineering roles:
            </p>

            <div className="learn-skills-grid">
              {skillsToDisplay.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  className="learn-skill-card"
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  transition={{ duration: 0.18 }}
                >
                  <CheckCircle2 size={20} className="check-bullet" />
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* TAB 3: CURRICULUM */}
          <motion.section 
            id="curriculum" 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="detail-section-title">
              <Clock size={22} className="section-title-icon" />
              Curriculum Roadmap
            </h2>

            <div className="curriculum-timeline">
              {curriculumModules.map((mod, idx) => (
                <motion.div 
                  key={idx} 
                  className="curriculum-card"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  transition={{ duration: 0.2 }}
                >
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
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* TAB 4: PROJECTS */}
          <motion.section 
            id="projects" 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
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
                <motion.div 
                  key={task.id || idx} 
                  className="task-detail-card"
                  whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.008 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="task-header-row">
                    <span className={`task-diff-tag diff-${(task.difficulty || 'Easy').toLowerCase()}`}>
                      {task.difficulty || 'Easy'}
                    </span>
                    <h3 className="task-card-title">{task.title}</h3>
                  </div>

                  <p className="task-card-desc">{task.desc}</p>

                  <div className="task-actions-row">
                    <motion.button 
                      className="btn-task-action btn-task-outline"
                      onClick={() => onOpenTasksModal && onOpenTasksModal(internship, task)}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FileText size={15} />
                      <span>View Guidelines</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* TAB 5: FAQ */}
          <motion.section 
            id="faq" 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
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
                    <motion.div
                      animate={{ rotate: openFaqIndex === idx ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>
                  <AccordionContent isOpen={openFaqIndex === idx}>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </AccordionContent>
                </div>
              ))}
            </div>
          </motion.section>

        </div>

        {/* Right Sidebar Sticky Details */}
        <div className="detail-sidebar-container">
          <motion.div 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
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

            <motion.button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
              onClick={() => onApplyClick(internship)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              Apply Now
            </motion.button>
          </motion.div>

          <motion.div 
            className="glass-panel detail-section-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
          >
            <h3 className="detail-sidebar-title">Skills Overview</h3>
            <div className="skills-list">
              {skillsToDisplay.map((s, idx) => (
                <div key={idx} className="skill-item">
                  <CheckCircle2 className="skill-check-icon" size={16} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

