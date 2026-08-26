import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, GraduationCap, Award, DollarSign, 
  FileSpreadsheet, Settings, LogOut, BarChart3, Layers, Menu, X, Shield, ShieldAlert, 
  History, ExternalLink, Plus, Trash2, UserPlus, UserCheck, Calendar, RotateCcw,
  Search, Bell, HelpCircle, CheckCircle, AlertTriangle, XCircle, Mail, MessageSquare,
  Clock, Filter, Sparkles, Check, ArrowRight, Eye, RefreshCw, FileText, Send, Lock, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { adminApi } from '../../services/api';
import { submissionAPI, internshipAPI, certificateAPI } from '../../services/apiClient';
import { 
  initialPaymentsData, initialOfferLettersData, initialProjectsCatalog, 
  initialSupportTicketsData, initialEmailLogsData, initialReviewsData, 
  initialAdminUsersData, initialNotificationsData, systemHealthMetrics, analyticsChartData 
} from '../../data/adminDashboardData';
import './AdminDashboard.css';

const getTodayStr = () => new Date().toISOString().split('T')[0];
const getDaysAgoStr = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

export default function AdminDashboard({ user, setCurrentView, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Active Role Simulation: SUPER_ADMIN, ADMIN, REVIEWER, SUPPORT
  const [activeRole, setActiveRole] = useState(
    user?.role?.toUpperCase() || 'SUPER_ADMIN'
  );

  const [metrics, setMetrics] = useState({
    totalStudents: 12540,
    activeInternships: 18,
    completedInternships: 8420,
    certificatesIssued: 7950
  });

  // State Collections
  const [students, setStudents] = useState([]);
  const [studentFilter, setStudentFilter] = useState('all'); // 'all', 'internship', 'just_registered'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [datePreset, setDatePreset] = useState('all');
  
  const [submissions, setSubmissions] = useState([]);
  const [internships, setInternships] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [feedbackInput, setFeedbackInput] = useState({});

  // Email Logs Filtering & Date Range State
  const [emailSearchQuery, setEmailSearchQuery] = useState('');
  const [emailStartDate, setEmailStartDate] = useState('');
  const [emailEndDate, setEmailEndDate] = useState('');
  const [emailDatePreset, setEmailDatePreset] = useState('all');
  const [emailStatusFilter, setEmailStatusFilter] = useState('all');

  // Broadcast Notifications & History State
  const [notificationsData, setNotificationsData] = useState(initialNotificationsData);
  const [newNotifTitle, setNewNotifTitle] = useState('');
  const [newNotifCategory, setNewNotifCategory] = useState('ANNOUNCEMENT');
  const [newNotifAudience, setNewNotifAudience] = useState('All Registered Students');
  const [newNotifMessage, setNewNotifMessage] = useState('');
  
  // Notification History Filters
  const [notifSearchQuery, setNotifSearchQuery] = useState('');
  const [notifStartDate, setNotifStartDate] = useState('');
  const [notifEndDate, setNotifEndDate] = useState('');
  const [notifDatePreset, setNotifDatePreset] = useState('all');
  const [notifCategoryFilter, setNotifCategoryFilter] = useState('all');

  // Additional Data Collections
  const [payments, setPayments] = useState(initialPaymentsData);
  const [liveCertificates, setLiveCertificates] = useState([]);
  const [offerLetters, setOfferLetters] = useState(initialOfferLettersData);
  const [projectsCatalog, setProjectsCatalog] = useState(initialProjectsCatalog);
  const [supportTickets, setSupportTickets] = useState(initialSupportTicketsData);
  const [emailLogs, setEmailLogs] = useState(initialEmailLogsData);
  const [reviews, setReviews] = useState(initialReviewsData);
  const [adminUsers, setAdminUsers] = useState(initialAdminUsersData);

  // Modals & Drawers State
  const [isAddInternshipModalOpen, setIsAddInternshipModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [isOfferLetterModalOpen, setIsOfferLetterModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  
  // Selected Item Drawers
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState(null);
  const [selectedTicketForSupport, setSelectedTicketForSupport] = useState(null);

  // New Item Form Models
  const [newInternship, setNewInternship] = useState({ title: '', domain: '', description: '', duration: '4 - 8 Weeks', stipend: 'Performance Based' });
  const [newProject, setNewProject] = useState({ trackTitle: 'Full Stack Web Development', taskNumber: 1, title: '', level: 'Intermediate', description: '' });
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'REVIEWER', password: '' });
  const [newOfferLetter, setNewOfferLetter] = useState({ studentName: '', studentEmail: '', trackTitle: 'Full Stack Web Development' });

  // Ticket Response Composer
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Reviewer Evaluation State
  const [reviewScore, setReviewScore] = useState(85);
  const [reviewerNote, setReviewerNote] = useState('');

  const shouldReduceMotion = useReducedMotion();

  // Navigation Items with Permission Flags
  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'REVIEWER', 'SUPPORT'] },
    { id: 'students', label: 'Students', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] },
    { id: 'internships', label: 'Internships', icon: Briefcase, roles: ['SUPER_ADMIN', 'ADMIN', 'REVIEWER'] },
    { id: 'projects', label: 'Projects', icon: FileSpreadsheet, roles: ['SUPER_ADMIN', 'ADMIN', 'REVIEWER'] },
    { id: 'submissions', label: 'Submissions', icon: Layers, roles: ['SUPER_ADMIN', 'ADMIN', 'REVIEWER'] },
    { id: 'offer-letters', label: 'Offer Letters', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] },
    { id: 'certificates', label: 'Certificates', icon: Award, roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] },
    { id: 'payments', label: 'Payments (₹99)', icon: CreditCard, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { id: 'tests', label: 'Tests & Quizzes', icon: GraduationCap, roles: ['SUPER_ADMIN', 'ADMIN'] },
    { id: 'emails', label: 'Email Logs', icon: Mail, roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] },
    { id: 'reviews', label: 'Student Reviews', icon: Sparkles, roles: ['SUPER_ADMIN', 'ADMIN', 'REVIEWER', 'SUPPORT'] },
    { id: 'support', label: 'Support Tickets', icon: MessageSquare, roles: ['SUPER_ADMIN', 'ADMIN', 'SUPPORT'] },
    { id: 'users', label: 'Admin Roles', icon: Shield, roles: ['SUPER_ADMIN'] },
    { id: 'audit-logs', label: 'Audit Logs', icon: History, roles: ['SUPER_ADMIN'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN'] },
  ];

  // Filtered menu based on active role
  const visibleMenuItems = allMenuItems.filter(item => item.roles.includes(activeRole));

  // Fetch Data Handlers
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

  const fetchCertificates = () => {
    certificateAPI.getAllCertificates().then((res) => {
      if (res.success && res.certificates) {
        setLiveCertificates(res.certificates);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    adminApi.getDashboard().then((res) => {
      if (res.success && res.metrics) {
        setMetrics(res.metrics);
      }
    }).catch(() => {});
    fetchInternships();
    fetchSubmissions();
    fetchCertificates();

    // Auto-refresh data every 5 seconds so new claims & payments pop up live
    const pollInterval = setInterval(() => {
      fetchSubmissions();
      fetchCertificates();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    if (activeMenu === 'students') {
      setLoading(true);
      adminApi.getStudents(searchQuery, startDate, endDate).then((res) => {
        if (res.success) setStudents(res.students || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }

    if (activeMenu === 'internships') fetchInternships();
    if (activeMenu === 'submissions' || activeMenu === 'projects') fetchSubmissions();
    if (activeMenu === 'certificates' || activeMenu === 'payments') fetchCertificates();
    if (activeMenu === 'audit-logs' && activeRole === 'SUPER_ADMIN') {
      setLoading(true);
      adminApi.getAuditLogs().then((res) => {
        if (res.success) setAuditLogs(res.logs || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [activeMenu, searchQuery, startDate, endDate, activeRole]);

  // Handlers for Operational Actions
  const handleUpdateStatus = async (submissionId, newStatus) => {
    try {
      const feedback = feedbackInput[submissionId] || reviewerNote || '';
      const res = await submissionAPI.updateSubmissionStatus(submissionId, newStatus, feedback);
      if (res.success) {
        setMessage(`Submission #${submissionId.substring(0, 8)} updated to ${newStatus}`);
        fetchSubmissions();
        setSelectedSubmissionForReview(null);
      } else {
        setMessage(res.error || 'Failed to update status.');
      }
    } catch (err) {
      setMessage(err.message || 'Error updating status.');
    }
  };

  const handleSendOfferLetter = async (offerItem) => {
    try {
      setLoading(true);
      const res = await internshipAPI.sendOfferLetter({
        studentName: offerItem.studentName,
        studentEmail: offerItem.studentEmail,
        trackTitle: offerItem.trackTitle,
        duration: offerItem.duration || '4 - 8 Weeks',
        stipend: offerItem.stipend || 'Performance Based'
      });

      if (res.success) {
        setMessage(`🎉 Offer Letter (${res.offerCode}) issued & email sent to ${offerItem.studentEmail}!`);
        setOfferLetters((prev) =>
          prev.map((o) =>
            o.id === offerItem.id ? { ...o, status: 'ISSUED & SENT ✉️', offerCode: res.offerCode } : o
          )
        );
      } else {
        setMessage(res.error || 'Failed to send offer letter email.');
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setMessage(`🎉 Offer Letter issued & email dispatched to ${offerItem.studentEmail}!`);
      setOfferLetters((prev) =>
        prev.map((o) =>
          o.id === offerItem.id ? { ...o, status: 'ISSUED & SENT ✉️' } : o
        )
      );
    }
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!newNotifTitle || !newNotifMessage) return;

    const reachMap = {
      'All Registered Students': 12540,
      'Active Internship Learners': 4120,
      'Certificate Completed Students': 7950
    };

    const newBroadcast = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      title: newNotifTitle,
      type: newNotifCategory,
      targetAudience: newNotifAudience,
      message: newNotifMessage,
      sentAt: new Date().toISOString(),
      sentBy: user?.name || `${activeRole} Portal`,
      reachCount: reachMap[newNotifAudience] || 1000
    };

    setNotificationsData(prev => [newBroadcast, ...prev]);
    setMessage(`📢 Broadcast Notification sent successfully to ${newNotifAudience}!`);
    setNewNotifTitle('');
    setNewNotifMessage('');
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
    if (!newInternship.title || !newInternship.domain) return;
    try {
      const res = await internshipAPI.createInternship(newInternship);
      if (res.success) {
        setMessage(`New Track "${res.internship.title}" created live!`);
        setIsAddInternshipModalOpen(false);
        setNewInternship({ title: '', domain: '', description: '', duration: '4 - 8 Weeks', stipend: 'Performance Based' });
        fetchInternships();
      }
    } catch (err) {
      setMessage(err.message || 'Error creating track.');
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const created = {
      id: `PRJ-${Date.now()}`,
      ...newProject,
      submissionType: 'GitHub Repository + Live Demo'
    };
    setProjectsCatalog(prev => [created, ...prev]);
    setMessage(`Project guideline "${newProject.title}" added to ${newProject.trackTitle}!`);
    setIsAddProjectModalOpen(false);
    setNewProject({ trackTitle: 'Full Stack Web Development', taskNumber: 1, title: '', level: 'Intermediate', description: '' });
  };

  const handleCreateAdminUser = (e) => {
    e.preventDefault();
    const created = {
      id: `USR-${Date.now()}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: 'ACTIVE',
      lastLogin: 'Just Now',
      permissions: newAdmin.role === 'SUPER_ADMIN' ? 'Full Control' : 'Assigned Role Access'
    };
    setAdminUsers(prev => [created, ...prev]);
    setMessage(`Staff user ${newAdmin.name} created with role ${newAdmin.role}!`);
    setIsCreateAdminModalOpen(false);
    setNewAdmin({ name: '', email: '', role: 'REVIEWER', password: '' });
  };

  const handleSendTicketReply = (e) => {
    e.preventDefault();
    if (!ticketReplyText.trim() || !selectedTicketForSupport) return;
    
    const updatedTickets = supportTickets.map(t => {
      if (t.id === selectedTicketForSupport.id) {
        return {
          ...t,
          status: 'RESOLVED',
          messages: [
            ...t.messages,
            { sender: 'admin', text: ticketReplyText, timestamp: 'Just Now' }
          ]
        };
      }
      return t;
    });

    setSupportTickets(updatedTickets);
    setMessage(`Reply sent for Ticket ${selectedTicketForSupport.ticketNumber} and status marked RESOLVED!`);
    setTicketReplyText('');
    setSelectedTicketForSupport(null);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Header Bar */}
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

      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="nav-brand">
          <div className="brand-logo-badge">
            <img src="/admin-avatar.svg" alt="ND Admin Logo" className="brand-logo-img" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          <div className="brand-text">
            <div className="brand-title" style={{ fontSize: '1.1rem' }}>ND <span>ADMIN</span></div>
            <div style={{ 
              fontSize: '0.72rem', 
              color: activeRole === 'SUPER_ADMIN' ? '#c084fc' : activeRole === 'REVIEWER' ? '#38bdf8' : activeRole === 'SUPPORT' ? '#34d399' : '#818cf8', 
              fontWeight: '800',
              letterSpacing: '0.5px'
            }}>
              {activeRole} PORTAL
            </div>
          </div>
        </div>

        <ul className="dashboard-menu">
          {visibleMenuItems.map(item => {
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

      {/* Main Workspace Area */}
      <main className="admin-main">
        {/* Top Header Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <span>Admin Portal</span>
              <span>/</span>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>{activeMenu.toUpperCase()}</span>
            </div>
            <h1 className="admin-heading">
              {activeMenu === 'dashboard' && `${activeRole.replace('_', ' ')} Overview`}
              {activeMenu === 'students' && 'Student Management & Registrations'}
              {activeMenu === 'internships' && 'Virtual Internship Tracks Catalog'}
              {activeMenu === 'projects' && 'Assigned Project Guidelines'}
              {activeMenu === 'submissions' && 'Student Submissions Evaluation Queue'}
              {activeMenu === 'offer-letters' && 'Official Offer Letters Registry'}
              {activeMenu === 'certificates' && 'Verified Certificates & Issuance'}
              {activeMenu === 'payments' && '₹99 Certificate Payments Ledger'}
              {activeMenu === 'tests' && 'Knowledge Assessment Quizzes'}
              {activeMenu === 'emails' && 'Outbound Automated Email Logs'}
              {activeMenu === 'notifications' && 'System Broadcast Notifications'}
              {activeMenu === 'reviews' && 'Student Testimonials & Rating Reviews'}
              {activeMenu === 'support' && 'Student Helpdesk & Ticket Workspace'}
              {activeMenu === 'users' && 'Admin & Staff Access Controls'}
              {activeMenu === 'audit-logs' && 'Administrative Security Audit Logs'}
              {activeMenu === 'settings' && 'SaaS Platform Settings & Config'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Global Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Global search students, tickets, payments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
                style={{ paddingLeft: '2.4rem', width: '260px' }}
              />
            </div>

            {/* Simulated Role Selector */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.2rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0 0.5rem', fontWeight: '700' }}>Role:</span>
              <select
                value={activeRole}
                onChange={(e) => {
                  setActiveRole(e.target.value);
                  setMessage(`Switched view mode to ${e.target.value}`);
                }}
                style={{
                  background: 'var(--bg-dark)',
                  color: 'var(--accent-cyan)',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="ADMIN">ADMIN</option>
                <option value="REVIEWER">REVIEWER</option>
                <option value="SUPPORT">SUPPORT</option>
              </select>
            </div>

            {/* Notifications Bell Button */}
            <button 
              onClick={() => setIsNotificationsDrawerOpen(!isNotificationsDrawerOpen)}
              style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'var(--text-main)', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer' }}
              title="System Alerts"
            >
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#34d399', borderRadius: '50%' }} />
            </button>

            {/* Help Docs Modal Toggle */}
            <button 
              onClick={() => setIsHelpModalOpen(true)}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', color: 'var(--text-main)', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer' }}
              title="Help & Shortcuts"
            >
              <HelpCircle size={18} />
            </button>

            <button 
              onClick={() => setCurrentView && setCurrentView('home')} 
              className="admin-btn-secondary"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {/* Global Feedback Banner Message */}
        {message && (
          <div style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.4)', color: '#34d399', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{message}</span>
            <button onClick={() => setMessage('')} style={{ background: 'none', border: 'none', color: '#34d399', cursor: 'pointer' }}><X size={16} /></button>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 1: ROLE-BASED DASHBOARD OVERVIEWS */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* ROLE 1: SUPER_ADMIN OVERVIEW */}
            {activeRole === 'SUPER_ADMIN' && (
              <>
                {/* 8 KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}><Users size={24} /></div>
                    <div>
                      <div className="admin-card-number">{metrics.totalStudents.toLocaleString()}</div>
                      <div className="admin-card-label">Total Registered Students</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><Briefcase size={24} /></div>
                    <div>
                      <div className="admin-card-number">{metrics.activeInternships}</div>
                      <div className="admin-card-label">Active Track Offerings</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}><CheckCircle size={24} /></div>
                    <div>
                      <div className="admin-card-number">{metrics.completedInternships.toLocaleString()}</div>
                      <div className="admin-card-label">Completed Internships</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}><Layers size={24} /></div>
                    <div>
                      <div className="admin-card-number">{submissions.filter(s => s.status === 'PENDING').length || 42}</div>
                      <div className="admin-card-label">Pending Review Submissions</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}><Award size={24} /></div>
                    <div>
                      <div className="admin-card-number">{metrics.certificatesIssued.toLocaleString()}</div>
                      <div className="admin-card-label">Certificates Issued</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.18)', color: '#34d399' }}><CreditCard size={24} /></div>
                    <div>
                      <div className="admin-card-number" style={{ color: '#34d399' }}>₹7,87,050</div>
                      <div className="admin-card-label">Certificate Fee Revenue (₹99)</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><BarChart3 size={24} /></div>
                    <div>
                      <div className="admin-card-number">98.4%</div>
                      <div className="admin-card-label">Payment Success Rate</div>
                    </div>
                  </div>

                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}><Shield size={24} /></div>
                    <div>
                      <div className="admin-card-number">{adminUsers.length}</div>
                      <div className="admin-card-label">Active Staff & Admins</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Super Admin Quick Actions</div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn-primary" onClick={() => setIsAddInternshipModalOpen(true)} style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}>
                      <Plus size={15} /> + Add Internship Track
                    </button>
                    <button className="admin-btn-secondary" onClick={() => setIsAddProjectModalOpen(true)}>
                      + Add Project Guidelines
                    </button>
                    <button className="admin-btn-secondary" onClick={() => setIsCreateAdminModalOpen(true)}>
                      + Add Staff / Admin User
                    </button>
                    <button className="admin-btn-secondary" onClick={() => setActiveMenu('submissions')}>
                      Review Submissions Queue
                    </button>
                    <button className="admin-btn-secondary" onClick={() => setActiveMenu('payments')}>
                      View ₹99 Payments
                    </button>
                  </div>
                </div>

                {/* Charts Grid */}
                <div className="charts-grid">
                  <div className="chart-card">
                    <div className="chart-header">
                      <div className="chart-title">Student Registrations & Completions Trend</div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>Monthly Analytics</span>
                    </div>
                    <div className="chart-visual-box" style={{ flexDirection: 'column', gap: '0.5rem', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', width: '100%', height: '160px', padding: '0 1rem' }}>
                        {analyticsChartData.monthlyRegistrations.map((d, i) => (
                          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '0.3rem' }}>
                            <div style={{ width: '100%', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '100%' }}>
                              <div style={{ flex: 1, height: `${(d.students / 4200) * 100}%`, background: '#818cf8', borderRadius: '3px 3px 0 0' }} title={`Registrations: ${d.students}`} />
                              <div style={{ flex: 1, height: `${(d.completions / 4200) * 100}%`, background: '#34d399', borderRadius: '3px 3px 0 0' }} title={`Completions: ${d.completions}`} />
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.month}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '10px', height: '10px', background: '#818cf8', borderRadius: '2px' }} /> Registrations</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ width: '10px', height: '10px', background: '#34d399', borderRadius: '2px' }} /> Completions</span>
                      </div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <div className="chart-header">
                      <div className="chart-title">Internship Track Domain Distribution</div>
                      <span style={{ fontSize: '0.78rem', color: '#c084fc' }}>Active Learners</span>
                    </div>
                    <div className="chart-visual-box" style={{ flexDirection: 'column', gap: '0.75rem', justifyContent: 'center', padding: '0 1rem' }}>
                      {analyticsChartData.trackDistribution.map((t, idx) => (
                        <div key={idx} style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                            <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{t.name}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{t.count.toLocaleString()} ({t.percentage}%)</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${t.percentage * 2.5}%`, height: '100%', background: idx === 0 ? '#38bdf8' : idx === 1 ? '#818cf8' : idx === 2 ? '#c084fc' : idx === 3 ? '#34d399' : '#fbbf24', borderRadius: '4px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* System Health & Recent Payments Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {/* System Health Panel */}
                  <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldAlert size={18} style={{ color: '#34d399' }} /> System Infrastructure & API Health
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Database Connection</span>
                        <span style={{ color: '#34d399', fontWeight: '700' }}>{systemHealthMetrics.dbStatus} ({systemHealthMetrics.dbLatency})</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>API Server Uptime</span>
                        <span style={{ color: '#38bdf8', fontWeight: '700' }}>{systemHealthMetrics.apiUptime}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Payment Gateway (Razorpay & UPI)</span>
                        <span style={{ color: '#34d399', fontWeight: '700' }}>{systemHealthMetrics.paymentGatewayStatus}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Email Service Delivery</span>
                        <span style={{ color: '#c084fc', fontWeight: '700' }}>{systemHealthMetrics.emailDeliveryRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Payments Ledger */}
                  <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>Recent ₹99 Certificate Payments</h3>
                      <button onClick={() => setActiveMenu('payments')} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.8rem', cursor: 'pointer' }}>View All →</button>
                    </div>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Method</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.slice(0, 3).map(p => (
                          <tr key={p.id}>
                            <td style={{ fontWeight: '600' }}>{p.studentName}</td>
                            <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.paymentMethod}</td>
                            <td style={{ fontWeight: '700', color: '#34d399' }}>{p.amount}</td>
                            <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', background: p.status === 'SUCCESS' ? 'rgba(52, 211, 153, 0.18)' : 'rgba(245, 158, 11, 0.18)', color: p.status === 'SUCCESS' ? '#34d399' : '#fbbf24' }}>{p.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ROLE 2: ADMIN OPERATIONAL OVERVIEW */}
            {activeRole === 'ADMIN' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}><Users size={24} /></div>
                    <div><div className="admin-card-number">{metrics.totalStudents.toLocaleString()}</div><div className="admin-card-label">Total Students</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><UserCheck size={24} /></div>
                    <div><div className="admin-card-number">4,120</div><div className="admin-card-label">Active Learners</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}><Layers size={24} /></div>
                    <div><div className="admin-card-number">{submissions.filter(s => s.status === 'PENDING').length || 42}</div><div className="admin-card-label">Pending Reviews</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}><CheckCircle size={24} /></div>
                    <div><div className="admin-card-number">{metrics.completedInternships.toLocaleString()}</div><div className="admin-card-label">Completed Tracks</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}><Award size={24} /></div>
                    <div><div className="admin-card-number">340</div><div className="admin-card-label">Certificate Eligible</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.18)', color: '#34d399' }}><Award size={24} /></div>
                    <div><div className="admin-card-number">{metrics.certificatesIssued.toLocaleString()}</div><div className="admin-card-label">Certificates Issued</div></div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Operational Management Actions</h3>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn-primary" onClick={() => setIsAddInternshipModalOpen(true)}>+ Add Internship Track</button>
                    <button className="admin-btn-secondary" onClick={() => setIsAddProjectModalOpen(true)}>+ Assign Project Guidelines</button>
                    <button className="admin-btn-secondary" onClick={() => setIsOfferLetterModalOpen(true)}>Send Offer Letter</button>
                    <button className="admin-btn-secondary" onClick={() => setActiveMenu('submissions')}>Review Project Submissions</button>
                  </div>
                </div>
              </>
            )}

            {/* ROLE 3: REVIEWER EVALUATION OVERVIEW */}
            {activeRole === 'REVIEWER' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><Layers size={24} /></div>
                    <div><div className="admin-card-number">18</div><div className="admin-card-label">Assigned Submissions</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}><Clock size={24} /></div>
                    <div><div className="admin-card-number">7</div><div className="admin-card-label">Pending Review</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}><CheckCircle size={24} /></div>
                    <div><div className="admin-card-number">142</div><div className="admin-card-label">Approved</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}><AlertTriangle size={24} /></div>
                    <div><div className="admin-card-number">12</div><div className="admin-card-label">Changes Requested</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}><Clock size={24} /></div>
                    <div><div className="admin-card-number">1.4 Hours</div><div className="admin-card-label">Avg Review Time</div></div>
                  </div>
                </div>

                {/* Reviewer Priority Evaluation Queue */}
                <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Project Review Priority Queue</h3>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Project Title</th>
                        <th>Submitted Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map(sub => (
                        <tr key={sub.id}>
                          <td style={{ fontWeight: '700' }}>
                            {sub.user?.name || 'Student'}
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub.user?.email}</div>
                          </td>
                          <td style={{ fontWeight: '600', color: 'var(--accent-cyan)' }}>{sub.projectTitle}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                          <td><span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', background: 'rgba(239, 68, 68, 0.18)', color: '#f87171' }}>HIGH</span></td>
                          <td><span style={{ padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', background: 'rgba(245, 158, 11, 0.18)', color: '#fbbf24' }}>{sub.status}</span></td>
                          <td>
                            <button 
                              onClick={() => setSelectedSubmissionForReview(sub)}
                              className="btn-primary" 
                              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                            >
                              Review Code & Demo
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ROLE 4: SUPPORT DESK OVERVIEW */}
            {activeRole === 'SUPPORT' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}><MessageSquare size={24} /></div>
                    <div><div className="admin-card-number">14</div><div className="admin-card-label">Open Tickets</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}><Clock size={24} /></div>
                    <div><div className="admin-card-number">8</div><div className="admin-card-label">In Progress</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}><CheckCircle size={24} /></div>
                    <div><div className="admin-card-number">29</div><div className="admin-card-label">Resolved Today</div></div>
                  </div>
                  <div className="glass-panel admin-card">
                    <div className="admin-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><Clock size={24} /></div>
                    <div><div className="admin-card-number">12 Mins</div><div className="admin-card-label">Avg Response Time</div></div>
                  </div>
                </div>

                {/* Support Tickets Queue */}
                <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Recent Student Support Tickets</h3>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportTickets.map(t => (
                        <tr key={t.id}>
                          <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>{t.ticketNumber}</td>
                          <td style={{ fontWeight: '600' }}>{t.studentName}</td>
                          <td style={{ color: 'var(--text-main)' }}>{t.subject}</td>
                          <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{t.category}</span></td>
                          <td><span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>{t.priority}</span></td>
                          <td><span style={{ background: t.status === 'RESOLVED' ? 'rgba(52, 211, 153, 0.18)' : 'rgba(245, 158, 11, 0.18)', color: t.status === 'RESOLVED' ? '#34d399' : '#fbbf24', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>{t.status}</span></td>
                          <td>
                            <button onClick={() => setSelectedTicketForSupport(t)} className="admin-btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}>
                              Reply & Resolve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 2: STUDENTS MANAGEMENT */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'students' && (() => {
          const displayedStudents = students.filter(student => {
            const isInternship = student.registrationType === 'INTERNSHIP_REGISTERED' || (student.applications && student.applications.length > 0);
            if (studentFilter === 'internship' && !isInternship) return false;
            if (studentFilter === 'just_registered' && isInternship) return false;

            if (startDate || endDate) {
              const studentTime = new Date(student.createdAt).getTime();
              if (startDate && studentTime < new Date(startDate).setHours(0,0,0,0)) return false;
              if (endDate && studentTime > new Date(endDate).setHours(23,59,59,999)) return false;
            }

            if (searchQuery) {
              const q = searchQuery.toLowerCase();
              return student.name?.toLowerCase().includes(q) || student.email?.toLowerCase().includes(q);
            }
            return true;
          });

          const totalCount = students.length;
          const internshipCount = students.filter(s => s.registrationType === 'INTERNSHIP_REGISTERED' || (s.applications && s.applications.length > 0)).length;
          const justRegisteredCount = totalCount - internshipCount;

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>{totalCount}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Registered Students</div></div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GraduationCap size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399' }}>{internshipCount}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Internship Registered</div></div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserPlus size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#c084fc' }}>{justRegisteredCount}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Just Registered (No Track)</div></div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                {/* Date Filter Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}><Calendar size={16} style={{ color: 'var(--accent-cyan)' }} /><span>Date Filter:</span></div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <button onClick={() => { setStartDate(''); setEndDate(''); setDatePreset('all'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: datePreset === 'all' ? 'var(--accent-cyan)' : 'var(--border-light)', background: datePreset === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: datePreset === 'all' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>All Time</button>
                      <button onClick={() => { const t = getTodayStr(); setStartDate(t); setEndDate(t); setDatePreset('today'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: datePreset === 'today' ? 'var(--accent-cyan)' : 'var(--border-light)', background: datePreset === 'today' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: datePreset === 'today' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Today</button>
                      <button onClick={() => { setStartDate(getDaysAgoStr(7)); setEndDate(getTodayStr()); setDatePreset('7days'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: datePreset === '7days' ? 'var(--accent-cyan)' : 'var(--border-light)', background: datePreset === '7days' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: datePreset === '7days' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Last 7 Days</button>
                      <button onClick={() => { setStartDate(getDaysAgoStr(30)); setEndDate(getTodayStr()); setDatePreset('30days'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: datePreset === '30days' ? 'var(--accent-cyan)' : 'var(--border-light)', background: datePreset === '30days' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: datePreset === '30days' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Last 30 Days</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>From:</label><input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setDatePreset('custom'); }} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', fontSize: '0.78rem' }} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>To:</label><input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setDatePreset('custom'); }} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', fontSize: '0.78rem' }} /></div>
                    {(startDate || endDate) && <button onClick={() => { setStartDate(''); setEndDate(''); setDatePreset('all'); }} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><RotateCcw size={12} /><span>Reset</span></button>}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setStudentFilter('all')} style={{ padding: '0.45rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', border: '1px solid', borderColor: studentFilter === 'all' ? '#2563eb' : 'var(--border-light)', background: studentFilter === 'all' ? 'rgba(37, 99, 235, 0.2)' : 'transparent', color: studentFilter === 'all' ? '#60a5fa' : 'var(--text-muted)', cursor: 'pointer' }}>All Students ({totalCount})</button>
                    <button onClick={() => setStudentFilter('internship')} style={{ padding: '0.45rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', border: '1px solid', borderColor: studentFilter === 'internship' ? '#34d399' : 'var(--border-light)', background: studentFilter === 'internship' ? 'rgba(52, 211, 153, 0.2)' : 'transparent', color: studentFilter === 'internship' ? '#34d399' : 'var(--text-muted)', cursor: 'pointer' }}>🎓 Internship Registered ({internshipCount})</button>
                    <button onClick={() => setStudentFilter('just_registered')} style={{ padding: '0.45rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '600', border: '1px solid', borderColor: studentFilter === 'just_registered' ? '#c084fc' : 'var(--border-light)', background: studentFilter === 'just_registered' ? 'rgba(192, 132, 252, 0.2)' : 'transparent', color: studentFilter === 'just_registered' ? '#c084fc' : 'var(--text-muted)', cursor: 'pointer' }}>👤 Just Registered ({justRegisteredCount})</button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th><th>Student Name & Email</th><th>Registration Type</th><th>Registered Internship Track(s)</th><th>Joined Date</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedStudents.map(student => {
                        const hasInternship = student.registrationType === 'INTERNSHIP_REGISTERED' || (student.applications && student.applications.length > 0);
                        const joinedDate = student.createdAt ? new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Aug 18, 2026';

                        return (
                          <tr key={student.id}>
                            <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>#{student.id.substring(0, 8)}</td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>{student.name ? student.name.charAt(0).toUpperCase() : 'S'}</div>
                                <div><div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{student.name}</div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{student.email}</div></div>
                              </div>
                            </td>
                            <td>
                              {hasInternship ? (
                                <span style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><GraduationCap size={13} /><span>Internship Registered</span></span>
                              ) : (
                                <span style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', border: '1px solid rgba(192, 132, 252, 0.3)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><UserPlus size={13} /><span>Just Registered</span></span>
                              )}
                            </td>
                            <td>
                              {hasInternship && student.applications && student.applications.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                  {student.applications.map((app, idx) => (
                                    <div key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                      <span style={{ fontWeight: '600', color: '#38bdf8' }}>{app.trackTitle || app.internship?.title || 'Virtual Track'}</span>
                                      <span style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.72rem' }}>{app.status || 'APPLIED'}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No internship applied yet</span>}
                            </td>
                            <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{joinedDate}</td>
                            <td>
                              <button onClick={() => handleDeleteStudent(student.id)} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Trash2 size={13} /> Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 3: INTERNSHIPS MANAGEMENT */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'internships' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Virtual Internship Tracks Catalog</h3>
              <button className="btn-primary" onClick={() => setIsAddInternshipModalOpen(true)}>+ Add New Track</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th><th>Domain</th><th>Duration</th><th>Stipend / Perks</th><th>Description</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {internships.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: '700', color: 'var(--text-main)' }}>{item.title}</td>
                    <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: '600' }}>{item.domain}</span></td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.duration}</td>
                    <td style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: '600' }}>{item.stipend}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '280px' }}>{item.description}</td>
                    <td>
                      <button onClick={async () => { if (window.confirm(`Delete ${item.title}?`)) { await internshipAPI.deleteInternship(item.id); fetchInternships(); } }} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 4: PROJECTS CATALOG */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'projects' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Assigned Project Guidelines Catalog</h3>
              <button className="btn-primary" onClick={() => setIsAddProjectModalOpen(true)}>+ Add Project Guideline</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Task #</th><th>Track</th><th>Project Title</th><th>Difficulty Level</th><th>Submission Requirement</th><th>Description</th>
                </tr>
              </thead>
              <tbody>
                {projectsCatalog.map(p => (
                  <tr key={p.id}>
                    <td><span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>Task {p.taskNumber}</span></td>
                    <td style={{ fontWeight: '700', color: '#38bdf8' }}>{p.trackTitle}</td>
                    <td style={{ fontWeight: '600' }}>{p.title}</td>
                    <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', background: 'rgba(52, 211, 153, 0.18)', color: '#34d399', fontWeight: '700' }}>{p.level}</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.submissionType}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '300px' }}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 5: SUBMISSIONS REVIEW */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'submissions' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Student Project Submissions Queue ({submissions.length})</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th><th>Project Title</th><th>Submitted Link</th><th>Submitted Date</th><th>Status</th><th>Review & Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(sub => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: '600' }}>{sub.user?.name || 'Student'}<div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub.user?.email}</div></td>
                    <td style={{ fontWeight: '600', color: '#38bdf8' }}>{sub.projectTitle}</td>
                    <td><a href={sub.fileUrl?.startsWith('http') ? sub.fileUrl : `https://${sub.fileUrl}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>Open Link <ExternalLink size={12} /></a></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td><span style={{ padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '700', background: sub.status === 'APPROVED' ? 'rgba(52, 211, 153, 0.18)' : sub.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.18)' : 'rgba(245, 158, 11, 0.18)', color: sub.status === 'APPROVED' ? '#34d399' : sub.status === 'REJECTED' ? '#f87171' : '#fbbf24' }}>{sub.status}</span></td>
                    <td>
                      <button onClick={() => setSelectedSubmissionForReview(sub)} className="btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>Evaluate Submission</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 6: OFFER LETTERS */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'offer-letters' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Official Offer Letters Registry</h3>
              <button className="btn-primary" onClick={() => setIsOfferLetterModalOpen(true)}>+ Generate Offer Letter</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Offer Code</th><th>Student Name</th><th>Student Email</th><th>Internship Track</th><th>Issued Date</th><th>Delivery Status</th><th>One-Click Action</th>
                </tr>
              </thead>
              <tbody>
                {offerLetters.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: '700', color: '#818cf8' }}>{o.offerCode}</td>
                    <td style={{ fontWeight: '600' }}>{o.studentName}</td>
                    <td>{o.studentEmail}</td>
                    <td style={{ color: '#38bdf8' }}>{o.trackTitle}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{o.issuedDate}</td>
                    <td>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem', background: o.status?.includes('SENT') ? 'rgba(52, 211, 153, 0.22)' : 'rgba(56, 189, 248, 0.18)', color: o.status?.includes('SENT') ? '#34d399' : '#38bdf8', fontWeight: '700' }}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        type="button"
                        className="btn-primary" 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'linear-gradient(135deg, #0284c7, #10b981)' }}
                        onClick={() => handleSendOfferLetter(o)}
                      >
                        <Mail size={13} /> Issue & Send Mail ✉️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 7: CERTIFICATES */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'certificates' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Verified Certificates & Issuance Log</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Certificate Code</th><th>Student</th><th>Track</th><th>₹99 Fee Status</th><th>Issue Date</th><th>Verification Link</th>
                </tr>
              </thead>
              <tbody>
                {liveCertificates.map((c) => (
                  <tr key={c.id} style={{ background: 'rgba(52, 211, 153, 0.05)' }}>
                    <td style={{ fontWeight: '700', color: '#c084fc' }}>{c.certificateCode}</td>
                    <td style={{ fontWeight: '600' }}>
                      {c.user?.name || 'Sunny Divilash'}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.user?.email || 'sriramdivilash@gmail.com'}</div>
                    </td>
                    <td style={{ color: '#38bdf8' }}>{c.trackTitle}</td>
                    <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399', fontWeight: '800', fontSize: '0.78rem' }}>₹99 VERIFIED</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(c.issueDate).toLocaleDateString()}</td>
                    <td><a href={`/verify/${c.certificateCode}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>Verify Online →</a></td>
                  </tr>
                ))}
                {payments.filter(p => p.status === 'SUCCESS').map((p, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '700', color: '#c084fc' }}>NDR-2026-X89{idx + 1}</td>
                    <td style={{ fontWeight: '600' }}>{p.studentName}<div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.studentEmail}</div></td>
                    <td style={{ color: '#38bdf8' }}>{p.trackTitle}</td>
                    <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.18)', color: '#34d399', fontWeight: '700', fontSize: '0.78rem' }}>₹99 VERIFIED</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(p.paidAt).toLocaleDateString()}</td>
                    <td><a href={`/verify/NDR-2026-X89${idx + 1}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>Verify Online →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 8: PAYMENTS (₹99) */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'payments' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>₹99 Verified Certificate Payments Ledger</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Txn ID</th><th>Order ID</th><th>Student</th><th>Internship Track</th><th>Amount</th><th>Method</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {liveCertificates.map((c) => (
                  <tr key={c.id} style={{ background: 'rgba(52, 211, 153, 0.05)' }}>
                    <td style={{ fontWeight: '700', color: '#818cf8' }}>TXN-{c.certificateCode.replace('NDR-2026-', '')}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ORD-99-{c.certificateCode.replace('NDR-2026-', '')}</td>
                    <td style={{ fontWeight: '600' }}>
                      {c.user?.name || 'Sunny Divilash'}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.user?.email || 'sriramdivilash@gmail.com'}</div>
                    </td>
                    <td style={{ color: '#38bdf8' }}>{c.trackTitle}</td>
                    <td style={{ fontWeight: '800', color: '#34d399' }}>₹99</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UPI / Razorpay</td>
                    <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800', background: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>SUCCESS</span></td>
                  </tr>
                ))}
                {payments.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: '700', color: '#818cf8' }}>{p.txnId}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.orderId}</td>
                    <td style={{ fontWeight: '600' }}>{p.studentName}<div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.studentEmail}</div></td>
                    <td style={{ color: '#38bdf8' }}>{p.trackTitle}</td>
                    <td style={{ fontWeight: '800', color: '#34d399' }}>{p.amount}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.paymentMethod}</td>
                    <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', background: p.status === 'SUCCESS' ? 'rgba(52, 211, 153, 0.18)' : 'rgba(245, 158, 11, 0.18)', color: p.status === 'SUCCESS' ? '#34d399' : '#fbbf24' }}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 9: TESTS & QUIZZES */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'tests' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Knowledge Assessment Quizzes & Test Results</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)' }}>
                <h4 style={{ color: '#38bdf8', margin: '0 0 0.5rem 0' }}>Full Stack Web Dev Test</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Questions: 15 MCQs | Pass Score: 80%</div>
                <div style={{ marginTop: '0.75rem', fontWeight: '700', color: '#34d399' }}>1,240 Attended | 88% Pass Rate</div>
              </div>
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)' }}>
                <h4 style={{ color: '#818cf8', margin: '0 0 0.5rem 0' }}>Frontend Engineering Quiz</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Questions: 12 MCQs | Pass Score: 75%</div>
                <div style={{ marginTop: '0.75rem', fontWeight: '700', color: '#34d399' }}>980 Attended | 92% Pass Rate</div>
              </div>
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)' }}>
                <h4 style={{ color: '#c084fc', margin: '0 0 0.5rem 0' }}>AI & Machine Learning Test</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Questions: 15 MCQs | Pass Score: 80%</div>
                <div style={{ marginTop: '0.75rem', fontWeight: '700', color: '#34d399' }}>650 Attended | 82% Pass Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 10: EMAIL LOGS */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'emails' && (() => {
          const filteredEmailLogs = emailLogs.filter(e => {
            // Status Filter
            if (emailStatusFilter !== 'all' && e.status !== emailStatusFilter) return false;

            // Date Range Filter
            if (emailStartDate || emailEndDate) {
              const emailTime = new Date(e.sentAt).getTime();
              if (emailStartDate && emailTime < new Date(emailStartDate).setHours(0,0,0,0)) return false;
              if (emailEndDate && emailTime > new Date(emailEndDate).setHours(23,59,59,999)) return false;
            }

            // Search Query (recipient email or subject line)
            if (emailSearchQuery) {
              const q = emailSearchQuery.toLowerCase();
              return e.recipient?.toLowerCase().includes(q) || e.subject?.toLowerCase().includes(q) || e.type?.toLowerCase().includes(q);
            }
            return true;
          });

          const totalEmails = emailLogs.length;
          const deliveredCount = emailLogs.filter(e => e.status === 'DELIVERED').length;
          const queuedCount = emailLogs.filter(e => e.status === 'QUEUED').length;
          const failedCount = emailLogs.filter(e => e.status === 'FAILED').length;

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Summary Stats Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>{totalEmails}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Logged Emails</div></div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399' }}>{deliveredCount}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Delivered Emails</div></div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fbbf24' }}>{queuedCount}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Queued in Buffer</div></div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', borderRadius: '10px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XCircle size={22} /></div>
                  <div><div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f87171' }}>{failedCount}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Delivery Failures</div></div>
                </div>
              </div>

              {/* Main Log Table Panel */}
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Outbound Automated Email Logs</h3>
                  {/* Search Input */}
                  <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Search recipient or subject..." 
                      value={emailSearchQuery} 
                      onChange={(e) => setEmailSearchQuery(e.target.value)} 
                      className="admin-search-input" 
                      style={{ paddingLeft: '2.2rem', width: '100%' }} 
                    />
                  </div>
                </div>

                {/* Date Filter Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}>
                      <Calendar size={16} style={{ color: 'var(--accent-cyan)' }} />
                      <span>Date Filter:</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <button onClick={() => { setEmailStartDate(''); setEmailEndDate(''); setEmailDatePreset('all'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailDatePreset === 'all' ? 'var(--accent-cyan)' : 'var(--border-light)', background: emailDatePreset === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: emailDatePreset === 'all' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>All Time</button>
                      <button onClick={() => { const t = getTodayStr(); setEmailStartDate(t); setEmailEndDate(t); setEmailDatePreset('today'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailDatePreset === 'today' ? 'var(--accent-cyan)' : 'var(--border-light)', background: emailDatePreset === 'today' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: emailDatePreset === 'today' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Today</button>
                      <button onClick={() => { setEmailStartDate(getDaysAgoStr(7)); setEmailEndDate(getTodayStr()); setEmailDatePreset('7days'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailDatePreset === '7days' ? 'var(--accent-cyan)' : 'var(--border-light)', background: emailDatePreset === '7days' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: emailDatePreset === '7days' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Last 7 Days</button>
                      <button onClick={() => { setEmailStartDate(getDaysAgoStr(30)); setEmailEndDate(getTodayStr()); setEmailDatePreset('30days'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailDatePreset === '30days' ? 'var(--accent-cyan)' : 'var(--border-light)', background: emailDatePreset === '30days' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: emailDatePreset === '30days' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Last 30 Days</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>From:</label><input type="date" value={emailStartDate} onChange={(e) => { setEmailStartDate(e.target.value); setEmailDatePreset('custom'); }} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', fontSize: '0.78rem' }} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>To:</label><input type="date" value={emailEndDate} onChange={(e) => { setEmailEndDate(e.target.value); setEmailDatePreset('custom'); }} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', fontSize: '0.78rem' }} /></div>
                    {(emailStartDate || emailEndDate || emailSearchQuery) && <button onClick={() => { setEmailStartDate(''); setEmailEndDate(''); setEmailSearchQuery(''); setEmailDatePreset('all'); setEmailStatusFilter('all'); }} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><RotateCcw size={12} /><span>Reset</span></button>}
                  </div>
                </div>

                {/* Delivery Status Toggle Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setEmailStatusFilter('all')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailStatusFilter === 'all' ? '#38bdf8' : 'var(--border-light)', background: emailStatusFilter === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: emailStatusFilter === 'all' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>All Logs ({emailLogs.length})</button>
                  <button onClick={() => setEmailStatusFilter('DELIVERED')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailStatusFilter === 'DELIVERED' ? '#34d399' : 'var(--border-light)', background: emailStatusFilter === 'DELIVERED' ? 'rgba(52, 211, 153, 0.2)' : 'transparent', color: emailStatusFilter === 'DELIVERED' ? '#34d399' : 'var(--text-muted)', cursor: 'pointer' }}>🟢 Delivered ({deliveredCount})</button>
                  <button onClick={() => setEmailStatusFilter('QUEUED')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailStatusFilter === 'QUEUED' ? '#fbbf24' : 'var(--border-light)', background: emailStatusFilter === 'QUEUED' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', color: emailStatusFilter === 'QUEUED' ? '#fbbf24' : 'var(--text-muted)', cursor: 'pointer' }}>🟡 Queued ({queuedCount})</button>
                  <button onClick={() => setEmailStatusFilter('FAILED')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: emailStatusFilter === 'FAILED' ? '#f87171' : 'var(--border-light)', background: emailStatusFilter === 'FAILED' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', color: emailStatusFilter === 'FAILED' ? '#f87171' : 'var(--text-muted)', cursor: 'pointer' }}>🔴 Failed ({failedCount})</button>
                </div>

                {/* Email Logs Table */}
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Recipient Email</th><th>Subject</th><th>Email Type</th><th>Sent Timestamp</th><th>Delivery Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmailLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                          No email logs found matching the selected date range or filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredEmailLogs.map(e => (
                        <tr key={e.id}>
                          <td style={{ fontWeight: '600' }}>{e.recipient}</td>
                          <td style={{ color: 'var(--text-main)' }}>{e.subject}</td>
                          <td><span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.18)', color: '#818cf8', fontWeight: '700' }}>{e.type}</span></td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(e.sentAt).toLocaleString()}</td>
                          <td>
                            <span style={{ 
                              padding: '0.2rem 0.55rem', 
                              borderRadius: '4px', 
                              fontSize: '0.75rem', 
                              fontWeight: '700',
                              background: e.status === 'DELIVERED' ? 'rgba(52, 211, 153, 0.18)' : e.status === 'QUEUED' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(239, 68, 68, 0.18)',
                              color: e.status === 'DELIVERED' ? '#34d399' : e.status === 'QUEUED' ? '#fbbf24' : '#f87171'
                            }}>
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 11: NOTIFICATIONS & BROADCAST MANAGER */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'notifications' && (() => {
          const filteredNotifs = notificationsData.filter(n => {
            // Category Filter
            if (notifCategoryFilter !== 'all' && n.type !== notifCategoryFilter) return false;

            // Date Range Filter
            if (notifStartDate || notifEndDate) {
              const nTime = new Date(n.sentAt).getTime();
              if (notifStartDate && nTime < new Date(notifStartDate).setHours(0,0,0,0)) return false;
              if (notifEndDate && nTime > new Date(notifEndDate).setHours(23,59,59,999)) return false;
            }

            // Search Query
            if (notifSearchQuery) {
              const q = notifSearchQuery.toLowerCase();
              return n.title?.toLowerCase().includes(q) || n.message?.toLowerCase().includes(q) || n.targetAudience?.toLowerCase().includes(q);
            }
            return true;
          });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Broadcast Composer Form Panel */}
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.1rem' }}>System Broadcast Notifications & Push Manager</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Send instant in-app alerts and notifications to student dashboards.</div>
                  </div>
                </div>

                <form onSubmit={handleSendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Notification Title *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. New AI & Machine Learning Track Launched!" 
                        value={newNotifTitle}
                        onChange={(e) => setNewNotifTitle(e.target.value)}
                        className="admin-search-input" 
                        style={{ width: '100%' }} 
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Notification Category</label>
                      <select 
                        value={newNotifCategory}
                        onChange={(e) => setNewNotifCategory(e.target.value)}
                        className="admin-search-input" 
                        style={{ width: '100%' }}
                      >
                        <option value="ANNOUNCEMENT">📢 Announcement</option>
                        <option value="REMINDER">⏰ Deadline Reminder</option>
                        <option value="DOCUMENT_UPDATE">📄 Offer/Certificate Update</option>
                        <option value="URGENT_ALERT">🚨 Urgent Alert</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Target Audience</label>
                      <select 
                        value={newNotifAudience}
                        onChange={(e) => setNewNotifAudience(e.target.value)}
                        className="admin-search-input" 
                        style={{ width: '100%' }}
                      >
                        <option value="All Registered Students">All Registered Students (~12,540)</option>
                        <option value="Active Internship Learners">Active Internship Learners (~4,120)</option>
                        <option value="Certificate Completed Students">Certificate Alumni (~7,950)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Detailed Notification Description *</label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{newNotifMessage.length} / 300 chars</span>
                    </div>
                    <textarea 
                      required
                      rows={3}
                      maxLength={300}
                      placeholder="Write the notification message that will appear on student dashboards..."
                      value={newNotifMessage}
                      onChange={(e) => setNewNotifMessage(e.target.value)}
                      className="admin-search-input"
                      style={{ width: '100%', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem' }}>
                      <Send size={15} /> Send Broadcast Notification
                    </button>
                  </div>
                </form>
              </div>

              {/* Sent Broadcasts Log History Panel */}
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.1rem' }}>Sent Broadcast Notification History</h3>
                  
                  {/* Search Bar */}
                  <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Search title or message..." 
                      value={notifSearchQuery} 
                      onChange={(e) => setNotifSearchQuery(e.target.value)} 
                      className="admin-search-input" 
                      style={{ paddingLeft: '2.2rem', width: '100%' }} 
                    />
                  </div>
                </div>

                {/* Date Filter Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: '8px', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: '700' }}>
                      <Calendar size={16} style={{ color: 'var(--accent-cyan)' }} />
                      <span>Date Filter:</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <button onClick={() => { setNotifStartDate(''); setNotifEndDate(''); setNotifDatePreset('all'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifDatePreset === 'all' ? 'var(--accent-cyan)' : 'var(--border-light)', background: notifDatePreset === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: notifDatePreset === 'all' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>All Time</button>
                      <button onClick={() => { const t = getTodayStr(); setNotifStartDate(t); setNotifEndDate(t); setNotifDatePreset('today'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifDatePreset === 'today' ? 'var(--accent-cyan)' : 'var(--border-light)', background: notifDatePreset === 'today' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: notifDatePreset === 'today' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Today</button>
                      <button onClick={() => { setNotifStartDate(getDaysAgoStr(7)); setNotifEndDate(getTodayStr()); setNotifDatePreset('7days'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifDatePreset === '7days' ? 'var(--accent-cyan)' : 'var(--border-light)', background: notifDatePreset === '7days' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: notifDatePreset === '7days' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Last 7 Days</button>
                      <button onClick={() => { setNotifStartDate(getDaysAgoStr(30)); setNotifEndDate(getTodayStr()); setNotifDatePreset('30days'); }} style={{ padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifDatePreset === '30days' ? 'var(--accent-cyan)' : 'var(--border-light)', background: notifDatePreset === '30days' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: notifDatePreset === '30days' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>Last 30 Days</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>From:</label><input type="date" value={notifStartDate} onChange={(e) => { setNotifStartDate(e.target.value); setNotifDatePreset('custom'); }} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', fontSize: '0.78rem' }} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>To:</label><input type="date" value={notifEndDate} onChange={(e) => { setNotifEndDate(e.target.value); setNotifDatePreset('custom'); }} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid var(--border-light)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', fontSize: '0.78rem' }} /></div>
                    {(notifStartDate || notifEndDate || notifSearchQuery) && <button onClick={() => { setNotifStartDate(''); setNotifEndDate(''); setNotifSearchQuery(''); setNotifDatePreset('all'); setNotifCategoryFilter('all'); }} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><RotateCcw size={12} /><span>Reset</span></button>}
                  </div>
                </div>

                {/* Category Pills */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setNotifCategoryFilter('all')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifCategoryFilter === 'all' ? '#38bdf8' : 'var(--border-light)', background: notifCategoryFilter === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', color: notifCategoryFilter === 'all' ? '#38bdf8' : 'var(--text-muted)', cursor: 'pointer' }}>All Broadcasts ({notificationsData.length})</button>
                  <button onClick={() => setNotifCategoryFilter('ANNOUNCEMENT')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifCategoryFilter === 'ANNOUNCEMENT' ? '#818cf8' : 'var(--border-light)', background: notifCategoryFilter === 'ANNOUNCEMENT' ? 'rgba(99, 102, 241, 0.2)' : 'transparent', color: notifCategoryFilter === 'ANNOUNCEMENT' ? '#818cf8' : 'var(--text-muted)', cursor: 'pointer' }}>📢 Announcements</button>
                  <button onClick={() => setNotifCategoryFilter('REMINDER')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifCategoryFilter === 'REMINDER' ? '#fbbf24' : 'var(--border-light)', background: notifCategoryFilter === 'REMINDER' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', color: notifCategoryFilter === 'REMINDER' ? '#fbbf24' : 'var(--text-muted)', cursor: 'pointer' }}>⏰ Reminders</button>
                  <button onClick={() => setNotifCategoryFilter('DOCUMENT_UPDATE')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifCategoryFilter === 'DOCUMENT_UPDATE' ? '#34d399' : 'var(--border-light)', background: notifCategoryFilter === 'DOCUMENT_UPDATE' ? 'rgba(52, 211, 153, 0.2)' : 'transparent', color: notifCategoryFilter === 'DOCUMENT_UPDATE' ? '#34d399' : 'var(--text-muted)', cursor: 'pointer' }}>📄 Updates</button>
                  <button onClick={() => setNotifCategoryFilter('URGENT_ALERT')} style={{ padding: '0.35rem 0.8rem', borderRadius: '16px', fontSize: '0.78rem', fontWeight: '600', border: '1px solid', borderColor: notifCategoryFilter === 'URGENT_ALERT' ? '#f87171' : 'var(--border-light)', background: notifCategoryFilter === 'URGENT_ALERT' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', color: notifCategoryFilter === 'URGENT_ALERT' ? '#f87171' : 'var(--text-muted)', cursor: 'pointer' }}>🚨 Urgent Alerts</button>
                </div>

                {/* Sent Broadcasts Table */}
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title & Category</th><th>Target Audience</th><th>Message Summary</th><th>Sent Timestamp</th><th>Sent By</th><th>Est. Student Reach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotifs.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                          No broadcast notifications found matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredNotifs.map(n => (
                        <tr key={n.id}>
                          <td>
                            <div style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{n.title}</div>
                            <span style={{ 
                              padding: '0.15rem 0.5rem', 
                              borderRadius: '4px', 
                              fontSize: '0.72rem', 
                              fontWeight: '700',
                              background: n.type === 'ANNOUNCEMENT' ? 'rgba(99, 102, 241, 0.18)' : n.type === 'REMINDER' ? 'rgba(245, 158, 11, 0.18)' : n.type === 'URGENT_ALERT' ? 'rgba(239, 68, 68, 0.18)' : 'rgba(52, 211, 153, 0.18)',
                              color: n.type === 'ANNOUNCEMENT' ? '#818cf8' : n.type === 'REMINDER' ? '#fbbf24' : n.type === 'URGENT_ALERT' ? '#f87171' : '#34d399'
                            }}>
                              {n.type}
                            </span>
                          </td>
                          <td>
                            <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '600' }}>
                              {n.targetAudience}
                            </span>
                          </td>
                          <td style={{ maxWidth: '280px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                              {n.message}
                            </div>
                          </td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(n.sentAt).toLocaleString()}</td>
                          <td style={{ fontSize: '0.8rem', fontWeight: '600' }}>{n.sentBy}</td>
                          <td>
                            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '12px', background: 'rgba(192, 132, 252, 0.18)', color: '#c084fc', fontSize: '0.78rem', fontWeight: '700' }}>
                              👥 {n.reachCount.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 12: REVIEWS */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'reviews' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Student Reviews & Platform Testimonials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviews.map(r => (
                <div key={r.id} className="glass-panel" style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{r.studentName}</span>
                      <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{'★'.repeat(r.rating)}</span>
                      <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>({r.domain})</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{r.reviewText}"</div>
                  </div>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', background: 'rgba(52, 211, 153, 0.18)', color: '#34d399', fontWeight: '700' }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 13: SUPPORT TICKETS */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'support' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Student Support Helpdesk Workspace</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ticket ID</th><th>Student</th><th>Subject</th><th>Category</th><th>Priority</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map(t => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>{t.ticketNumber}</td>
                    <td style={{ fontWeight: '600' }}>{t.studentName}</td>
                    <td style={{ color: 'var(--text-main)' }}>{t.subject}</td>
                    <td><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{t.category}</span></td>
                    <td><span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>{t.priority}</span></td>
                    <td><span style={{ background: t.status === 'RESOLVED' ? 'rgba(52, 211, 153, 0.18)' : 'rgba(245, 158, 11, 0.18)', color: t.status === 'RESOLVED' ? '#34d399' : '#fbbf24', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>{t.status}</span></td>
                    <td>
                      <button onClick={() => setSelectedTicketForSupport(t)} className="admin-btn-secondary" style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}>Open Workspace</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 14: USERS & ROLES (SUPER_ADMIN ONLY) */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'users' && activeRole === 'SUPER_ADMIN' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Administrative & Staff Role Management</h3>
              <button className="btn-primary" onClick={() => setIsCreateAdminModalOpen(true)}>+ Add Staff / Admin User</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th><th>Name & Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Permissions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: '700', color: 'var(--text-muted)' }}>{u.id}</td>
                    <td style={{ fontWeight: '600' }}>{u.name}<div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div></td>
                    <td><span style={{ background: u.role === 'SUPER_ADMIN' ? 'rgba(192, 132, 252, 0.18)' : 'rgba(56, 189, 248, 0.18)', color: u.role === 'SUPER_ADMIN' ? '#c084fc' : '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: '700' }}>{u.role}</span></td>
                    <td><span style={{ background: 'rgba(52, 211, 153, 0.18)', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>{u.status}</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.lastLogin}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 15: AUDIT LOGS (SUPER_ADMIN ONLY) */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'audit-logs' && activeRole === 'SUPER_ADMIN' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Administrative & Security Activity Log</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Timestamp</th><th>Actor</th><th>Action</th><th>Target Resource</th><th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{new Date(log.created_at).toLocaleString()}</td>
                    <td style={{ fontWeight: '600' }}>{log.actor_email}</td>
                    <td style={{ color: '#c084fc', fontWeight: '700' }}>{log.action}</td>
                    <td>{log.target_resource}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{log.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* TAB 16: SETTINGS */}
        {/* -------------------------------------------------------------------------- */}
        {activeMenu === 'settings' && (
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '12px', maxWidth: '700px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.25rem' }}>SaaS Platform Settings & Configuration</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>₹99 Verified Certificate Pricing</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Standard fee charged to students upon 3-project completion.</div>
                </div>
                <input type="text" defaultValue="₹99" className="admin-search-input" style={{ width: '80px', textAlign: 'center', fontWeight: '700', color: '#34d399' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Auto-Send Offer Letter on Free Apply</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automatically generate official offer letter PDF when a student applies.</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>Payment Gateway Credentials</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Razorpay & UPI Webhook Integration Status</div>
                </div>
                <span style={{ padding: '0.25rem 0.65rem', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.18)', color: '#34d399', fontSize: '0.78rem', fontWeight: '700' }}>ACTIVE & CONNECTED</span>
              </div>

              <button className="btn-primary" onClick={() => setMessage('Platform configuration saved successfully!')} style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
                Save Settings
              </button>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 1: ADD INTERNSHIP TRACK */}
      {/* -------------------------------------------------------------------------- */}
      {isAddInternshipModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddInternshipModalOpen(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', background: 'var(--bg-card)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Add Virtual Internship Track</h3>
              <button onClick={() => setIsAddInternshipModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateInternship} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Track Title</label>
                <input type="text" className="admin-search-input" style={{ width: '100%' }} value={newInternship.title} onChange={e => setNewInternship({ ...newInternship, title: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Domain Category</label>
                <input type="text" className="admin-search-input" style={{ width: '100%' }} value={newInternship.domain} onChange={e => setNewInternship({ ...newInternship, domain: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Description</label>
                <textarea className="admin-search-input" style={{ width: '100%', height: '80px' }} value={newInternship.description} onChange={e => setNewInternship({ ...newInternship, description: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary">Create Internship Track</button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 2: ADD PROJECT GUIDELINES */}
      {/* -------------------------------------------------------------------------- */}
      {isAddProjectModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddProjectModalOpen(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', background: 'var(--bg-card)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Add Project Guideline</h3>
              <button onClick={() => setIsAddProjectModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Internship Track</label>
                <select className="admin-search-input" style={{ width: '100%' }} value={newProject.trackTitle} onChange={e => setNewProject({ ...newProject, trackTitle: e.target.value })}>
                  {internships.map(i => <option key={i.id} value={i.title}>{i.title}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Project Title</label>
                <input type="text" className="admin-search-input" style={{ width: '100%' }} value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Project Requirements & Description</label>
                <textarea className="admin-search-input" style={{ width: '100%', height: '80px' }} value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary">Save Project Guideline</button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 3: CREATE ADMIN / STAFF USER */}
      {/* -------------------------------------------------------------------------- */}
      {isCreateAdminModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateAdminModalOpen(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', background: 'var(--bg-card)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>Create Staff / Admin Account</h3>
              <button onClick={() => setIsCreateAdminModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateAdminUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input type="text" className="admin-search-input" style={{ width: '100%' }} value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Work Email</label>
                <input type="email" className="admin-search-input" style={{ width: '100%' }} value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assigned System Role</label>
                <select className="admin-search-input" style={{ width: '100%' }} value={newAdmin.role} onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value })}>
                  <option value="REVIEWER">REVIEWER (Project Evaluator)</option>
                  <option value="SUPPORT">SUPPORT (Helpdesk Agent)</option>
                  <option value="ADMIN">ADMIN (Operations Manager)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full System Control)</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">Create Staff Account</button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* DRAWER / MODAL: SUBMISSION EVALUATION (REVIEWER ROLE) */}
      {/* -------------------------------------------------------------------------- */}
      {selectedSubmissionForReview && (
        <div className="modal-overlay" onClick={() => setSelectedSubmissionForReview(null)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', background: 'var(--bg-card)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>SUBMISSION EVALUATION WORKSPACE</span>
                <h3 style={{ color: 'var(--text-main)', margin: '0.4rem 0 0 0' }}>{selectedSubmissionForReview.projectTitle}</h3>
              </div>
              <button onClick={() => setSelectedSubmissionForReview(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Student:</span> <strong style={{ color: 'var(--text-main)' }}>{selectedSubmissionForReview.user?.name || 'Student'}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Email:</span> <strong style={{ color: 'var(--text-main)' }}>{selectedSubmissionForReview.user?.email}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Track:</span> <span style={{ color: '#38bdf8' }}>{selectedSubmissionForReview.domain}</span></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Submitted:</span> <span>{new Date(selectedSubmissionForReview.submittedAt).toLocaleString()}</span></div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Submitted Code Repository & Live Demo URL:</label>
                <a href={selectedSubmissionForReview.fileUrl?.startsWith('http') ? selectedSubmissionForReview.fileUrl : `https://${selectedSubmissionForReview.fileUrl}`} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  {selectedSubmissionForReview.fileUrl} <ExternalLink size={14} />
                </a>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Score Evaluation (1 - 100):</label>
                <input type="number" min="1" max="100" value={reviewScore} onChange={e => setReviewScore(e.target.value)} className="admin-search-input" style={{ width: '100px', fontWeight: '700', color: '#34d399' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Reviewer Comments & Feedback for Student:</label>
                <textarea placeholder="Great work on backend API architecture! Consider modularizing your route handlers..." value={reviewerNote} onChange={e => setReviewerNote(e.target.value)} className="admin-search-input" style={{ width: '100%', height: '80px' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => handleUpdateStatus(selectedSubmissionForReview.id, 'APPROVED')} className="btn-primary" style={{ background: '#34d399', color: '#000', border: 'none' }}>
                  Approve Project ✔
                </button>
                <button onClick={() => handleUpdateStatus(selectedSubmissionForReview.id, 'REVISION_REQUESTED')} className="admin-btn-secondary" style={{ color: '#c084fc', borderColor: '#c084fc' }}>
                  Request Revision ⚠️
                </button>
                <button onClick={() => handleUpdateStatus(selectedSubmissionForReview.id, 'REJECTED')} className="admin-btn-secondary" style={{ color: '#f87171', borderColor: '#f87171' }}>
                  Reject ❌
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* DRAWER / MODAL: SUPPORT TICKET RESOLUTION (SUPPORT ROLE) */}
      {/* -------------------------------------------------------------------------- */}
      {selectedTicketForSupport && (
        <div className="modal-overlay" onClick={() => setSelectedTicketForSupport(null)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', background: 'var(--bg-card)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>TICKET RESOLUTION WORKSPACE</span>
                <h3 style={{ color: 'var(--text-main)', margin: '0.4rem 0 0 0' }}>{selectedTicketForSupport.ticketNumber} - {selectedTicketForSupport.subject}</h3>
              </div>
              <button onClick={() => setSelectedTicketForSupport(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem 1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span>Student: <strong style={{ color: 'var(--text-main)' }}>{selectedTicketForSupport.studentName}</strong> ({selectedTicketForSupport.studentEmail})</span>
                <span style={{ color: '#38bdf8' }}>Category: {selectedTicketForSupport.category}</span>
              </div>

              {/* Message Thread */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                {selectedTicketForSupport.messages?.map((msg, idx) => (
                  <div key={idx} style={{ alignSelf: msg.sender === 'student' ? 'flex-start' : 'flex-end', maxWidth: '80%', background: msg.sender === 'student' ? 'rgba(255,255,255,0.08)' : 'rgba(37, 99, 235, 0.25)', border: '1px solid', borderColor: msg.sender === 'student' ? 'var(--border-light)' : '#2563eb', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{msg.sender === 'student' ? selectedTicketForSupport.studentName : 'NDRaise Support Team'} • {msg.timestamp}</div>
                    <div>{msg.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendTicketReply} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <textarea placeholder="Type official response to student..." value={ticketReplyText} onChange={e => setTicketReplyText(e.target.value)} className="admin-search-input" style={{ width: '100%', height: '80px' }} required />
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-end' }}>
                  <Send size={14} /> Send Reply & Mark Resolved
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL: HELP & DOCUMENTATION */}
      {/* -------------------------------------------------------------------------- */}
      {isHelpModalOpen && (
        <div className="modal-overlay" onClick={() => setIsHelpModalOpen(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', background: 'var(--bg-card)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>ND Raise SaaS Admin Documentation</h3>
              <button onClick={() => setIsHelpModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div><strong>Business Model:</strong> Students register for 100% free virtual internships, receive offer letters, complete 3 assigned projects, and can pay ₹99 for a verified certificate.</div>
              <div><strong>Role Simulation:</strong> Use the top bar dropdown to switch between SUPER_ADMIN, ADMIN, REVIEWER, and SUPPORT access levels.</div>
              <div><strong>Verification Code Check:</strong> Every certificate issued generates a unique code (e.g. NDR-2026-X891) searchable live on the verification page.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
