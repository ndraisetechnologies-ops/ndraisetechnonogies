import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Code, FileText, CheckSquare, Award, User, Settings, LogOut, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import './StudentDashboard.css';

export default function StudentDashboard({ user, onLogout, setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-internships', label: 'My Internships', icon: BookOpen },
    { id: 'learning', label: 'Learning', icon: Code },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
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
            <div className="brand-title" style={{ fontSize: '1.1rem' }}>ND <span>TECH</span></div>
          </div>
        </div>

        <ul className="dashboard-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.id)}
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
        {/* Header greeting */}
        <div className="dashboard-header">
          <div className="welcome-text">
            <h1>Welcome back, {user?.name || 'Nikhil'} 👋</h1>
            <p>Here's your learning overview for this week</p>
          </div>

          <div className="current-course-badge">
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Current Internship</div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>React Development</div>
            </div>

            <div className="progress-ring">
              <div className="progress-ring-inner">
                80%
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="metrics-row">
          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#38bdf8' }}>8/10</div>
            <div className="metric-lbl">Assignments Completed</div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#a855f7' }}>2/3</div>
            <div className="metric-lbl">Projects Completed</div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#34d399' }}>42%</div>
            <div className="metric-lbl">Overall Progress</div>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-val" style={{ color: '#f43f5e' }}>Not Earned</div>
            <div className="metric-lbl">Certificate Progress (80%)</div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="dashboard-bottom-grid">
          {/* Recent Activity */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.25rem', color: '#ffffff' }}>Recent Activity</h3>

            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <CheckCircle2 size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#ffffff' }}>Completed Lesson</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>React State Hooks & Context API</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>2h ago</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                <FileText size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#ffffff' }}>Submitted Assignment</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Task Manager App Implementation</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>1d ago</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
                <Code size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#ffffff' }}>Project Updated</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Portfolio Website Deployment</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>3d ago</div>
            </div>
          </div>

          {/* Upcoming Deadline */}
          <div className="deadline-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>Upcoming Deadline</div>
              <span className="badge badge-purple">View All</span>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>
                Assignment 4: React Components
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontSize: '0.88rem', fontWeight: '600', marginBottom: '1rem' }}>
                <AlertCircle size={16} />
                <span>2 Days Left (Due 20 May)</span>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.65rem' }}>
                Submit Assignment Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
