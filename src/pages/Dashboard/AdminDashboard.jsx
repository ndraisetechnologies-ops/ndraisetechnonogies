import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, GraduationCap, Award, DollarSign, 
  FileSpreadsheet, Settings, LogOut, BarChart3, Layers, Menu, X, Shield, ShieldAlert, History 
} from 'lucide-react';
import { adminApi } from '../../services/api';
import './AdminDashboard.css';

export default function AdminDashboard({ user, setCurrentView, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    totalStudents: 12540,
    activeInternships: 18,
    completedInternships: 8420,
    certificatesIssued: 7950
  });

  const [students, setStudents] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const isSuperAdmin = user?.role === 'super_admin';

  // Base Menu items for Admin & Super Admin
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'assignments', label: 'Assignments', icon: FileSpreadsheet },
    { id: 'certificates', label: 'Certificates', icon: Award },
    ...(isSuperAdmin ? [
      { id: 'users', label: 'User & Roles', icon: Shield },
      { id: 'audit-logs', label: 'Audit Logs', icon: History }
    ] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Fetch Dashboard Metrics on mount
  useEffect(() => {
    adminApi.getDashboard().then((res) => {
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
      }
    }).catch(() => {});
  }, []);

  // Fetch data dynamically based on active tab
  useEffect(() => {
    if (activeMenu === 'students') {
      setLoading(true);
      adminApi.getStudents(searchQuery).then((res) => {
        if (res.success) setStudents(res.students || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }

    if (activeMenu === 'audit-logs' && isSuperAdmin) {
      setLoading(true);
      adminApi.getAuditLogs().then((res) => {
        if (res.success) setAuditLogs(res.logs || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [activeMenu, searchQuery, isSuperAdmin]);

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm(`Are you sure you want to delete Student #${studentId}? This action will be audit logged.`)) return;

    const res = await adminApi.deleteStudent(studentId);
    if (res.success) {
      setMessage(`Student #${studentId} deleted.`);
      setStudents(prev => prev.filter(s => s.id !== studentId));
    } else {
      setMessage(res.error || 'Failed to delete student.');
    }
  };

  return (
    <div className="admin-layout">
      {/* Mobile Top Navigation Header */}
      <div className="admin-mobile-bar">
        <div className="nav-brand">
          <div className="brand-logo-badge" style={{ width: '36px', height: '36px' }}>
            <img src="/admin-avatar.svg" alt="ND Admin Logo" className="brand-logo-img" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          <div className="brand-title" style={{ fontSize: '1rem' }}>ND <span>ADMIN</span></div>
        </div>
        <button 
          className="admin-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Admin Menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay Backdrop for Mobile Drawer */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="nav-brand">
          <div className="brand-logo-badge">
            <img src="/admin-avatar.svg" alt="ND Admin Logo" className="brand-logo-img" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          <div className="brand-text">
            <div className="brand-title" style={{ fontSize: '1.1rem' }}>ND <span>ADMIN</span></div>
            <div style={{ fontSize: '0.72rem', color: isSuperAdmin ? 'var(--accent-purple)' : 'var(--accent-blue)', fontWeight: '700' }}>
              {isSuperAdmin ? 'SUPER ADMIN' : 'ADMINISTRATOR'}
            </div>
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
                  setSidebarOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </li>
            );
          })}
          <li className="menu-item" onClick={onLogout} style={{ marginTop: 'auto', color: '#f87171' }}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="admin-heading">
              {activeMenu === 'dashboard' && 'Dashboard Overview'}
              {activeMenu === 'students' && 'Student Management'}
              {activeMenu === 'audit-logs' && 'Security Audit Logs'}
              {activeMenu === 'users' && 'Role & Access Control'}
              {activeMenu !== 'dashboard' && activeMenu !== 'students' && activeMenu !== 'audit-logs' && activeMenu !== 'users' && `${activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} Management`}
            </h1>
            <p className="admin-subheading">
              Logged in as <strong style={{ color: 'var(--text-main)' }}>{user?.email || 'admin@ndraise.com'}</strong> ({user?.role || 'admin'})
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
              + Add New Internship
            </button>
            <button 
              onClick={() => setCurrentView && setCurrentView('home')} 
              className="admin-btn-secondary"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {message && (
          <div style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.4)', color: 'var(--accent-green)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {message}
          </div>
        )}

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeMenu === 'dashboard' && (
          <>
            {/* 4 Metrics Cards */}
            <div className="admin-metrics">
              <div className="glass-panel admin-card">
                <div className="admin-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                  <Users size={24} />
                </div>
                <div>
                  <div className="admin-card-number">{metrics.totalStudents.toLocaleString()}</div>
                  <div className="admin-card-label">Total Students</div>
                </div>
              </div>

              <div className="glass-panel admin-card">
                <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <Briefcase size={24} />
                </div>
                <div>
                  <div className="admin-card-number">{metrics.activeInternships}</div>
                  <div className="admin-card-label">Active Internships</div>
                </div>
              </div>

              <div className="glass-panel admin-card">
                <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div className="admin-card-number">{metrics.completedInternships.toLocaleString()}</div>
                  <div className="admin-card-label">Completed Internships</div>
                </div>
              </div>

              <div className="glass-panel admin-card">
                <div className="admin-card-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                  <Award size={24} />
                </div>
                <div>
                  <div className="admin-card-number">{metrics.certificatesIssued.toLocaleString()}</div>
                  <div className="admin-card-label">Certificates Issued</div>
                </div>
              </div>
            </div>

            {/* 4 Charts Grid */}
            <div className="charts-grid">
              <div className="glass-panel chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Student Registrations</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>This Month</span>
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

              <div className="glass-panel chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Internship Applications</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>This Month</span>
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

              <div className="glass-panel chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Top Categories</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Distribution</span>
                </div>
                <div className="chart-visual-box" style={{ gap: '2rem' }}>
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="60" stroke="var(--border-light)" strokeWidth="20" fill="none" />
                    <circle cx="80" cy="80" r="60" stroke="#38bdf8" strokeWidth="20" fill="none" strokeDasharray="140 376" strokeDashoffset="0" />
                    <circle cx="80" cy="80" r="60" stroke="#818cf8" strokeWidth="20" fill="none" strokeDasharray="100 376" strokeDashoffset="-140" />
                    <circle cx="80" cy="80" r="60" stroke="#c084fc" strokeWidth="20" fill="none" strokeDasharray="70 376" strokeDashoffset="-240" />
                    <circle cx="80" cy="80" r="60" stroke="#34d399" strokeWidth="20" fill="none" strokeDasharray="66 376" strokeDashoffset="-310" />
                  </svg>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                    <div style={{ color: 'var(--text-main)' }}><span style={{ color: '#38bdf8' }}>●</span> Web Dev (37%)</div>
                    <div style={{ color: 'var(--text-main)' }}><span style={{ color: '#818cf8' }}>●</span> Data Science (27%)</div>
                    <div style={{ color: 'var(--text-main)' }}><span style={{ color: '#c084fc' }}>●</span> AI & ML (18%)</div>
                    <div style={{ color: 'var(--text-main)' }}><span style={{ color: '#34d399' }}>●</span> Cloud (18%)</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Completion Rate</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>View All</span>
                </div>
                <div className="chart-visual-box" style={{ flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                      <circle cx="75" cy="75" r="55" stroke="var(--border-light)" strokeWidth="14" fill="none" />
                      <circle cx="75" cy="75" r="55" stroke="url(#gauge-grad)" strokeWidth="14" fill="none" strokeDasharray="248 345" strokeLinecap="round" transform="rotate(-90 75 75)" />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div className="admin-card-number">72%</div>
                      <div className="admin-card-label">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: STUDENTS MANAGEMENT */}
        {activeMenu === 'students' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="Search students by name or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>
            {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading student records...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>
                      <td style={{ fontWeight: '600' }}>{student.name}</td>
                      <td>{student.email}</td>
                      <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>{student.role}</span></td>
                      <td>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)} 
                          style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr><td colSpan="5" style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center' }}>No students found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB 3: AUDIT LOGS (SUPER ADMIN ONLY) */}
        {activeMenu === 'audit-logs' && isSuperAdmin && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Administrative & Security Activity Log</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{new Date(log.created_at).toLocaleString()}</td>
                    <td style={{ fontWeight: '600' }}>{log.actor_email || `User #${log.actor_id}`}</td>
                    <td style={{ color: 'var(--accent-purple)', fontWeight: '700' }}>{log.action}</td>
                    <td>{log.target_resource || '-'}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{log.ip_address}</td>
                  </tr>
                ))}
                {auditLogs.length === 0 && (
                  <tr><td colSpan="5" style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center' }}>No audit events logged yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* OTHER TABS PLACEHOLDER */}
        {activeMenu !== 'dashboard' && activeMenu !== 'students' && activeMenu !== 'audit-logs' && (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
            <Shield size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>{activeMenu.toUpperCase()} Protected Module</h3>
            <p>Access authorized for role: <strong style={{ color: 'var(--text-main)' }}>{user?.role}</strong>. Backend endpoints protected by JWT & server-side RBAC.</p>
          </div>
        )}
      </main>
    </div>
  );
}
