import React, { useState } from 'react';
import { LayoutDashboard, Users, Briefcase, GraduationCap, Award, DollarSign, FileSpreadsheet, Settings, LogOut, BarChart3, PieChart, TrendingUp, Layers } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard({ setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'assignments', label: 'Assignments', icon: FileSpreadsheet },
    { id: 'submissions', label: 'Submissions', icon: BarChart3 },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="nav-brand" onClick={() => setCurrentView('home')}>
          <div className="brand-logo-badge">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M6 26V6L22 26V6" stroke="url(#adm-logo-grad)" strokeWidth="4"/>
              <path d="M12 20L26 6" stroke="#38bdf8" strokeWidth="3.5"/>
              <defs>
                <linearGradient id="adm-logo-grad" x1="6" y1="6" x2="22" y2="26">
                  <stop stopColor="#818cf8"/>
                  <stop offset="1" stopColor="#c084fc"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-title" style={{ fontSize: '1.1rem' }}>ND <span>ADMIN</span></div>
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
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff' }}>Dashboard Overview</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Real-time analytics and platform performance metrics</p>
          </div>

          <button className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
            + Add New Internship
          </button>
        </div>

        {/* 4 Metrics */}
        <div className="admin-metrics">
          <div className="glass-panel admin-card">
            <div className="admin-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>12,540</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Total Students</div>
            </div>
          </div>

          <div className="glass-panel admin-card">
            <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Briefcase size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>18</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Active Internships</div>
            </div>
          </div>

          <div className="glass-panel admin-card">
            <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>8,420</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Completed Internships</div>
            </div>
          </div>

          <div className="glass-panel admin-card">
            <div className="admin-card-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>7,950</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Certificates Issued</div>
            </div>
          </div>
        </div>

        {/* 4 Charts Grid */}
        <div className="charts-grid">
          {/* Chart 1: Student Registrations Area */}
          <div className="glass-panel chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Student Registrations</h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>This Month</span>
            </div>

            <div className="chart-visual-box">
              <svg width="100%" height="180" viewBox="0 0 500 180" fill="none">
                <path d="M0 140 Q 80 120, 150 90 T 300 60 T 450 30 L 500 20 L 500 180 L 0 180 Z" fill="url(#blue-area-grad)" opacity="0.3"/>
                <path d="M0 140 Q 80 120, 150 90 T 300 60 T 450 30 L 500 20" stroke="#38bdf8" strokeWidth="3"/>
                <defs>
                  <linearGradient id="blue-area-grad" x1="0" y1="0" x2="0" y2="180">
                    <stop stopColor="#38bdf8"/>
                    <stop offset="1" stopColor="#38bdf8" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Chart 2: Internship Applications Line */}
          <div className="glass-panel chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Internship Applications</h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>This Month</span>
            </div>

            <div className="chart-visual-box">
              <svg width="100%" height="180" viewBox="0 0 500 180" fill="none">
                <path d="M0 150 Q 100 130, 200 80 T 380 90 T 500 40 L 500 180 L 0 180 Z" fill="url(#green-area-grad)" opacity="0.3"/>
                <path d="M0 150 Q 100 130, 200 80 T 380 90 T 500 40" stroke="#34d399" strokeWidth="3"/>
                <defs>
                  <linearGradient id="green-area-grad" x1="0" y1="0" x2="0" y2="180">
                    <stop stopColor="#34d399"/>
                    <stop offset="1" stopColor="#34d399" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Chart 3: Top Categories Donut */}
          <div className="glass-panel chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Top Categories</h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Distribution</span>
            </div>

            <div className="chart-visual-box" style={{ gap: '2rem' }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" stroke="#1e293b" strokeWidth="20" fill="none" />
                <circle cx="80" cy="80" r="60" stroke="#38bdf8" strokeWidth="20" fill="none" strokeDasharray="140 376" strokeDashoffset="0" />
                <circle cx="80" cy="80" r="60" stroke="#818cf8" strokeWidth="20" fill="none" strokeDasharray="100 376" strokeDashoffset="-140" />
                <circle cx="80" cy="80" r="60" stroke="#c084fc" strokeWidth="20" fill="none" strokeDasharray="70 376" strokeDashoffset="-240" />
                <circle cx="80" cy="80" r="60" stroke="#34d399" strokeWidth="20" fill="none" strokeDasharray="66 376" strokeDashoffset="-310" />
              </svg>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8' }}></span>
                  Web Development (37%)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#818cf8' }}></span>
                  Data Science (27%)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c084fc' }}></span>
                  AI & ML (18%)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }}></span>
                  Cloud Computing (18%)
                </div>
              </div>
            </div>
          </div>

          {/* Chart 4: Completion Rate Gauge */}
          <div className="glass-panel chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Completion Rate</h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>View All</span>
            </div>

            <div className="chart-visual-box" style={{ flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle cx="75" cy="75" r="55" stroke="#1e293b" strokeWidth="14" fill="none" />
                  <circle cx="75" cy="75" r="55" stroke="url(#gauge-grad)" strokeWidth="14" fill="none" strokeDasharray="248 345" strokeLinecap="round" transform="rotate(-90 75 75)" />
                  <defs>
                    <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#38bdf8"/>
                      <stop offset="1" stopColor="#6366f1"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff' }}>72%</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
