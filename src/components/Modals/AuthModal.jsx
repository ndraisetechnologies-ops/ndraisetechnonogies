import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User } from 'lucide-react';
import './Modals.css';

export default function AuthModal({ isOpen, mode, onClose, onLoginSuccess }) {
  const [currentMode, setCurrentMode] = useState(mode || 'login');
  const [email, setEmail] = useState('nikhil@example.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Nikhil Sharma');

  useEffect(() => {
    setCurrentMode(mode || 'login');
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: currentMode === 'register' ? name : 'Nikhil Sharma',
      email: email,
      role: 'student'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-header">
          <h3 className="modal-title">
            {currentMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h3>
          <p className="modal-subtitle">
            {currentMode === 'login' 
              ? 'Login to access your internships & dashboard' 
              : 'Join ND Raise Technologies to start learning'}
          </p>
        </div>

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

          <button type="submit" className="btn-primary form-submit-btn">
            {currentMode === 'login' ? 'Sign In to Dashboard' : 'Register Now'}
          </button>
        </form>

        <div className="modal-switch">
          {currentMode === 'login' ? (
            <>Don't have an account? <span className="modal-switch-action" onClick={() => setCurrentMode('register')}>Register</span></>
          ) : (
            <>Already registered? <span className="modal-switch-action" onClick={() => setCurrentMode('login')}>Sign In</span></>
          )}
        </div>
      </div>
    </div>
  );
}
