import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import InternshipsPage, { ALL_INTERNSHIPS } from './pages/Internships/InternshipsPage';
import InternshipDetailPage from './pages/Internships/InternshipDetailPage';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import VerifyCertificatePage from './pages/VerifyCertificate/VerifyCertificatePage';
import OfferLetterPage from './pages/OfferLetter/OfferLetterPage';
import MyCertificatesPage from './pages/MyCertificates/MyCertificatesPage';
import StudentReviewsPage from './pages/StudentReviews/StudentReviewsPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import TermsAndConditionsPage from './pages/TermsAndConditions/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy/PrivacyPolicyPage';
import CookiesPolicyPage from './pages/CookiesPolicy/CookiesPolicyPage';
import BrowseCoursesPage from './pages/BrowseCourses/BrowseCoursesPage';
import AtsScorePage from './pages/AtsScore/AtsScorePage';
import JobSearchPage from './pages/JobSearch/JobSearchPage';
import JobEmailBuilderPage from './pages/JobEmailBuilder/JobEmailBuilderPage';
import InterviewPrepPage from './pages/InterviewPrep/InterviewPrepPage';
import ProjectGuidelinesPage from './pages/ProjectGuidelines/ProjectGuidelinesPage';
import AuthPage from './pages/Auth/AuthPage';
import AuthModal from './components/Modals/AuthModal';
import ApplyModal from './components/Modals/ApplyModal';
import TaskGuidelinesModal from './components/Modals/TaskGuidelinesModal';
import TaskSubmissionModal from './components/Modals/TaskSubmissionModal';
import OfferLetterModal from './components/Modals/OfferLetterModal';
import PolicyModal from './components/Modals/PolicyModal';
import { CheckCircle2 } from 'lucide-react';
import { authAPI, setAuthToken } from './services/apiClient';
import { PageTransition } from './components/Motion/MotionUtils';
import './App.css';

const VIEW_TO_PATH = {
  'home': '/',
  'internships': '/internships',
  'browse-courses': '/courses',
  'ats-score': '/ats-score',
  'job-search': '/job-search',
  'job-email-builder': '/job-email-builder',
  'interview-preparation': '/interview-preparation',
  'project-guidelines': '/project-guidelines',
  'detail': '/internship-detail',
  'verify': '/verify',
  'offer-letter': '/offer-letter',
  'my-certificates': '/my-certificates',
  'reviews': '/reviews',
  'contact': '/contact',
  'terms': '/terms',
  'privacy': '/privacy',
  'cookies': '/cookies',
  'login': '/login',
  'register': '/register',
  'forgot-password': '/forgot-password',
  'admin-login': '/admin-login',
  'student-dashboard': '/student-dashboard',
  'admin-dashboard': '/admin-dashboard'
};

const PATH_TO_VIEW = Object.entries(VIEW_TO_PATH).reduce((acc, [view, path]) => {
  acc[path] = view;
  return acc;
}, {});

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin-login') return 'admin-login';
    if (path === '/admin-dashboard' || path.startsWith('/admin')) return 'admin-dashboard';
    if (path === '/student-dashboard' || path.startsWith('/student')) return 'student-dashboard';
    if (path === '/login') return 'login';
    if (path === '/register') return 'register';
    if (path === '/internships') return 'internships';
    if (path === '/courses') return 'browse-courses';
    if (path === '/verify') return 'verify';
    if (path === '/job-search') return 'job-search';
    if (path === '/job-email-builder') return 'job-email-builder';
    if (path === '/ats-score') return 'ats-score';
    if (path === '/interview-preparation') return 'interview-preparation';
    if (path === '/project-guidelines') return 'project-guidelines';
    if (path === '/offer-letter') return 'offer-letter';
    if (path === '/my-certificates') return 'my-certificates';
    if (path === '/reviews') return 'reviews';
    if (path === '/contact') return 'contact';
    if (path === '/terms') return 'terms';
    if (path === '/privacy') return 'privacy';
    if (path === '/cookies') return 'cookies';
    return PATH_TO_VIEW[path] || 'home';
  });
  const [selectedInternship, setSelectedInternship] = useState(ALL_INTERNSHIPS[0]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Synchronize browser address bar URL with currentView
  useEffect(() => {
    const targetPath = VIEW_TO_PATH[currentView] || '/';
    if (window.location.pathname.toLowerCase() !== targetPath.toLowerCase()) {
      window.history.pushState({ view: currentView }, '', targetPath);
    }
  }, [currentView]);

  // Listen for browser Back & Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const matchedView = PATH_TO_VIEW[path] || 'home';
      setCurrentView(matchedView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check backend session state on mount
  useEffect(() => {
    authAPI.getMe().then((res) => {
      if (res.success && res.user) {
        setUser(res.user);
      }
      setAuthLoading(false);
    }).catch(() => {
      setAuthLoading(false);
    });
  }, []);

  // Strict Server-Backed Route Guard for Admin & Student Views
  useEffect(() => {
    if (authLoading) return;

    const roleLower = user?.role?.toLowerCase();
    const isAdminUser = roleLower === 'admin' || roleLower === 'super_admin';

    // 1. Admin Dashboard Route Protection
    if (currentView === 'admin-dashboard') {
      if (!user) {
        setCurrentView('admin-login');
        showToast('Authentication required to access Admin Dashboard');
      } else if (!isAdminUser) {
        setCurrentView('student-dashboard');
        showToast('403 Forbidden: Student accounts cannot access the Admin Dashboard.');
      }
    }

    // 2. Student Dashboard Route Protection
    if (currentView === 'student-dashboard') {
      if (!user) {
        setCurrentView('login');
      } else if (isAdminUser) {
        setCurrentView('admin-dashboard');
      }
    }
  }, [currentView, user, authLoading]);
  
  // Theme management ('light' or 'dark')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modals
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [taskSubmissionModalOpen, setTaskSubmissionModalOpen] = useState(false);
  const [taskGuidelinesModalOpen, setTaskGuidelinesModalOpen] = useState(false);
  const [offerLetterModalOpen, setOfferLetterModalOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState({ isOpen: false, type: 'terms' });
  const [trackForTasks, setTrackForTasks] = useState(ALL_INTERNSHIPS[0]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock background body scroll when any modal is active
  const isAnyModalOpen = authModal.isOpen || applyModalOpen || taskSubmissionModalOpen || taskGuidelinesModalOpen || offerLetterModalOpen || policyModal.isOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  // Scroll window to top whenever view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);
  
  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyClick = (internship) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    if (internship) setSelectedInternship(internship);
    setApplyModalOpen(true);
  };

  const handleOpenTasksModal = (track, task) => {
    const activeTrack = track || selectedInternship;
    setTrackForTasks(activeTrack);
    setSelectedProject(task || { title: activeTrack?.title, domain: activeTrack?.title, desc: activeTrack?.description });
    setCurrentView('project-guidelines');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    if (user) {
      setCurrentView('internships');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAuthModal({ isOpen: true, mode: 'login' });
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome ${userData.name}! Successfully signed in.`);
    const roleLower = userData?.role?.toLowerCase();
    if (roleLower === 'admin' || roleLower === 'super_admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('student-dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplySuccess = (msg) => {
    showToast(msg);
  };

  const scrollToVerifier = () => {
    setCurrentView('verify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOfferLetterPage = () => {
    setCurrentView('offer-letter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMyCertificatesPage = () => {
    setCurrentView('my-certificates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReviewsPage = () => {
    setCurrentView('reviews');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAuthView = currentView === 'login' || currentView === 'register' || currentView === 'forgot-password' || currentView === 'admin-login';

  return (
    <div className="app-container">
      {/* Main Navbar */}
      {currentView !== 'student-dashboard' && currentView !== 'admin-dashboard' && !isAuthView && (
        <Navbar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          openAuthModal={(mode) => setCurrentView(mode || 'login')}
          user={user}
          onLogout={async () => {
            try { await authAPI.logout(); } catch (e) {}
            setAuthToken(null);
            setUser(null);
            setCurrentView('home');
            showToast('Logged out successfully');
          }}
          theme={theme}
          toggleTheme={toggleTheme}
          onVerifyClick={scrollToVerifier}
          onSubmitTaskClick={() => setTaskSubmissionModalOpen(true)}
          onOfferLetterClick={openOfferLetterPage}
          onCertificatesClick={openMyCertificatesPage}
          onReviewsClick={openReviewsPage}
          showToast={showToast}
        />
      )}

      {/* View Router with Fast Page Transition */}
      <div className="main-content">
        <AnimatePresence mode="wait">
          {isAuthView && (
            <PageTransition keyId="auth-page">
              <AuthPage 
                initialMode={currentView}
                onAuthSuccess={(userData) => {
                  handleAuthSuccess(userData);
                }}
                onGoHome={() => setCurrentView('home')}
                showToast={showToast}
              />
            </PageTransition>
          )}

          {currentView === 'home' && (
            <PageTransition keyId="home">
              <Home 
                onSelectInternship={handleSelectInternship}
                onApplyClick={handleApplyClick}
                onViewAllClick={() => setCurrentView('internships')}
                onGetStarted={handleGetStarted}
                onVerifyClick={scrollToVerifier}
                onSubmitTaskClick={() => setTaskSubmissionModalOpen(true)}
                onOpenTasksModal={handleOpenTasksModal}
              />
            </PageTransition>
          )}

          {currentView === 'internships' && (
            <PageTransition keyId="internships">
              <InternshipsPage 
                onSelectInternship={handleSelectInternship}
                onApplyClick={handleApplyClick}
                onOpenTasksModal={handleOpenTasksModal}
              />
            </PageTransition>
          )}

          {currentView === 'browse-courses' && (
            <PageTransition keyId="browse-courses">
              <BrowseCoursesPage 
                user={user}
                onRequireAuth={() => setCurrentView('register')}
                onSelectCourse={(course) => {
                  showToast(`Selected course: ${course.title}`);
                }}
              />
            </PageTransition>
          )}

          {currentView === 'ats-score' && (
            <PageTransition keyId="ats-score">
              <AtsScorePage 
                setCurrentView={setCurrentView}
                user={user}
                onRequireAuth={() => setCurrentView('register')}
              />
            </PageTransition>
          )}

          {(currentView === 'job-email-builder' || currentView === 'job-search') && (
            <PageTransition keyId="job-search">
              <JobSearchPage 
                setCurrentView={setCurrentView}
                user={user}
                onRequireAuth={() => setCurrentView('register')}
              />
            </PageTransition>
          )}

          {currentView === 'interview-preparation' && (
            <PageTransition keyId="interview-prep">
              <InterviewPrepPage 
                setCurrentView={setCurrentView}
                user={user}
                onRequireAuth={() => setCurrentView('register')}
              />
            </PageTransition>
          )}

          {currentView === 'project-guidelines' && (
            <PageTransition keyId="project-guidelines">
              <ProjectGuidelinesPage 
                project={selectedProject}
                onBack={() => setCurrentView('student-dashboard')}
                onSubmitTaskClick={() => setTaskSubmissionModalOpen(true)}
                setCurrentView={setCurrentView}
              />
            </PageTransition>
          )}

          {currentView === 'detail' && (
            <PageTransition keyId="detail">
              <InternshipDetailPage 
                internship={selectedInternship}
                onBack={() => setCurrentView('internships')}
                onApplyClick={handleApplyClick}
                onShareClick={() => showToast('Internship link copied to clipboard!')}
                onOpenTasksModal={handleOpenTasksModal}
              />
            </PageTransition>
          )}

          {currentView === 'verify' && (
            <PageTransition keyId="verify">
              <VerifyCertificatePage />
            </PageTransition>
          )}

          {currentView === 'offer-letter' && (
            <PageTransition keyId="offer-letter">
              <OfferLetterPage user={user} />
            </PageTransition>
          )}

          {currentView === 'my-certificates' && (
            <PageTransition keyId="my-certificates">
              <MyCertificatesPage 
                user={user} 
                onExploreClick={() => setCurrentView('internships')}
                onSubmitTasksClick={() => setTaskSubmissionModalOpen(true)}
              />
            </PageTransition>
          )}

          {currentView === 'reviews' && (
            <PageTransition keyId="reviews">
              <StudentReviewsPage user={user} setCurrentView={setCurrentView} />
            </PageTransition>
          )}

          {currentView === 'contact' && (
            <PageTransition keyId="contact">
              <ContactUsPage user={user} setCurrentView={setCurrentView} />
            </PageTransition>
          )}

          {currentView === 'terms' && (
            <PageTransition keyId="terms">
              <TermsAndConditionsPage setCurrentView={setCurrentView} />
            </PageTransition>
          )}

          {currentView === 'privacy' && (
            <PageTransition keyId="privacy">
              <PrivacyPolicyPage setCurrentView={setCurrentView} />
            </PageTransition>
          )}

          {currentView === 'cookies' && (
            <PageTransition keyId="cookies">
              <CookiesPolicyPage setCurrentView={setCurrentView} />
            </PageTransition>
          )}

          {currentView === 'student-dashboard' && (
            <PageTransition keyId="student-dashboard">
              <StudentDashboard 
                user={user}
                onLogout={() => {
                  setUser(null);
                  setCurrentView('home');
                  showToast('Logged out successfully');
                }}
                setCurrentView={setCurrentView}
              />
            </PageTransition>
          )}

          {currentView === 'admin-dashboard' && (
            <PageTransition keyId="admin-dashboard">
              <AdminDashboard 
                user={user}
                setCurrentView={setCurrentView}
                onLogout={async () => {
                  try { await authAPI.logout(); } catch (e) {}
                  setAuthToken(null);
                  setUser(null);
                  setCurrentView('home');
                  showToast('Logged out successfully');
                }}
              />
            </PageTransition>
          )}
        </AnimatePresence>
      </div>

      {/* Main Footer */}
      {currentView !== 'student-dashboard' && currentView !== 'admin-dashboard' && !isAuthView && (
        <Footer 
          setCurrentView={setCurrentView} 
          user={user}
          onAuthClick={(mode) => setCurrentView(mode || 'login')}
        />
      )}

      {/* Modals */}
      <AuthModal 
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onLoginSuccess={handleAuthSuccess}
      />

      <ApplyModal 
        isOpen={applyModalOpen}
        internship={selectedInternship}
        onClose={() => setApplyModalOpen(false)}
        onSubmitSuccess={handleApplySuccess}
      />

      <TaskGuidelinesModal 
        isOpen={taskGuidelinesModalOpen}
        internship={trackForTasks}
        onClose={() => setTaskGuidelinesModalOpen(false)}
        onSubmitTaskClick={() => setTaskSubmissionModalOpen(true)}
        onOpenFullGuidelines={(task) => handleOpenTasksModal(trackForTasks, task)}
      />

      <TaskSubmissionModal 
        isOpen={taskSubmissionModalOpen}
        defaultDomain={trackForTasks}
        onClose={() => setTaskSubmissionModalOpen(false)}
        onSubmitSuccess={(msg) => showToast(msg)}
      />

      <OfferLetterModal 
        isOpen={offerLetterModalOpen}
        onClose={() => setOfferLetterModalOpen(false)}
        user={user}
        domainName="Web Development Virtual Internship"
      />

      <PolicyModal 
        isOpen={policyModal.isOpen}
        type={policyModal.type}
        onClose={() => setPolicyModal({ isOpen: false, type: 'terms' })}
      />

      {/* Toast Notification with AnimatePresence */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            className="toast-container"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="toast">
              <CheckCircle2 size={20} color="#34d399" />
              <span>{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
