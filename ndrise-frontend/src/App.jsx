import React, { useState, useEffect } from 'react';
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
import JobEmailBuilderPage from './pages/JobEmailBuilder/JobEmailBuilderPage';
import InterviewPrepPage from './pages/InterviewPrep/InterviewPrepPage';
import ProjectGuidelinesPage from './pages/ProjectGuidelines/ProjectGuidelinesPage';
import AuthModal from './components/Modals/AuthModal';
import ApplyModal from './components/Modals/ApplyModal';
import TaskGuidelinesModal from './components/Modals/TaskGuidelinesModal';
import TaskSubmissionModal from './components/Modals/TaskSubmissionModal';
import OfferLetterModal from './components/Modals/OfferLetterModal';
import PolicyModal from './components/Modals/PolicyModal';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { authAPI, setAuthToken, internshipAPI } from './services/apiClient';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/admin')) return 'admin-dashboard';
    if (path.startsWith('/student')) return 'student-dashboard';
    return 'home';
  });
  const [selectedInternship, setSelectedInternship] = useState(ALL_INTERNSHIPS[0]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

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

    // 1. Admin Dashboard Route Protection
    if (currentView === 'admin-dashboard') {
      if (!user) {
        // Unauthenticated user -> redirect to home & open login modal
        setCurrentView('home');
        setAuthModal({ isOpen: true, mode: 'login' });
        showToast('Authentication required to access Admin Dashboard');
      } else if (user.role?.toUpperCase() !== 'ADMIN' && user.role !== 'admin' && user.role !== 'super_admin') {
        // Student attempting /admin -> 403 Forbidden redirect to student dashboard
        setCurrentView('student-dashboard');
        showToast('403 Forbidden: Student accounts cannot access the Admin Dashboard.');
      }
    }

    // 2. Student Dashboard Route Protection
    if (currentView === 'student-dashboard' && !user) {
      setCurrentView('home');
      setAuthModal({ isOpen: true, mode: 'login' });
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
    setCurrentView('internships');
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

  return (
    <div className="app-container">
      {/* Main Navbar */}
      {currentView !== 'student-dashboard' && currentView !== 'admin-dashboard' && (
        <Navbar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          openAuthModal={(mode) => setAuthModal({ isOpen: true, mode })}
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

      {/* View Router */}
      <div className="main-content">
        {currentView === 'home' && (
          <Home 
            onSelectInternship={handleSelectInternship}
            onApplyClick={handleApplyClick}
            onViewAllClick={() => setCurrentView('internships')}
            onGetStarted={handleGetStarted}
            onVerifyClick={scrollToVerifier}
            onSubmitTaskClick={() => setTaskSubmissionModalOpen(true)}
            onOpenTasksModal={handleOpenTasksModal}
          />
        )}

        {currentView === 'internships' && (
          <InternshipsPage 
            onSelectInternship={handleSelectInternship}
            onApplyClick={handleApplyClick}
            onOpenTasksModal={handleOpenTasksModal}
          />
        )}

        {currentView === 'browse-courses' && (
          <BrowseCoursesPage 
            user={user}
            onRequireAuth={() => setAuthModal({ isOpen: true, mode: 'register' })}
            onSelectCourse={(course) => {
              showToast(`Selected course: ${course.title}`);
            }}
          />
        )}

        {currentView === 'ats-score' && (
          <AtsScorePage 
            setCurrentView={setCurrentView}
            user={user}
            onRequireAuth={() => setAuthModal({ isOpen: true, mode: 'register' })}
          />
        )}

        {currentView === 'job-email-builder' && (
          <JobEmailBuilderPage 
            setCurrentView={setCurrentView}
            user={user}
            onRequireAuth={() => setAuthModal({ isOpen: true, mode: 'register' })}
          />
        )}

        {currentView === 'interview-preparation' && (
          <InterviewPrepPage 
            setCurrentView={setCurrentView}
            user={user}
            onRequireAuth={() => setAuthModal({ isOpen: true, mode: 'register' })}
          />
        )}

        {currentView === 'project-guidelines' && (
          <ProjectGuidelinesPage 
            project={selectedProject}
            onBack={() => setCurrentView('student-dashboard')}
            onSubmitTaskClick={() => setTaskSubmissionModalOpen(true)}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'detail' && (
          <InternshipDetailPage 
            internship={selectedInternship}
            onBack={() => setCurrentView('internships')}
            onApplyClick={handleApplyClick}
            onShareClick={() => showToast('Internship link copied to clipboard!')}
            onOpenTasksModal={handleOpenTasksModal}
          />
        )}

        {currentView === 'verify' && (
          <VerifyCertificatePage />
        )}

        {currentView === 'offer-letter' && (
          <OfferLetterPage user={user} />
        )}

        {currentView === 'my-certificates' && (
          <MyCertificatesPage 
            user={user} 
            onExploreClick={() => setCurrentView('internships')}
            onSubmitTasksClick={() => setTaskSubmissionModalOpen(true)}
          />
        )}

        {currentView === 'reviews' && (
          <StudentReviewsPage user={user} setCurrentView={setCurrentView} />
        )}

        {currentView === 'contact' && (
          <ContactUsPage user={user} setCurrentView={setCurrentView} />
        )}

        {currentView === 'terms' && (
          <TermsAndConditionsPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'cookies' && (
          <CookiesPolicyPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'student-dashboard' && (
          <StudentDashboard 
            user={user}
            onLogout={() => {
              setUser(null);
              setCurrentView('home');
              showToast('Logged out successfully');
            }}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'admin-dashboard' && (
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
        )}
      </div>

      {/* Main Footer */}
      {currentView !== 'student-dashboard' && currentView !== 'admin-dashboard' && (
        <Footer 
          setCurrentView={setCurrentView} 
          user={user}
          onAuthClick={(mode) => setAuthModal({ isOpen: true, mode })}
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

      {/* Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={20} color="#34d399" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
