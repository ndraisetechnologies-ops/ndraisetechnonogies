import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Code, FileText, CheckSquare, Award, User, Settings, LogOut, Clock, Calendar, CheckCircle2, AlertCircle, Download, ExternalLink, Send } from 'lucide-react';
import OfferLetterModal from '../../components/Modals/OfferLetterModal';
import TaskSubmissionModal from '../../components/Modals/TaskSubmissionModal';
import './StudentDashboard.css';

export default function StudentDashboard({ user, onLogout, setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
        <div className="nav-brand" onClick={() => setCurrentView('home')}>
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
                  setActiveMenu(item.id);
                  if (item.id === 'offer-letter') setOfferModalOpen(true);
                  if (item.id === 'tasks') setSubmitModalOpen(true);
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

        {/* Metric Cards Row */}
        <div className="metrics-row">
          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#38bdf8' }}>2 / 3</div>
            <div className="metric-lbl">Assigned Tasks Completed</div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#34d399' }}>Verified</div>
            <div className="metric-lbl">Offer Letter Status</div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#c084fc' }}>12 Days</div>
            <div className="metric-lbl">Batch Deadline Remaining</div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#f59e0b' }}>A+ (Expected)</div>
            <div className="metric-lbl">Performance Grade</div>
          </div>
        </div>

        {/* Task Tracker Table */}
        <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', color: '#ffffff' }}>
            Assigned Track Tasks (ND Raise Web Development)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '700', color: '#fff' }}>Task 1: Personal Portfolio Website</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Submitted GitHub Code & LinkedIn Video</div>
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#34d399', background: 'rgba(52, 211, 153, 0.12)', padding: '0.3rem 0.75rem', borderRadius: '20px' }}>
                APPROVED
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '700', color: '#fff' }}>Task 2: Interactive Web Application (Calculator / To-Do)</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Submitted GitHub Repo</div>
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#34d399', background: 'rgba(52, 211, 153, 0.12)', padding: '0.3rem 0.75rem', borderRadius: '20px' }}>
                APPROVED
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '700', color: '#fff' }}>Task 3: Dynamic E-Commerce Store / Dashboard</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Pending Submission</div>
              </div>
              <button className="btn-primary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem' }} onClick={() => setSubmitModalOpen(true)}>
                Submit Task 3
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
      />

      <TaskSubmissionModal 
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
      />
    </div>
  );
}
