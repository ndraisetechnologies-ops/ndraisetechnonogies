import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Home, Code, Award, User, Settings, LogOut, CheckCircle2, 
  Target, Mail, Brain, Briefcase, FileCheck, Menu, X, ExternalLink, Bell, Megaphone, Sparkles, Clock, AlertTriangle, Lock, Unlock 
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { studentDashboardData } from '../../data/studentDashboardData';
import { initialNotificationsData } from '../../data/adminDashboardData';
import { submissionAPI, internshipAPI, studentAPI, certificateAPI } from '../../services/apiClient';
import OfferLetterModal from '../../components/Modals/OfferLetterModal';
import TaskSubmissionModal from '../../components/Modals/TaskSubmissionModal';
import PaymentGatewayModal from '../../components/Modals/PaymentGatewayModal';
import AiLimitModal from '../../components/Modals/AiLimitModal';
import { getStudentAiProfile } from '../../services/aiCreditsService';
import { AnimatedNumber, StaggerContainer, StaggerItem, FadeIn } from '../../components/Motion/MotionUtils';
import './StudentDashboard.css';

export default function StudentDashboard({ user, onLogout, setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState(null);
  const [isCertApplied, setIsCertApplied] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [aiLimitModalOpen, setAiLimitModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const userEmail = user?.email || 'guest';
  const aiProfile = getStudentAiProfile(userEmail);

  // Broadcast Notifications & Bell Dropdown State
  const [notifications, setNotifications] = useState(initialNotificationsData);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [readNotifIds, setReadNotifIds] = useState([]);
  const [dismissedBannerIds, setDismissedBannerIds] = useState([]);

  const unreadCount = notifications.filter(n => !readNotifIds.includes(n.id)).length;
  const latestAnnouncement = notifications.find(n => !dismissedBannerIds.includes(n.id));

  const [submissions, setSubmissions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalApplications: 0,
    activeInternships: 0,
    completedInternships: 0,
    projectsCompleted: 0,
    projectsInProgress: 0,
    totalSubmissions: 0,
    testsAttended: 0,
    averageTestScore: 82,
    totalCertificates: 0,
    primaryTrack: null
  });

  const fetchSubmissions = () => {
    submissionAPI.getMySubmissions().then((res) => {
      if (res.success && res.submissions) {
        setSubmissions(res.submissions);
      }
    }).catch(() => {});
  };

  useEffect(() => {
    fetchSubmissions();
    studentAPI.getDashboardMetrics().then((res) => {
      if (res.success && res.metrics) {
        setDashboardMetrics(res.metrics);
        if (res.applications) setApplications(res.applications);
        if (res.submissions) setSubmissions(res.submissions);
      }
    }).catch(() => {
      internshipAPI.getMyApplications().then((res) => {
        if (res.success && res.applications) {
          setApplications(res.applications);
        }
      }).catch(() => {});
    });

    // Auto-refresh submission status every 5 seconds for instant unlock sync with Admin Dashboard
    const pollInterval = setInterval(() => {
      fetchSubmissions();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  const data = studentDashboardData;

  // Sidebar Menu Categories Structure
  const sidebarGroups = [
    {
      group: 'MAIN',
      items: [
        { id: 'home', label: 'Home Page', icon: Home },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      group: 'CAREER TOOLS',
      items: [
        { id: 'ats-score', label: ' Check ATS Score', icon: Target },
        { id: 'job-email-builder', label: 'Job Email Builder', icon: Mail },
        { id: 'interview-prep', label: 'Interview Preparation', icon: Brain },
      ]
    },
    {
      group: 'LEARNING',
      items: [
        { id: 'tests', label: 'Tests', icon: FileCheck },
        { id: 'projects', label: 'Projects', icon: Code },
        { id: 'certificates', label: 'Certificates', icon: Award },
      ]
    },
    {
      group: 'ACCOUNT',
      items: [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const handleMenuClick = (itemId) => {
    setSidebarOpen(false);
    if (itemId === 'home') {
      if (setCurrentView) setCurrentView('home');
    } else if (itemId === 'ats-score') {
      if (setCurrentView) setCurrentView('ats-score');
    } else if (itemId === 'job-email-builder') {
      if (setCurrentView) setCurrentView('job-email-builder');
    } else if (itemId === 'interview-prep') {
      if (setCurrentView) setCurrentView('interview-preparation');
    } else if (itemId === 'projects') {
      if (setCurrentView) setCurrentView('project-guidelines');
    } else {
      setActiveMenu(itemId);
      if (itemId === 'offer-letter') setOfferModalOpen(true);
      if (itemId === 'tasks') setSubmitModalOpen(true);
    }
  };

  const primaryTrackTitle = applications[0]?.internship?.title || dashboardMetrics.primaryTrack || 'Full Stack Web Development Internship';

  // Sequential Project Locking & Certificate Logic
  const projectsList = data.projectsList || [];

  const isProjectUnlocked = (idx) => {
    if (idx === 0) return true;
    const prevProj = projectsList[idx - 1];
    if (!prevProj) return true;
    const prevSub = submissions.find(
      (s) => s.projectTitle?.trim().toLowerCase() === prevProj.title?.trim().toLowerCase()
    );
    return prevSub?.status === 'APPROVED';
  };

  const approvedProjectTitles = projectsList
    .filter((proj) => {
      const sub = submissions.find(
        (s) => s.projectTitle?.trim().toLowerCase() === proj.title?.trim().toLowerCase()
      );
      return sub?.status === 'APPROVED';
    })
    .map((p) => p.title);

  const approvedProjectsCount = approvedProjectTitles.length;
  const totalProjectsCount = projectsList.length || 3;
  const allProjectsApproved = totalProjectsCount > 0 && approvedProjectsCount >= totalProjectsCount;

  const handleApplyCertificate = async () => {
    if (!allProjectsApproved) {
      alert(`🔒 Certificate Locked!\n\nYou have completed and got approval for ${approvedProjectsCount} out of ${totalProjectsCount} projects. Please complete all assigned projects and get admin approval to unlock your certificate.`);
      return;
    }
    setIsCertApplied(true);
    try {
      await certificateAPI.claimCertificate({
        trackTitle: primaryTrackTitle
      }).catch(() => {});
    } catch (err) {
      console.log('Cert claim logged:', err);
    }
  };

  return (
    <div className="dashboard-layout">
      
      {/* Mobile Top Navigation Header */}
      <div className="dashboard-mobile-bar">
        <div className="nav-brand">
          <div className="brand-logo-badge" style={{ width: '36px', height: '36px' }}>
            <img src="/logo.jpg" alt="ND Technologies Logo" className="brand-logo-img" />
          </div>
          <div className="brand-title" style={{ fontSize: '1rem' }}>
            ND <span>TECHNOLOGIES</span>
          </div>
        </div>
        <button 
          className="dashboard-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Dashboard Menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay Backdrop for Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="dashboard-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
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

        {/* Categorized Sidebar Menu */}
        <div className="sidebar-groups-wrapper">
          {sidebarGroups.map((grp) => (
            <div key={grp.group} className="sidebar-group-box">
              <div className="sidebar-group-title">{grp.group}</div>
              <ul className="dashboard-menu">
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      className={`menu-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.id)}
                      whileHover={shouldReduceMotion ? {} : { x: 4 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <motion.div 
            className="menu-item logout-menu-item" 
            onClick={onLogout}
            whileHover={shouldReduceMotion ? {} : { x: 4 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="dashboard-main">
           {/* Live Broadcast Announcement Banner Box */}
        {latestAnnouncement && (
          <FadeIn direction="down" duration={0.3}>
            <div className={`announcement-banner-box ${latestAnnouncement.type === 'URGENT_ALERT' ? 'urgent-alert' : ''}`}>
              <div className="announcement-top-bar">
                <div className="announcement-tag-group">
                  <div className="announcement-icon-badge">
                    {latestAnnouncement.type === 'URGENT_ALERT' ? <AlertTriangle size={16} /> : <Megaphone size={16} />}
                  </div>
                  <span className="announcement-type-pill">
                    {latestAnnouncement.type}
                  </span>
                </div>

                <button 
                  className="announcement-dismiss-btn"
                  onClick={() => setDismissedBannerIds(prev => [...prev, latestAnnouncement.id])} 
                  title="Dismiss Banner"
                >
                  <X size={16} />
                </button>
              </div>

              <h4 className="announcement-banner-title">
                {latestAnnouncement.title}
              </h4>

              <p className="announcement-banner-msg">
                {latestAnnouncement.message}
              </p>
            </div>
          </FadeIn>
        )}

        {/* 1. Welcome Header */}
        <FadeIn direction="down" duration={0.4} style={{ position: 'relative', zIndex: 100 }}>
          <div className="dashboard-header glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 100 }}>
            <div className="welcome-text">
              <h1>Welcome back, {user?.name || data.welcome.name} 👋</h1>
              <p>Here's your live career progress at NDRise.</p>
            </div>

            {/* Notification Bell Icon & Popover Menu */}
            <div style={{ position: 'relative', zIndex: 101 }}>
              <button 
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-light)',
                  padding: '0.65rem',
                  borderRadius: '12px',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                title="System Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown Drawer */}
              <AnimatePresence>
                {notifDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="notif-dropdown-drawer"
                  >
                    {/* Popover Header */}
                    <div className="notif-drawer-header">
                      <div className="notif-drawer-title">
                        <Bell size={16} style={{ color: '#38bdf8' }} /> System Broadcast Notifications
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        {unreadCount > 0 && (
                          <button 
                            className="notif-mark-read-btn"
                            onClick={() => setReadNotifIds(notifications.map(n => n.id))} 
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          className="notif-close-btn"
                          onClick={() => setNotifDropdownOpen(false)}
                          title="Close Notifications"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Notification List Body */}
                    <div className="notif-drawer-body">
                      {notifications.length === 0 ? (
                        <div className="notif-empty-state">
                          No notifications right now.
                        </div>
                      ) : (
                        notifications.map((n) => {
                          const isRead = readNotifIds.includes(n.id);
                          return (
                            <div 
                              key={n.id} 
                              className={`notif-item-card ${isRead ? 'read' : 'unread'}`}
                              onClick={() => setReadNotifIds(prev => isRead ? prev : [...prev, n.id])}
                              style={{
                                borderLeft: `3px solid ${n.type === 'URGENT_ALERT' ? '#f87171' : n.type === 'ANNOUNCEMENT' ? '#818cf8' : '#34d399'}`
                              }}
                            >
                              <div className="notif-item-header">
                                <span className="notif-item-title">{n.title}</span>
                                {!isRead && <span className="notif-unread-dot" />}
                              </div>
                              <div className="notif-item-msg">
                                {n.message}
                              </div>
                              <div className="notif-item-meta">
                                <span>{n.sentBy}</span>
                                <span>{new Date(n.sentAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>

        {/* 2. Career Overview Summary Cards Row */}
        <StaggerContainer className="career-overview-grid" staggerChildren={0.07}>
          
          <StaggerItem>
            <motion.div 
              className="summary-card glass-panel" 
              onClick={() => setActiveMenu('applications')}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-blue"><Briefcase size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">INTERNSHIPS APPLIED</span>
                <div className="summary-num">
                  <AnimatedNumber value={applications.length || dashboardMetrics.totalApplications || 0} />
                </div>
                <span className="summary-subtext">Live applications in Neon DB</span>
              </div>
              <div className="summary-link">View Applications →</div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div 
              className="summary-card glass-panel" 
              onClick={() => setActiveMenu('applications')}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-emerald"><CheckCircle2 size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">INTERNSHIPS COMPLETED</span>
                <div className="summary-num">
                  <AnimatedNumber value={submissions.filter(s => s.status === 'APPROVED').length || dashboardMetrics.completedInternships || 0} />
                </div>
                <span className="summary-subtext">{applications.filter(a => ['APPLIED', 'SHORTLISTED', 'UNDER_REVIEW', 'SELECTED'].includes(a.status)).length || 1} active track</span>
              </div>
              <div className="summary-link">View Journey →</div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div 
              className="summary-card glass-panel" 
              onClick={() => handleMenuClick('tests')}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-purple"><FileCheck size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">TESTS ATTENDED</span>
                <div className="summary-num">
                  <AnimatedNumber value={dashboardMetrics.testsAttended || 0} />
                </div>
                <span className="summary-subtext">Average Score: {dashboardMetrics.averageTestScore || 82}%</span>
              </div>
              <div className="summary-link">View Test Results →</div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div 
              className="summary-card glass-panel" 
              onClick={() => handleMenuClick('projects')}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-amber"><Code size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">PROJECTS COMPLETED</span>
                <div className="summary-num">
                  <AnimatedNumber value={submissions.filter(s => s.status === 'APPROVED').length || dashboardMetrics.projectsCompleted || 0} />
                </div>
                <span className="summary-subtext">{submissions.filter(s => s.status === 'PENDING' || s.status === 'REVISION_REQUESTED').length || 0} in progress</span>
              </div>
              <div className="summary-link">View Projects →</div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div 
              className="summary-card glass-panel" 
              onClick={() => {
                if (isCertApplied) return;
                if (allProjectsApproved) {
                  setPaymentModalOpen(true);
                } else {
                  handleMenuClick('certificates');
                }
              }}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-teal"><Award size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">CERTIFICATES</span>
                <div className="summary-num">
                  <AnimatedNumber value={isCertApplied ? (dashboardMetrics.totalCertificates || 1) : (dashboardMetrics.totalCertificates || 0)} />
                </div>
                <span className="summary-subtext" style={{ color: isCertApplied || allProjectsApproved ? '#34d399' : undefined, fontWeight: isCertApplied || allProjectsApproved ? '700' : 'normal' }}>
                  {isCertApplied ? 'Applied ✔ (Issuing in 24-48h)' : allProjectsApproved ? '🎉 Ready to Apply!' : `Locked 🔒 (${approvedProjectsCount}/${totalProjectsCount} Approved)`}
                </span>
              </div>
              <div className="summary-link" style={{ color: isCertApplied ? '#34d399' : undefined, fontWeight: isCertApplied ? '700' : undefined }}>
                {isCertApplied ? 'Applied ✔' : allProjectsApproved ? 'Apply for Certificate 🎓' : 'View Certificates →'}
              </div>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div 
              className="summary-card glass-panel" 
              onClick={() => handleMenuClick('ats-score')}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-sky"><Target size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">ATS SCORE</span>
                <div className="summary-num">
                  <AnimatedNumber value={aiProfile.history?.[0]?.score || data.overview.atsScore || 78} /> <small style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 100</small>
                </div>
                <span className="summary-subtext">Grade: {aiProfile.history?.[0]?.grade || data.overview.atsGrade || 'Good'}</span>
              </div>
              <div className="summary-link">Improve ATS →</div>
            </motion.div>
          </StaggerItem>

        </StaggerContainer>

        {/* Live Applied Internships View */}
        {activeMenu === 'applications' && (
          <FadeIn direction="up">
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.75rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)' }}>My Applied Internships ({applications.length})</h3>
              {applications.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  <p>You have not submitted any internship applications yet.</p>
                  <motion.button 
                    className="btn-primary" 
                    style={{ marginTop: '1rem', padding: '0.6rem 1.25rem' }} 
                    onClick={() => setCurrentView && setCurrentView('internships')}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  >
                    Browse Internships & Apply →
                  </motion.button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {applications.map((app) => (
                    <motion.div 
                      key={app.id} 
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1.25rem' }}
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>{app.internship?.title || 'Virtual Internship Track'}</h4>
                        <span style={{
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8'
                        }}>
                          {app.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Domain: <strong>{app.internship?.domain || 'Software Engineering'}</strong></p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Full-Width Assigned Projects Section */}
        <FadeIn direction="up" delay={0.15}>
          <div className="command-card glass-panel" style={{ border: '1.5px solid var(--primary, #2563eb)', marginBottom: '1.75rem' }}>
            <div className="card-header-flex">
              <div>
                <h3 className="section-card-heading" style={{ marginBottom: '0.25rem', fontSize: '1.35rem' }}>Assigned Projects</h3>
                <div className="enrolled-track-badge">
                  <Code size={18} style={{ flexShrink: 0 }} />
                  <span>Enrolled Track: <strong>{primaryTrackTitle}</strong></span>
                </div>
              </div>

              <motion.button 
                type="button" 
                className="btn-table-action"
                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                onClick={() => setCurrentView && setCurrentView('project-guidelines')}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                View All Guidelines →
              </motion.button>
            </div>

            <div className="project-overview-bar">
              <span>Completed: <strong>{submissions.filter(s => s.status === 'APPROVED').length || data.projects?.completed || 0}</strong></span>
              <span>In Progress: <strong>{submissions.filter(s => s.status === 'PENDING' || s.status === 'REVISION_REQUESTED').length || (data.projectsList?.length || 3) - submissions.filter(s => s.status === 'APPROVED').length}</strong></span>
              <span>Submissions Logged: <strong>{submissions.length} live in Neon DB</strong></span>
            </div>

            <div className="projects-grid">
              {(data.projectsList || []).map((proj, idx) => {
                const existingSub = submissions.find(
                  (s) => s.projectTitle?.trim().toLowerCase() === proj.title?.trim().toLowerCase()
                );
                const unlocked = isProjectUnlocked(idx);
                const prevProj = idx > 0 ? projectsList[idx - 1] : null;

                return (
                  <motion.div 
                    key={proj.id} 
                    className="project-mini-card"
                    style={{
                      opacity: unlocked ? 1 : 0.72,
                      filter: unlocked ? 'none' : 'grayscale(0.15)',
                      border: !unlocked ? '1px solid rgba(255, 255, 255, 0.08)' : undefined
                    }}
                    whileHover={shouldReduceMotion || !unlocked ? {} : { y: -3 }}
                  >
                    <div className="proj-card-top">
                      <h4 className="proj-title" style={{ fontSize: '1.05rem' }}>{proj.title}</h4>
                      {!unlocked ? (
                        <span className="proj-status" style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          background: 'rgba(148, 163, 184, 0.15)',
                          color: '#94a3b8',
                          border: '1px solid rgba(148, 163, 184, 0.25)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Lock size={12} /> Locked
                        </span>
                      ) : existingSub ? (
                        <span className="proj-status" style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          background: existingSub.status === 'APPROVED' ? 'rgba(52, 211, 153, 0.18)' :
                                      existingSub.status === 'REJECTED' ? 'rgba(239, 68, 68, 0.18)' :
                                      existingSub.status === 'REVISION_REQUESTED' ? 'rgba(192, 132, 252, 0.18)' : 'rgba(245, 158, 11, 0.18)',
                          color: existingSub.status === 'APPROVED' ? '#34d399' :
                                 existingSub.status === 'REJECTED' ? '#f87171' :
                                 existingSub.status === 'REVISION_REQUESTED' ? '#c084fc' : '#fbbf24'
                        }}>
                          {existingSub.status === 'APPROVED' && 'Approved ✔'}
                          {existingSub.status === 'PENDING' && 'Pending Review ⏳'}
                          {existingSub.status === 'REVISION_REQUESTED' && 'Revision Requested ⚠️'}
                          {existingSub.status === 'REJECTED' && 'Rejected ❌'}
                        </span>
                      ) : (
                        <span className={`proj-status ${proj.status === 'Completed' ? 'status-comp' : 'status-prog'}`}>
                          {proj.status}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)', margin: '0.25rem 0 0.5rem' }}>
                      Domain: <strong>{proj.domain || data.welcome?.currentTrack || 'Frontend Development Internship'}</strong>
                    </div>

                    <span className="proj-tech" style={{ display: 'block', marginBottom: '0.6rem' }}>{proj.techStack}</span>

                    {!unlocked && prevProj && (
                      <div style={{
                        background: 'rgba(245, 158, 11, 0.08)',
                        border: '1px dashed rgba(245, 158, 11, 0.35)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        color: '#fbbf24',
                        marginBottom: '0.75rem',
                        lineHeight: '1.4'
                      }}>
                        🔒 <strong>Locked Task:</strong> Complete & get admin approval for <em>"{prevProj.title}"</em> first.
                      </div>
                    )}

                    {existingSub?.adminFeedback && (
                      <div style={{
                        background: 'rgba(192, 132, 252, 0.1)',
                        border: '1px dashed #c084fc',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        color: '#e9d5ff',
                        marginBottom: '0.75rem'
                      }}>
                        💡 <strong>Admin Note:</strong> {existingSub.adminFeedback}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
                      <motion.button 
                        type="button"
                        className="btn-secondary"
                        style={{ flex: 1, padding: '0.55rem 0.65rem', fontSize: '0.82rem', justifyContent: 'center' }}
                        onClick={() => setCurrentView && setCurrentView('project-guidelines', proj)}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      >
                        <span>Guidelines</span>
                      </motion.button>

                      <motion.button 
                        type="button"
                        className={unlocked ? "btn-primary" : "btn-secondary"}
                        disabled={!unlocked}
                        style={{
                          flex: 1,
                          padding: '0.55rem 0.65rem',
                          fontSize: '0.82rem',
                          justifyContent: 'center',
                          background: !unlocked ? 'rgba(255,255,255,0.03)' : existingSub?.status === 'APPROVED' ? 'rgba(52, 211, 153, 0.2)' : undefined,
                          borderColor: !unlocked ? 'rgba(255,255,255,0.1)' : existingSub?.status === 'APPROVED' ? '#34d399' : undefined,
                          color: !unlocked ? 'var(--text-muted)' : existingSub?.status === 'APPROVED' ? '#34d399' : undefined,
                          opacity: !unlocked ? 0.5 : 1,
                          cursor: !unlocked ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => {
                          if (!unlocked) {
                            alert(`🔒 Project Locked!\n\nYou must complete and get admin approval for "${prevProj?.title}" before working on this task.`);
                            return;
                          }
                          setSelectedTaskForSubmission(proj);
                          setSubmitModalOpen(true);
                        }}
                        whileHover={shouldReduceMotion || !unlocked ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion || !unlocked ? {} : { scale: 0.98 }}
                      >
                        <span>
                          {!unlocked && 'Locked 🔒'}
                          {unlocked && existingSub?.status === 'APPROVED' && 'Update Submission 🚀'}
                          {unlocked && existingSub?.status === 'PENDING' && 'Update Link 🚀'}
                          {unlocked && existingSub?.status === 'REVISION_REQUESTED' && 'Resubmit Task 🚀'}
                          {unlocked && existingSub?.status === 'REJECTED' && 'Resubmit Task 🚀'}
                          {unlocked && !existingSub && 'Submit Task 🚀'}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certificate Unlock & Application Banner Box */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.4rem 1.5rem',
              borderRadius: '16px',
              background: isCertApplied || allProjectsApproved 
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.12))'
                : 'rgba(15, 23, 42, 0.5)',
              border: `1.5px solid ${isCertApplied || allProjectsApproved ? '#34d399' : 'rgba(255, 255, 255, 0.12)'}`,
              boxShadow: isCertApplied || allProjectsApproved ? '0 0 25px rgba(52, 211, 153, 0.2)' : 'none',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              transition: 'all 0.3s ease'
            }}>
              {/* Header Row: Title & Badge on Left, Action Button on Right */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {allProjectsApproved ? <Unlock size={22} color="#34d399" /> : <Lock size={22} color="#94a3b8" />}
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>
                    Official Certificate & LOR Unlock Status
                  </h4>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: '800',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    background: isCertApplied || allProjectsApproved ? 'rgba(52, 211, 153, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    color: isCertApplied || allProjectsApproved ? '#34d399' : '#94a3b8',
                    border: `1px solid ${isCertApplied || allProjectsApproved ? '#34d399' : 'rgba(255, 255, 255, 0.15)'}`
                  }}>
                    {isCertApplied ? '✅ APPLICATION SUBMITTED' : allProjectsApproved ? '🎉 UNLOCKED & ELIGIBLE' : `LOCKED 🔒 (${approvedProjectsCount} / ${totalProjectsCount} Approved)`}
                  </span>
                </div>

                <motion.button 
                  type="button"
                  style={{
                    padding: '0.7rem 1.4rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '800',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: isCertApplied 
                      ? 'rgba(52, 211, 153, 0.2)' 
                      : allProjectsApproved 
                        ? 'linear-gradient(135deg, #10b981, #06b6d4)' 
                        : 'rgba(255, 255, 255, 0.06)',
                    color: isCertApplied ? '#34d399' : allProjectsApproved ? '#ffffff' : '#94a3b8',
                    border: `1.5px solid ${isCertApplied ? '#34d399' : allProjectsApproved ? '#34d399' : 'rgba(255, 255, 255, 0.15)'}`,
                    boxShadow: isCertApplied ? '0 0 15px rgba(52, 211, 153, 0.25)' : allProjectsApproved ? '0 4px 20px rgba(16, 185, 129, 0.4)' : 'none',
                    filter: allProjectsApproved || isCertApplied ? 'none' : 'blur(0.8px)',
                    opacity: allProjectsApproved || isCertApplied ? 1 : 0.6,
                    cursor: isCertApplied ? 'default' : allProjectsApproved ? 'pointer' : 'not-allowed',
                    transition: 'all 0.25s ease'
                  }}
                  onClick={() => {
                    if (isCertApplied) return;
                    if (!allProjectsApproved) {
                      alert(`🔒 Certificate Locked!\n\nYou have completed and got approval for ${approvedProjectsCount} out of ${totalProjectsCount} projects. Please complete all assigned projects and get admin approval to unlock your certificate.`);
                      return;
                    }
                    setPaymentModalOpen(true);
                  }}
                  whileHover={allProjectsApproved && !isCertApplied && !shouldReduceMotion ? { scale: 1.04 } : {}}
                  whileTap={allProjectsApproved && !isCertApplied && !shouldReduceMotion ? { scale: 0.96 } : {}}
                >
                  {isCertApplied ? <CheckCircle2 size={18} color="#34d399" /> : <Award size={18} />}
                  <span>{isCertApplied ? 'Applied ✔' : allProjectsApproved ? 'Apply for Certificate 🎓' : 'Apply for Certificate 🔒'}</span>
                </motion.button>
              </div>

              {/* Description Text */}
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                {isCertApplied
                  ? '🎉 Certificate Application Logged! Your official ISO 9001:2015 verified Certificate of Completion & LOR will be reviewed and sent to your email.'
                  : allProjectsApproved 
                    ? 'Awesome work! All assigned project deliverables have been reviewed and approved by admin. You are now eligible to claim your official Certificate of Completion & LOR.'
                    : `Complete all ${totalProjectsCount} assigned project tasks sequentially and get admin approval for each task to unblur and unlock your official certificate.`
                }
              </p>

              {/* Delivery Notice Bar (Full width strip at bottom when applied) */}
              {isCertApplied && (
                <div style={{
                  background: 'rgba(52, 211, 153, 0.08)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginTop: '0.2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', fontWeight: '700', color: '#34d399' }}>
                    <Clock size={16} color="#34d399" />
                    <span>Certificate & LOR will be provided within 24 to 48 hours</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: '600', color: '#38bdf8' }}>
                    <Mail size={15} color="#38bdf8" />
                    <span>Please check your registered email inbox ({user?.email || 'given email'})</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Side-by-Side Cards: Test Performance & ATS Score */}
        <div className="side-by-side-grid">
          
          {/* Test Performance Section */}
          <FadeIn direction="left" delay={0.2}>
            <div className="command-card glass-panel" style={{ height: '100%' }}>
              <h3 className="section-card-heading">Test Performance</h3>
              
              <div className="test-stats-row">
                <div className="test-stat-pill"><span>Attended:</span> <strong>{data.testPerformance.attended}</strong></div>
                <div className="test-stat-pill"><span>Passed:</span> <strong>{data.testPerformance.passed}</strong></div>
                <div className="test-stat-pill"><span>Average Score:</span> <strong>{data.testPerformance.averageScore}%</strong></div>
                <div className="test-stat-pill"><span>Highest Score:</span> <strong>{data.testPerformance.highestScore}%</strong></div>
              </div>

              {/* Bar Chart */}
              <div className="test-chart-container">
                <div className="chart-title">Recent Test Scores</div>
                <div className="chart-bars-flex">
                  {data.testPerformance.recentScores.map((item) => (
                    <div key={item.id} className="bar-item">
                      <span className="bar-val">{item.score}%</span>
                      <div className="bar-track" style={{ overflow: 'hidden' }}>
                        <motion.div 
                          className="bar-fill" 
                          initial={{ height: 0 }}
                          whileInView={{ height: `${item.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="bar-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Resume & ATS Score Section */}
          <FadeIn direction="right" delay={0.2}>
            <div className="command-card glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 className="section-card-heading" style={{ margin: 0 }}>Resume & ATS Score</h3>
                  
                  {/* AI Credits Badge */}
                  <div 
                    onClick={() => setAiLimitModalOpen(true)}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      background: aiProfile.customApiKey ? 'rgba(52, 211, 153, 0.18)' : aiProfile.credits > 0 ? 'rgba(56, 189, 248, 0.18)' : 'rgba(239, 68, 68, 0.18)',
                      border: `1px solid ${aiProfile.customApiKey ? '#34d399' : aiProfile.credits > 0 ? '#38bdf8' : '#ef4444'}`,
                      color: aiProfile.customApiKey ? '#34d399' : aiProfile.credits > 0 ? '#38bdf8' : '#ef4444',
                      padding: '0.25rem 0.65rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '800',
                      cursor: 'pointer' 
                    }}
                    title="Click to top-up AI credits or add custom Gemini API Key"
                  >
                    <Sparkles size={12} />
                    <span>
                      {aiProfile.customApiKey ? '⚡ Unlimited AI Active' : `⚡ ${aiProfile.credits} / 3 Free AI Uses Left`}
                    </span>
                  </div>
                </div>

                <div className="ats-widget-row">
                  <div className="ats-score-display">
                    <div className="ats-num-badge">
                      <AnimatedNumber value={aiProfile.history?.[0]?.score || data.ats?.score || 78} duration={1.2} />
                    </div>
                    <div className="ats-grade-text">
                      <strong>{aiProfile.history?.[0]?.grade || data.ats?.grade || 'Good'}</strong>
                      <span>{aiProfile.history?.[0]?.title || 'Latest Resume Scan'}</span>
                    </div>
                  </div>

                  <div className="ats-breakdown-column">
                    {(data.atsBreakdown || []).map((item, idx) => (
                      <div key={idx} className="ats-item-row">
                        <span className="ats-item-name">{item.name}</span>
                        <div className="ats-item-track" style={{ overflow: 'hidden' }}>
                          <motion.div 
                            className="ats-item-fill" 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
                          />
                        </div>
                        <span className="ats-item-val">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved AI Scans History List */}
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Saved Resume Scan History ({aiProfile.history?.length || 0})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '120px', overflowY: 'auto' }}>
                    {(aiProfile.history || []).map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.65rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.78rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Sparkles size={12} color="#38bdf8" />
                          <span style={{ color: '#f8fafc', fontWeight: '600' }}>{item.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ color: '#34d399', fontWeight: '800' }}>{item.score}%</span>
                          <span style={{ color: '#64748b', fontSize: '0.72rem' }}>{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ats-rec-box" style={{ marginTop: '1rem' }}>
                <Target size={18} color="#38bdf8" />
                <span>
                  <strong>Top Recommendation:</strong> Run a fresh ATS scan to optimize keywords before applying.
                </span>
                <motion.button 
                  type="button" 
                  className="btn-secondary btn-ats-cta"
                  onClick={() => setCurrentView && setCurrentView('ats-score')}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  Run ATS Scan →
                </motion.button>
              </div>
            </div>
          </FadeIn>

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
        defaultDomain={selectedTaskForSubmission}
        user={user}
        onClose={() => {
          setSubmitModalOpen(false);
          setSelectedTaskForSubmission(null);
        }}
        onSubmitSuccess={() => {
          fetchSubmissions();
        }}
      />

      <PaymentGatewayModal 
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        user={user}
        trackTitle={primaryTrackTitle}
        onPaymentSuccess={() => {
          handleApplyCertificate();
        }}
      />

      <AiLimitModal 
        isOpen={aiLimitModalOpen}
        onClose={() => setAiLimitModalOpen(false)}
        user={user}
        onSuccess={() => {
          // Refresh state
        }}
      />

    </div>
  );
}
