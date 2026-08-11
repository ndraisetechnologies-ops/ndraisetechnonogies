import React, { useState } from 'react';
import { 
  LayoutDashboard, Home, Code, Award, User, Settings, LogOut, CheckCircle2, 
  Target, Mail, Brain, Briefcase, FileCheck 
} from 'lucide-react';
import { studentDashboardData } from '../../data/studentDashboardData';
import OfferLetterModal from '../../components/Modals/OfferLetterModal';
import TaskSubmissionModal from '../../components/Modals/TaskSubmissionModal';
import './StudentDashboard.css';

export default function StudentDashboard({ user, onLogout, setCurrentView }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState(null);

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

  return (
    <div className="dashboard-layout">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        
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
                  return (
                    <li
                      key={item.id}
                      className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <div className="menu-item logout-menu-item" onClick={onLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="dashboard-main">
        
        {/* 1. Welcome Header */}
        <div className="dashboard-header glass-panel">
          <div className="welcome-text">
            <h1>Welcome back, {user?.name || data.welcome.name} 👋</h1>
            <p>Here's your career progress at NDRise.</p>
            <div className="header-meta-pills">
            </div>
          </div>
        </div>

        {/* 2. Career Overview Summary Cards Row */}
        <div className="career-overview-grid">
          <div className="summary-card glass-panel" onClick={() => handleMenuClick('applications')}>
            <div className="summary-icon icon-blue"><Briefcase size={22} /></div>
            <div className="summary-body">
              <span className="summary-title">INTERNSHIPS APPLIED</span>
              <div className="summary-num">{data.overview.applied}</div>
              <span className="summary-subtext">↑ {data.overview.appliedThisMonth} this month</span>
            </div>
            <div className="summary-link">View Applications →</div>
          </div>

          <div className="summary-card glass-panel" onClick={() => handleMenuClick('my-internships')}>
            <div className="summary-icon icon-emerald"><CheckCircle2 size={22} /></div>
            <div className="summary-body">
              <span className="summary-title">INTERNSHIPS COMPLETED</span>
              <div className="summary-num">{data.overview.completed}</div>
              <span className="summary-subtext">{data.overview.active} currently active</span>
            </div>
            <div className="summary-link">View Journey →</div>
          </div>

          <div className="summary-card glass-panel" onClick={() => handleMenuClick('tests')}>
            <div className="summary-icon icon-purple"><FileCheck size={22} /></div>
            <div className="summary-body">
              <span className="summary-title">TESTS ATTENDED</span>
              <div className="summary-num">{data.overview.testsAttended}</div>
              <span className="summary-subtext">Average Score: {data.overview.averageTestScore}%</span>
            </div>
            <div className="summary-link">View Test Results →</div>
          </div>

          <div className="summary-card glass-panel" onClick={() => handleMenuClick('projects')}>
            <div className="summary-icon icon-amber"><Code size={22} /></div>
            <div className="summary-body">
              <span className="summary-title">PROJECTS COMPLETED</span>
              <div className="summary-num">{data.overview.projectsCompleted}</div>
              <span className="summary-subtext">{data.overview.projectsInProgress} in progress</span>
            </div>
            <div className="summary-link">View Projects →</div>
          </div>

          <div className="summary-card glass-panel" onClick={() => handleMenuClick('certificates')}>
            <div className="summary-icon icon-teal"><Award size={22} /></div>
            <div className="summary-body">
              <span className="summary-title">CERTIFICATES</span>
              <div className="summary-num">{data.overview.totalCertificates}</div>
              <span className="summary-subtext">{data.overview.internshipCertificates} internship • {data.overview.courseCertificates} course</span>
            </div>
            <div className="summary-link">View Certificates →</div>
          </div>

          <div className="summary-card glass-panel" onClick={() => handleMenuClick('ats-score')}>
            <div className="summary-icon icon-sky"><Target size={22} /></div>
            <div className="summary-body">
              <span className="summary-title">ATS SCORE</span>
              <div className="summary-num">{data.overview.atsScore} <small style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 100</small></div>
              <span className="summary-subtext">Grade: {data.overview.atsGrade}</span>
            </div>
            <div className="summary-link">Improve ATS →</div>
          </div>

        </div>

        {/* Full-Width Assigned Projects Section */}
        <div className="command-card glass-panel" style={{ border: '1.5px solid var(--primary, #2563eb)', marginBottom: '1.75rem' }}>
          <div className="card-header-flex" style={{ alignItems: 'flex-start' }}>
            <div>
              <h3 className="section-card-heading" style={{ marginBottom: '0.25rem', fontSize: '1.4rem' }}>Assigned Projects</h3>
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--primary, #2563eb)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code size={18} />
                <span>Selected Track: <strong>{data.welcome?.currentTrack || data.currentInternship?.title || 'Frontend Development Internship'}</strong></span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-table-action"
              style={{ fontSize: '0.85rem' }}
              onClick={() => setCurrentView && setCurrentView('project-guidelines')}
            >
              View All Guidelines →
            </button>
          </div>

          <div className="project-overview-bar" style={{ marginTop: '1rem', marginBottom: '1.25rem' }}>
            <span>Completed: <strong>{data.projects?.completed || data.overview?.projectsCompleted || 8}</strong></span>
            <span>In Progress: <strong>{data.projects?.inProgress || data.overview?.projectsInProgress || 2}</strong></span>
            <span>Overall Progress: <strong>{data.projects?.progressPercent || data.overview?.projectProgressPercent || 80}%</strong></span>
          </div>

          <div className="projects-grid">
            {(data.projectsList || []).map((proj) => (
              <div key={proj.id} className="project-mini-card">
                <div className="proj-card-top">
                  <h4 className="proj-title" style={{ fontSize: '1.05rem' }}>{proj.title}</h4>
                  <span className={`proj-status ${proj.status === 'Completed' ? 'status-comp' : 'status-prog'}`}>
                    {proj.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)', margin: '0.25rem 0 0.5rem' }}>
                  Domain: <strong>{proj.domain || data.welcome?.currentTrack || 'Frontend Development Internship'}</strong>
                </div>

                <span className="proj-tech" style={{ display: 'block', marginBottom: '0.6rem' }}>{proj.techStack}</span>
                
                <div className="proj-bar-track" style={{ marginBottom: '1rem' }}>
                  <div className="proj-bar-fill" style={{ width: `${proj.progress}%` }}></div>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.75rem' }}>
                  <button 
                    type="button"
                    className="btn-secondary"
                    style={{ flex: 1, padding: '0.55rem 0.65rem', fontSize: '0.82rem', justifyContent: 'center' }}
                    onClick={() => setCurrentView && setCurrentView('project-guidelines', proj)}
                  >
                    <span>View Guidelines</span>
                  </button>

                  <button 
                    type="button"
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.55rem 0.65rem', fontSize: '0.82rem', justifyContent: 'center' }}
                    onClick={() => {
                      setSelectedTaskForSubmission(proj);
                      setSubmitModalOpen(true);
                    }}
                  >
                    <span>Submit Task 🚀</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side-by-Side Cards: Test Performance & ATS Score */}
        <div className="side-by-side-grid">
          
          {/* Test Performance Section */}
          <div className="command-card glass-panel">
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
                    <div className="bar-track">
                      <div className="bar-fill" style={{ height: `${item.score}%` }}></div>
                    </div>
                    <span className="bar-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume & ATS Score Section */}
          <div className="command-card glass-panel">
            <h3 className="section-card-heading">Resume & ATS Score</h3>

            <div className="ats-widget-row">
              <div className="ats-score-display">
                <div className="ats-num-badge">{data.ats?.score || data.overview?.atsScore || 78}</div>
                <div className="ats-grade-text">
                  <strong>{data.ats?.grade || data.overview?.atsGrade || 'Good'}</strong>
                  <span>Your resume is performing well</span>
                </div>
              </div>

              <div className="ats-breakdown-column">
                {(data.atsBreakdown || []).map((item, idx) => (
                  <div key={idx} className="ats-item-row">
                    <span className="ats-item-name">{item.name}</span>
                    <div className="ats-item-track">
                      <div className="ats-item-fill" style={{ width: `${item.score}%` }}></div>
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
              <button 
                type="button" 
                className="btn-secondary btn-ats-cta"
                onClick={() => setCurrentView && setCurrentView('ats-score')}
              >
                <span>Improve ATS Score →</span>
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
        defaultDomain={selectedTaskForSubmission || { title: 'Web Development (4-Week)' }}
        onClose={() => setSubmitModalOpen(false)}
        onSubmitSuccess={(msg) => alert(msg)}
      />

    </div>
  );
}
