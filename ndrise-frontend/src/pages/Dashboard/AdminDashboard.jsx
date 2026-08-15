import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, GraduationCap, Award, DollarSign, 
  FileSpreadsheet, Settings, LogOut, BarChart3, Layers, Menu, X, Shield, ShieldAlert, History, ExternalLink, Plus, Trash2
} from 'lucide-react';
import { adminApi } from '../../services/api';
import { submissionAPI, internshipAPI } from '../../services/apiClient';
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
  const [submissions, setSubmissions] = useState([]);
  const [internships, setInternships] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [feedbackInput, setFeedbackInput] = useState({});

  // Add Internship Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newInternship, setNewInternship] = useState({
    title: '',
    domain: '',
    description: '',
    duration: '4 - 8 Weeks',
    stipend: 'Performance Based'
  });

  const isSuperAdmin = user?.role?.toLowerCase() === 'super_admin';

  // Base Menu items for Admin & Super Admin
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Student Submissions', icon: Layers },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'assignments', label: 'Assignments', icon: FileSpreadsheet },
    { id: 'certificates', label: 'Certificates', icon: Award },
    ...(isSuperAdmin ? [
      { id: 'users', label: 'User & Roles', icon: Shield },
      { id: 'audit-logs', label: 'Audit Logs', icon: History }
    ] : []),
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const fetchSubmissions = () => {
    setLoading(true);
    submissionAPI.getAllSubmissions().then((res) => {
      if (res.success && res.submissions) {
        setSubmissions(res.submissions);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const fetchInternships = () => {
    setLoading(true);
    internshipAPI.getInternships().then((res) => {
      if (res.success && res.internships) {
        setInternships(res.internships);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  // Fetch Dashboard Metrics on mount
  useEffect(() => {
    adminApi.getDashboard().then((res) => {
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
      }
    }).catch(() => {});
    fetchInternships();
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

    if (activeMenu === 'internships') {
      fetchInternships();
    }

    if (activeMenu === 'projects' || activeMenu === 'assignments') {
      fetchSubmissions();
    }

    if (activeMenu === 'audit-logs' && isSuperAdmin) {
      setLoading(true);
      adminApi.getAuditLogs().then((res) => {
        if (res.success) setAuditLogs(res.logs || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [activeMenu, searchQuery, isSuperAdmin]);

  const handleUpdateStatus = async (submissionId, newStatus) => {
    try {
      const feedback = feedbackInput[submissionId] || '';
      const res = await submissionAPI.updateSubmissionStatus(submissionId, newStatus, feedback);
      if (res.success) {
        setMessage(`Submission #${submissionId.substring(0, 8)} updated to ${newStatus}`);
        fetchSubmissions();
      } else {
        setMessage(res.error || 'Failed to update status.');
      }
    } catch (err) {
      setMessage(err.message || 'Error updating status.');
    }
  };

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

  const handleCreateInternship = async (e) => {
    e.preventDefault();
    if (!newInternship.title || !newInternship.domain) {
      setMessage('Title and Domain are required.');
      return;
    }
    try {
      const res = await internshipAPI.createInternship(newInternship);
      if (res.success) {
        setMessage(`New Internship Track "${res.internship.title}" created successfully!`);
        setIsAddModalOpen(false);
        setNewInternship({ title: '', domain: '', description: '', duration: '4 - 8 Weeks', stipend: 'Performance Based' });
        fetchInternships();
      } else {
        setMessage(res.error || 'Failed to create internship track.');
      }
    } catch (err) {
      setMessage(err.message || 'Error creating internship.');
    }
  };

  const handleDeleteInternship = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete internship track "${title}"?`)) return;
    try {
      const res = await internshipAPI.deleteInternship(id);
      if (res.success) {
        setMessage(`Internship track "${title}" deleted.`);
        fetchInternships();
      } else {
        setMessage(res.error || 'Failed to delete internship.');
      }
    } catch (err) {
      setMessage(err.message || 'Error deleting internship.');
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
              {activeMenu === 'projects' && 'Project Submissions Review'}
              {activeMenu === 'students' && 'Student Management'}
              {activeMenu === 'internships' && 'Internships Management'}
              {activeMenu === 'courses' && 'Courses Catalog'}
              {activeMenu === 'audit-logs' && 'Security Audit Logs'}
              {activeMenu === 'users' && 'Role & Access Control'}
              {activeMenu !== 'dashboard' && activeMenu !== 'projects' && activeMenu !== 'students' && activeMenu !== 'internships' && activeMenu !== 'courses' && activeMenu !== 'audit-logs' && activeMenu !== 'users' && `${activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} Management`}
            </h1>
            <p className="admin-subheading">
              Logged in as <strong style={{ color: 'var(--text-main)' }}>{user?.email || 'admin@ndraise.com'}</strong> ({user?.role || 'ADMIN'})
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn-primary" 
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} />
              <span>+ Add New Internship</span>
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
                  <div className="admin-card-number">{internships.length || metrics.activeInternships}</div>
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
                <div className="admin-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                  <Award size={24} />
                </div>
                <div>
                  <div className="admin-card-number">{metrics.certificatesIssued.toLocaleString()}</div>
                  <div className="admin-card-label">Certificates Issued</div>
                </div>
              </div>
            </div>

            {/* Quick Live Submissions Table in Dashboard */}
            <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', margin: 0 }}>Recent Student Submissions ({submissions.length})</h3>
                <button 
                  onClick={() => setActiveMenu('projects')}
                  style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                >
                  View All Submissions →
                </button>
              </div>

              {submissions.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No student project submissions yet.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Project Title</th>
                        <th>Domain</th>
                        <th>Status</th>
                        <th>Submitted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.slice(0, 5).map(sub => (
                        <tr key={sub.id}>
                          <td style={{ fontWeight: '600' }}>{sub.user?.name || sub.user?.email || 'Student'}</td>
                          <td>{sub.projectTitle}</td>
                          <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem' }}>{sub.domain}</span></td>
                          <td>
                            <span style={{
                              padding: '0.2rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              background: sub.status === 'APPROVED' ? 'rgba(52, 211, 153, 0.18)' :
                                          sub.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.18)' :
                                          sub.status === 'REVISION_REQUESTED' ? 'rgba(192, 132, 252, 0.18)' : 'rgba(245, 158, 11, 0.18)',
                              color: sub.status === 'APPROVED' ? '#34d399' :
                                     sub.status === 'REJECTED' ? '#f87171' :
                                     sub.status === 'REVISION_REQUESTED' ? '#c084fc' : '#fbbf24'
                            }}>
                              {sub.status}
                            </span>
                          </td>
                          <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB 2: INTERNSHIPS MANAGEMENT */}
        {activeMenu === 'internships' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.15rem', margin: 0 }}>Active Virtual Internship Tracks ({internships.length})</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Manage live internship programs stored in Neon Cloud PostgreSQL.</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={16} />
                <span>Add Track</span>
              </button>
            </div>

            {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading internship tracks...</p> : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Domain</th>
                      <th>Duration</th>
                      <th>Stipend</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.map(item => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.title}</td>
                        <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: '600' }}>{item.domain}</span></td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.duration}</td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: '600' }}>{item.stipend}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '300px' }}>{item.description}</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteInternship(item.id, item.title)}
                            style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {internships.length === 0 && (
                      <tr><td colSpan="6" style={{ padding: '1.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>No internship tracks configured yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STUDENT SUBMISSIONS REVIEW */}
        {(activeMenu === 'projects' || activeMenu === 'assignments') && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Live Student Project Submissions ({submissions.length})</h3>
            {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading student submissions...</p> : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Project Title</th>
                      <th>Domain</th>
                      <th>Submission Link</th>
                      <th>Submitted At</th>
                      <th>Status</th>
                      <th>Review & Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map(sub => (
                      <tr key={sub.id}>
                        <td style={{ fontWeight: '600' }}>
                          {sub.user?.name || 'Student'}
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub.user?.email}</div>
                        </td>
                        <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{sub.projectTitle}</td>
                        <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem' }}>{sub.domain}</span></td>
                        <td>
                          <a 
                            href={sub.fileUrl.startsWith('http') ? sub.fileUrl : `https://${sub.fileUrl}`} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontWeight: '600' }}
                          >
                            <span>Open Link</span>
                            <ExternalLink size={13} />
                          </a>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td>
                          <span style={{
                            padding: '0.25rem 0.65rem',
                            borderRadius: '12px',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            background: sub.status === 'APPROVED' ? 'rgba(52, 211, 153, 0.18)' :
                                        sub.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.18)' :
                                        sub.status === 'REVISION_REQUESTED' ? 'rgba(192, 132, 252, 0.18)' : 'rgba(245, 158, 11, 0.18)',
                            color: sub.status === 'APPROVED' ? '#34d399' :
                                   sub.status === 'REJECTED' ? '#f87171' :
                                   sub.status === 'REVISION_REQUESTED' ? '#c084fc' : '#fbbf24'
                          }}>
                            {sub.status}
                          </span>
                        </td>
                        <td style={{ minWidth: '280px' }}>
                          <input 
                            type="text"
                            placeholder="Add optional admin note..."
                            value={feedbackInput[sub.id] || sub.adminFeedback || ''}
                            onChange={(e) => setFeedbackInput({ ...feedbackInput, [sub.id]: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '0.4rem 0.6rem',
                              borderRadius: '6px',
                              border: '1px solid var(--border-light)',
                              background: 'rgba(255,255,255,0.05)',
                              color: 'var(--text-main)',
                              fontSize: '0.78rem',
                              marginBottom: '0.5rem'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              style={{
                                background: 'rgba(52, 211, 153, 0.2)',
                                color: '#34d399',
                                border: '1px solid #34d399',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleUpdateStatus(sub.id, 'APPROVED')}
                            >
                              Approve ✔
                            </button>
                            <button
                              type="button"
                              style={{
                                background: 'rgba(192, 132, 252, 0.2)',
                                color: '#c084fc',
                                border: '1px solid #c084fc',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleUpdateStatus(sub.id, 'REVISION_REQUESTED')}
                            >
                              Request Revision ⚠️
                            </button>
                            <button
                              type="button"
                              style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                color: '#f87171',
                                border: '1px solid #f87171',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleUpdateStatus(sub.id, 'REJECTED')}
                            >
                              Reject ❌
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {submissions.length === 0 && (
                      <tr><td colSpan="7" style={{ padding: '1.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>No student submissions recorded yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STUDENTS MANAGEMENT */}
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
                      <td>#{student.id.substring(0, 8)}</td>
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

        {/* TAB 5: AUDIT LOGS (SUPER ADMIN ONLY) */}
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
      </main>

      {/* Add Internship Modal */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{
            background: 'var(--bg-surface, #0f172a)',
            border: '1.5px solid var(--primary, #2563eb)',
            borderRadius: '12px',
            padding: '2rem',
            width: '100%',
            maxWidth: '540px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', margin: 0 }}>Add New Virtual Internship Track</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateInternship}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>Track Title *</label>
                <input 
                  type="text"
                  placeholder="e.g. Artificial Intelligence & ML Track"
                  value={newInternship.title}
                  onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>Domain Category *</label>
                <input 
                  type="text"
                  placeholder="e.g. Web Development / Data & AI"
                  value={newInternship.domain}
                  onChange={(e) => setNewInternship({ ...newInternship, domain: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>Duration</label>
                  <input 
                    type="text"
                    placeholder="e.g. 4 - 8 Weeks"
                    value={newInternship.duration}
                    onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>Stipend</label>
                  <input 
                    type="text"
                    placeholder="e.g. Performance Based"
                    value={newInternship.stipend}
                    onChange={(e) => setNewInternship({ ...newInternship, stipend: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>Description & Guidelines</label>
                <textarea 
                  rows={3}
                  placeholder="Overview of tasks and key technologies..."
                  value={newInternship.description}
                  onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  className="admin-btn-secondary"
                  style={{ padding: '0.6rem 1.2rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.2rem' }}
                >
                  Create Internship Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
