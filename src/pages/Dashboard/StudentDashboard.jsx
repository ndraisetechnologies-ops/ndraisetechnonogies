import React, { useState } from 'react';
import { LayoutDashboard, Home, BookOpen, Code, FileText, CheckSquare, Award, User, Settings, LogOut, Clock, Calendar, CheckCircle2, AlertCircle, Download, ExternalLink, Send } from 'lucide-react';
import OfferLetterModal from '../../components/Modals/OfferLetterModal';
import TaskSubmissionModal from '../../components/Modals/TaskSubmissionModal';
import './StudentDashboard.css';

export default function StudentDashboard({ user, onLogout, setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'my-internships', label: 'My Virtual Tracks', icon: BookOpen },
    { id: 'tasks', label: 'Assigned Tasks (3/3)', icon: Code },
    { id: 'offer-letter', label: 'Offer Letter', icon: FileText },
    { id: 'certificates', label: 'Verifiable Certificate', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {/* Brand Header (No onClick handler so title does NOT redirect to home) */}
        <div className="nav-brand">
          <div className="brand-logo-badge">
            <img src="/logo.jpg" alt="ND Technologies Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text">
            <div className="brand-title" style={{ fontSize: '1.05rem' }}>
              ND <span>TECHNOLOGIES</span>
            </div>
            <div className="brand-tagline">LEARN • CODE • GROW</div>
          </div>
        </div>

        <ul className="dashboard-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => {
                  if (item.id === 'home') {
                    if (setCurrentView) setCurrentView('home');
                  } else {
                    setActiveMenu(item.id);
                    if (item.id === 'offer-letter') setOfferModalOpen(true);
                    if (item.id === 'tasks') setSubmitModalOpen(true);
                  }
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: 'auto' }}>
          <div className="menu-item" style={{ color: '#ef4444' }} onClick={onLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="welcome-text">
            <h1>Welcome back, {user?.name || 'Nikhil Sharma'} 👋</h1>
            <p>ND Raise Virtual Internship Track • Batch August 2026</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              className="btn-secondary" 
              onClick={() => setCurrentView && setCurrentView('home')} 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer', background: 'var(--bg-pill)', border: '1px solid var(--border-pill)', color: 'var(--text-main)', fontWeight: '600' }}
            >
              <Home size={16} />
              <span>Back to Home</span>
            </button>

            <div className="current-course-badge">
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>ENROLLED TRACK</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>Web Development (4-Week)</div>
              </div>

              <div className="progress-ring">
                <div className="progress-ring-inner">
                  66%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <button className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', textAlign: 'left' }} onClick={() => setOfferModalOpen(true)}>
            <FileText size={28} color="#38bdf8" />
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>View Offer Letter</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Download PDF & Details</div>
            </div>
          </button>

          <button className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', textAlign: 'left' }} onClick={() => setSubmitModalOpen(true)}>
            <Send size={28} color="#c084fc" />
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>Submit Task Links</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>GitHub & LinkedIn Post</div>
            </div>
          </button>

          <button className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', textAlign: 'left' }} onClick={() => alert('Certificate will be unlocked upon 100% task evaluation.')}>
            <Award size={28} color="#34d399" />
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>Get Verified Certificate</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>2/3 Tasks Approved</div>
            </div>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Main Tasks List */}
          <div className="dashboard-card main-card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>
              Your 4-Week Assigned Tasks
            </h3>

            <div className="task-list">
              <div className="task-item completed">
                <CheckCircle2 size={20} color="#34d399" />
                <div style={{ flex: 1 }}>
                  <div className="task-title">Task 1: Personal Portfolio Website</div>
                  <div className="task-desc">Build a modern responsive developer portfolio using React & CSS.</div>
                </div>
                <div className="task-status status-approved">Approved</div>
              </div>

              <div className="task-item completed">
                <CheckCircle2 size={20} color="#34d399" />
                <div style={{ flex: 1 }}>
                  <div className="task-title">Task 2: E-Commerce Web Application</div>
                  <div className="task-desc">Create product catalog with shopping cart and dynamic filters.</div>
                </div>
                <div className="task-status status-approved">Approved</div>
              </div>

              <div className="task-item">
                <AlertCircle size={20} color="#fbbf24" />
                <div style={{ flex: 1 }}>
                  <div className="task-title">Task 3: Full-Stack Task Management App</div>
                  <div className="task-desc">Implement CRUD operations with user login & local persistence.</div>
                </div>
                <button className="task-status status-pending" onClick={() => setSubmitModalOpen(true)}>Submit Now</button>
              </div>
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="dashboard-card side-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '1rem' }}>
              Internship Timeline
            </h3>

            <div className="timeline-list">
              <div className="timeline-item">
                <Clock size={16} color="#38bdf8" />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.88rem', color: '#fff' }}>Batch Start Date</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>August 01, 2026</div>
                </div>
              </div>

              <div className="timeline-item">
                <Calendar size={16} color="#c084fc" />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.88rem', color: '#fff' }}>Submission Deadline</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>August 28, 2026</div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: '1.5rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff', marginBottom: '0.5rem' }}>Need Help?</div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>Join our active intern Discord channel for mentor guidance.</p>
              <button className="btn-secondary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem' }} onClick={() => window.open('https://discord.gg', '_blank')}>
                Join Discord Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <OfferLetterModal 
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        user={user}
        domainName="Web Development Virtual Internship"
      />

      <TaskSubmissionModal 
        isOpen={submitModalOpen}
        defaultDomain={{ title: 'Web Development (4-Week)' }}
        onClose={() => setSubmitModalOpen(false)}
        onSubmitSuccess={(msg) => alert(msg)}
      />
    </div>
  );
}
