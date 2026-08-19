import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Home, Code, Award, User, Settings, LogOut, CheckCircle2, 
  Target, Mail, Brain, Briefcase, FileCheck, Menu, X, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { studentDashboardData } from '../../data/studentDashboardData';
import { submissionAPI, internshipAPI, studentAPI } from '../../services/apiClient';
import OfferLetterModal from '../../components/Modals/OfferLetterModal';
import TaskSubmissionModal from '../../components/Modals/TaskSubmissionModal';
import { AnimatedNumber, StaggerContainer, StaggerItem, FadeIn } from '../../components/Motion/MotionUtils';
import './StudentDashboard.css';

export default function StudentDashboard({ user, onLogout, setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState(null);
  const shouldReduceMotion = useReducedMotion();

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
        
        {/* 1. Welcome Header */}
        <FadeIn direction="down" duration={0.4}>
          <div className="dashboard-header glass-panel">
            <div className="welcome-text">
              <h1>Welcome back, {user?.name || data.welcome.name} 👋</h1>
              <p>Here's your live career progress at NDRise.</p>
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
              onClick={() => handleMenuClick('certificates')}
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="summary-icon icon-teal"><Award size={22} /></div>
              <div className="summary-body">
                <span className="summary-title">CERTIFICATES</span>
                <div className="summary-num">
                  <AnimatedNumber value={dashboardMetrics.totalCertificates || 0} />
                </div>
                <span className="summary-subtext">Issued certificates</span>
              </div>
              <div className="summary-link">View Certificates →</div>
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
                  <AnimatedNumber value={data.overview.atsScore} /> <small style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 100</small>
                </div>
                <span className="summary-subtext">Grade: {data.overview.atsGrade}</span>
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
            <div className="card-header-flex" style={{ alignItems: 'flex-start' }}>
              <div>
                <h3 className="section-card-heading" style={{ marginBottom: '0.25rem', fontSize: '1.4rem' }}>Assigned Projects</h3>
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--primary, #2563eb)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Code size={18} />
                  <span>Enrolled Track: <strong>{primaryTrackTitle}</strong></span>
                </div>
              </div>

              <motion.button 
                type="button" 
                className="btn-table-action"
                style={{ fontSize: '0.85rem' }}
                onClick={() => setCurrentView && setCurrentView('project-guidelines')}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                View All Guidelines →
              </motion.button>
            </div>

            <div className="project-overview-bar" style={{ marginTop: '1rem', marginBottom: '1.25rem' }}>
              <span>Completed: <strong>{submissions.filter(s => s.status === 'APPROVED').length || data.projects?.completed || 0}</strong></span>
              <span>In Progress: <strong>{submissions.filter(s => s.status === 'PENDING' || s.status === 'REVISION_REQUESTED').length || (data.projectsList?.length || 3) - submissions.filter(s => s.status === 'APPROVED').length}</strong></span>
              <span>Submissions Logged: <strong>{submissions.length} live in Neon DB</strong></span>
            </div>

            <div className="projects-grid">
              {(data.projectsList || []).map((proj) => {
                const existingSub = submissions.find(
                  (s) => s.projectTitle?.trim().toLowerCase() === proj.title?.trim().toLowerCase()
                );
                const progressWidth = existingSub?.status === 'APPROVED' ? 100 : existingSub ? 60 : proj.progress;

                return (
                  <motion.div 
                    key={proj.id} 
                    className="project-mini-card"
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  >
                    <div className="proj-card-top">
                      <h4 className="proj-title" style={{ fontSize: '1.05rem' }}>{proj.title}</h4>
                      {existingSub ? (
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
                    
                    <div className="proj-bar-track" style={{ marginBottom: '0.75rem', overflow: 'hidden' }}>
                      <motion.div 
                        className="proj-bar-fill" 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressWidth}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: 'easeOut' }}
                        style={{
                          background: existingSub?.status === 'APPROVED' ? '#34d399' : undefined
                        }}
                      />
                    </div>

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

                    {existingSub?.fileUrl && (
                      <div style={{ marginBottom: '0.75rem', fontSize: '0.78rem' }}>
                        <a 
                          href={existingSub.fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontWeight: '600' }}
                        >
                          <span>Submitted Link</span>
                          <ExternalLink size={13} />
                        </a>
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
                        className="btn-primary"
                        style={{
                          flex: 1,
                          padding: '0.55rem 0.65rem',
                          fontSize: '0.82rem',
                          justifyContent: 'center',
                          background: existingSub?.status === 'APPROVED' ? 'rgba(52, 211, 153, 0.2)' : undefined,
                          borderColor: existingSub?.status === 'APPROVED' ? '#34d399' : undefined,
                          color: existingSub?.status === 'APPROVED' ? '#34d399' : undefined
                        }}
                        onClick={() => {
                          setSelectedTaskForSubmission(proj);
                          setSubmitModalOpen(true);
                        }}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      >
                        <span>
                          {existingSub?.status === 'APPROVED' && 'Update Submission 🚀'}
                          {existingSub?.status === 'PENDING' && 'Update Link 🚀'}
                          {existingSub?.status === 'REVISION_REQUESTED' && 'Resubmit Task 🚀'}
                          {existingSub?.status === 'REJECTED' && 'Resubmit Task 🚀'}
                          {!existingSub && 'Submit Task 🚀'}
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
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
            <div className="command-card glass-panel" style={{ height: '100%' }}>
              <h3 className="section-card-heading">Resume & ATS Score</h3>

              <div className="ats-widget-row">
                <div className="ats-score-display">
                  <div className="ats-num-badge">
                    <AnimatedNumber value={data.ats?.score || data.overview?.atsScore || 78} duration={1.2} />
                  </div>
                  <div className="ats-grade-text">
                    <strong>{data.ats?.grade || data.overview?.atsGrade || 'Good'}</strong>
                    <span>Your resume is performing well</span>
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

              <div className="ats-rec-box">
                <Target size={18} color="#38bdf8" />
                <span>
                  <strong>Top Recommendation:</strong> Add relevant skills and keywords from internships you are genuinely qualified for.
                </span>
                <motion.button 
                  type="button" 
                  className="btn-secondary btn-ats-cta"
                  onClick={() => setCurrentView && setCurrentView('ats-score')}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  <span>Improve ATS Score →</span>
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

    </div>
  );
}
