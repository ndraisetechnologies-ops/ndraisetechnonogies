import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import InternshipsPage, { ALL_INTERNSHIPS } from './pages/Internships/InternshipsPage';
import InternshipDetailPage from './pages/Internships/InternshipDetailPage';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AuthModal from './components/Modals/AuthModal';
import ApplyModal from './components/Modals/ApplyModal';
import { Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedInternship, setSelectedInternship] = useState(ALL_INTERNSHIPS[0]);
  const [user, setUser] = useState({ name: 'Nikhil Sharma', email: 'nikhil@example.com', role: 'student' });
  
  // Modals
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  
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
    setSelectedInternship(internship);
    setApplyModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome ${userData.name}! Successfully signed in.`);
    setCurrentView('student-dashboard');
  };

  const handleApplySuccess = (msg) => {
    showToast(msg);
  };

  return (
    <div className="app-container">
      {/* Top View Switcher Toolbar (Allowing instant toggle between all 5 designs shown in user image) */}
      <div className="view-switcher-bar">
        <div className="view-switcher-title">
          <Eye size={16} />
          <span>Switch Preview View: <strong>{currentView.toUpperCase()}</strong></span>
        </div>

        <div className="view-buttons">
          <button 
            className={`view-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            1. Home Landing Page
          </button>
          <button 
            className={`view-btn ${currentView === 'internships' ? 'active' : ''}`}
            onClick={() => setCurrentView('internships')}
          >
            2. Internships Catalog
          </button>
          <button 
            className={`view-btn ${currentView === 'detail' ? 'active' : ''}`}
            onClick={() => setCurrentView('detail')}
          >
            3. Internship Details
          </button>
          <button 
            className={`view-btn ${currentView === 'student-dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('student-dashboard')}
          >
            4. Student Dashboard
          </button>
          <button 
            className={`view-btn ${currentView === 'admin-dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('admin-dashboard')}
          >
            5. Admin Dashboard
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      {currentView !== 'student-dashboard' && currentView !== 'admin-dashboard' && (
        <Navbar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          openAuthModal={(mode) => setAuthModal({ isOpen: true, mode })}
          user={user}
        />
      )}

      {/* View Router */}
      <div className="main-content">
        {currentView === 'home' && (
          <Home 
            onSelectInternship={handleSelectInternship}
            onViewAllClick={() => setCurrentView('internships')}
            onGetStarted={() => setAuthModal({ isOpen: true, mode: 'register' })}
          />
        )}

        {currentView === 'internships' && (
          <InternshipsPage 
            onSelectInternship={handleSelectInternship}
          />
        )}

        {currentView === 'detail' && (
          <InternshipDetailPage 
            internship={selectedInternship}
            onBack={() => setCurrentView('internships')}
            onApplyClick={handleApplyClick}
            onShareClick={() => showToast('Internship link copied to clipboard!')}
          />
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
            setCurrentView={setCurrentView}
          />
        )}
      </div>

      {/* Main Footer */}
      {currentView !== 'student-dashboard' && currentView !== 'admin-dashboard' && (
        <Footer setCurrentView={setCurrentView} />
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
