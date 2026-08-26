import React, { useState, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { authAPI, setAuthToken } from '../../services/apiClient';
import './Modals.css';

export default function AuthModal({ isOpen, mode, onClose, onLoginSuccess }) {
  const [currentMode, setCurrentMode] = useState(mode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setCurrentMode(mode || 'login');
    setErrorMessage('');
  }, [mode, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      let res;
      if (currentMode === 'admin-login') {
        res = await authAPI.adminLogin({ email, password });
      } else if (currentMode === 'register') {
        res = await authAPI.register({ name, email, password });
      } else {
        res = await authAPI.login({ email, password });
      }

      if (res.success && res.user) {
        const userRole = (res.user.role || '').toUpperCase();

        if (currentMode === 'admin-login' && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
          setAuthToken(null);
          setErrorMessage('Access denied: Student accounts cannot log in through the Admin Security Portal.');
          return;
        }

        if (currentMode !== 'admin-login' && (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN')) {
          setAuthToken(null);
          setErrorMessage('Admin accounts must log in via the Admin Security Portal.');
          return;
        }

        if (res.token) {
          setAuthToken(res.token);
        }

        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>

            <div className="modal-header">
              <h3 className="modal-title">
                {currentMode === 'admin-login'
                  ? 'Admin Security Portal'
                  : currentMode === 'login'
                  ? 'Welcome Back'
                  : 'Create Account'}
              </h3>
              <p className="modal-subtitle">
                {currentMode === 'admin-login'
                  ? 'Authorized ND Raise Administrator Sign In'
                  : currentMode === 'login'
                  ? 'Login to access your internships & dashboard'
                  : 'Join ND Raise Technologies to start learning'}
              </p>
            </div>

            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ShieldAlert size={16} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <form className="modal-form" onSubmit={handleSubmit}>
              {currentMode === 'register' && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nikhil Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <motion.button 
                type="submit" 
                className="btn-primary form-submit-btn" 
                disabled={loading}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {loading
                  ? 'Verifying...'
                  : currentMode === 'admin-login'
                  ? 'Sign In to Admin Portal'
                  : currentMode === 'login'
                  ? 'Sign In to Dashboard'
                  : 'Register Now'}
              </motion.button>
            </form>

            <div className="modal-switch">
              {currentMode === 'login' && (
                <>
                  Don't have an account?{' '}
                  <span className="modal-switch-action" onClick={() => setCurrentMode('register')}>
                    Register
                  </span>{' '}
                  |{' '}
                  <span className="modal-switch-action" onClick={() => setCurrentMode('admin-login')}>
                    Admin Portal
                  </span>
                </>
              )}
              {currentMode === 'register' && (
                <>
                  Already registered?{' '}
                  <span className="modal-switch-action" onClick={() => setCurrentMode('login')}>
                    Sign In
                  </span>
                </>
              )}
              {currentMode === 'admin-login' && (
                <>
                  Student Sign In?{' '}
                  <span className="modal-switch-action" onClick={() => setCurrentMode('login')}>
                    Student Portal
                  </span>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
