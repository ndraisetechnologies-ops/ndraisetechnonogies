import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { authAPI, setAuthToken } from '../../services/apiClient';
import AnimatedCharacters from './AnimatedCharacters';
import './AuthPage.css';

export default function AuthPage({ initialMode = 'login', onAuthSuccess, onGoHome, showToast }) {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'forgot-password', 'admin-login'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Track focused field for 3D animated character tracking / turning face away!
  const [focusedField, setFocusedField] = useState(null); // 'email', 'username', 'password'

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password sub-step: 'request' or 'reset'
  const [forgotStep, setForgotStep] = useState('request');

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage('');
    setSuccessMessage('');
  }, [initialMode]);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const res = await authAPI.register({ name, email, password });
        if (res.token) setAuthToken(res.token);
        if (res.success && res.user) {
          if (showToast) showToast(`Welcome ${res.user.name}! Account created successfully.`);
          onAuthSuccess(res.user);
        } else {
          setErrorMessage(res.error || 'Failed to create account.');
        }
      } else if (mode === 'admin-login') {
        const res = await authAPI.adminLogin({ email, password });
        if (res.success && res.user) {
          const userRole = (res.user.role || '').toUpperCase();
          if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
            setAuthToken(null);
            setErrorMessage('Access denied: Student accounts cannot log in through the Admin Security Portal.');
            return;
          }
          if (res.token) setAuthToken(res.token);
          if (showToast) showToast('Welcome Admin!');
          onAuthSuccess(res.user);
        } else {
          setErrorMessage(res.error || 'Invalid admin credentials.');
        }
      } else if (mode === 'forgot-password') {
        if (forgotStep === 'request') {
          const res = await authAPI.forgotPassword({ email });
          if (res.success) {
            setSuccessMessage(res.message || 'Password reset request processed.');
            setForgotStep('reset');
          } else {
            setErrorMessage(res.error || 'Could not find account with that email.');
          }
        } else {
          const res = await authAPI.resetPassword({ email, newPassword });
          if (res.success) {
            setSuccessMessage('Password updated successfully! You can now log in.');
            setTimeout(() => {
              setMode('login');
              setForgotStep('request');
              setSuccessMessage('');
            }, 2000);
          } else {
            setErrorMessage(res.error || 'Failed to reset password.');
          }
        }
      } else {
        // Standard Student Login
        const res = await authAPI.login({ email, password });
        if (res.success && res.user) {
          const userRole = (res.user.role || '').toUpperCase();
          if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
            setAuthToken(null);
            setErrorMessage('Admin accounts must log in via the Admin Security Portal.');
            return;
          }
          if (res.token) setAuthToken(res.token);
          if (showToast) showToast(`Welcome back, ${res.user.name}!`);
          onAuthSuccess(res.user);
        } else {
          setErrorMessage(res.error || 'Invalid email or password.');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'An authentication error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setErrorMessage('');
      try {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const googleUser = await userInfoRes.json();

        if (!googleUser || !googleUser.email) {
          throw new Error('Could not retrieve account details from Google.');
        }

        const res = await authAPI.googleAuth({
          email: googleUser.email,
          name: googleUser.name || googleUser.given_name || googleUser.email.split('@')[0],
          avatar: googleUser.picture || '/student-avatar.svg'
        });

        if (res.success && res.user) {
          const userRole = (res.user.role || '').toUpperCase();
          if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
            setAuthToken(null);
            setErrorMessage('Admin accounts must log in via the Admin Security Portal.');
            return;
          }
          if (res.token) setAuthToken(res.token);
          if (showToast) showToast(`Signed in with Google as ${res.user.email}`);
          onAuthSuccess(res.user);
        } else {
          setErrorMessage(res.error || 'Google authentication failed.');
        }
      } catch (err) {
        setErrorMessage(err.message || 'Google Auth service error.');
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
      setErrorMessage('Google Sign-In was cancelled or failed.');
    }
  });

  const handleGoogleAuth = () => {
    googleLogin();
  };


  const activeTextLength = focusedField === 'username' ? name.length : email.length;

  return (
    <div className="auth-full-page">
      
      {/* Ambient Radial Glow Spotlights matching site theme */}
      <div className="auth-ambient-bg">
        <div className="ambient-spotlight spotlight-blue" />
        <div className="ambient-spotlight spotlight-purple" />
        <div className="ambient-spotlight spotlight-cyan" />
      </div>

      {/* Floating Back to Home Button */}
      <button className="auth-floating-back-btn" onClick={onGoHome} title="Back to Home" aria-label="Back to Home">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>

      {/* Main Dual-Panel Container */}
      <main className="auth-split-wrapper">
        
        {/* LEFT PANEL: Interactive 3D Animated Emoji/Characters */}
        <div className="auth-characters-panel">
          <AnimatedCharacters 
            focusedField={focusedField}
            textLength={activeTextLength}
            showPassword={showPassword || showNewPassword}
          />
        </div>

        {/* RIGHT PANEL: Auth Card Form matching screenshot */}
        <div className="auth-form-panel">
          <div className="auth-card-inner">
            
            {/* Top ND Technologies Logo Badge */}
            <div className="auth-logo-badge" onClick={onGoHome} title="ND Technologies">
              <img src="/logo.jpg" alt="ND Technologies Logo" className="brand-logo-img" />
            </div>

            {/* Title & Subtitle */}
            <div className="auth-card-header">
              <h1 className="auth-card-title">
                {mode === 'register' && 'Create NDRise account'}
                {mode === 'login' && 'Welcome back!'}
                {mode === 'forgot-password' && (forgotStep === 'request' ? 'Reset your password' : 'Set new password')}
                {mode === 'admin-login' && 'Admin Security Portal'}
              </h1>
              <p className="auth-card-subtitle">
                {mode === 'register' && 'Please enter your details to create an account'}
                {mode === 'login' && 'Please enter your details'}
                {mode === 'forgot-password' && (forgotStep === 'request' ? "Enter your email address and we'll help you reset your password" : 'Create a strong new password for your account')}
                {mode === 'admin-login' && 'Authorized administrative login portal'}
              </p>
            </div>

            {/* Feedback Alerts */}
            {errorMessage && (
              <div className="auth-alert alert-error">
                <ShieldAlert size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="auth-alert alert-success">
                <CheckCircle2 size={18} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              
              {/* Register: Username / Full Name */}
              {mode === 'register' && (
                <div className="auth-field-group">
                  <label className="auth-field-label">Username / Full name</label>
                  <input
                    type="text"
                    className="auth-field-input"
                    placeholder="e.g. sunnybunny419392"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="auth-field-group">
                <label className="auth-field-label">Email</label>
                <input
                  type="email"
                  className="auth-field-input"
                  placeholder="anna@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={mode === 'forgot-password' && forgotStep === 'reset'}
                />
              </div>

              {/* Password Field */}
              {mode !== 'forgot-password' && (
                <div className="auth-field-group">
                  <div className="auth-label-row">
                    <label className="auth-field-label">Password</label>
                    <button 
                      type="button" 
                      className="auth-toggle-show-btn" 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-field-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />

                  {/* Remember Me Checkbox & Forgot Password Row */}
                  <div className="auth-row-actions">
                    <label className="remember-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Remember for 30 days</span>
                    </label>

                    {mode === 'login' && (
                      <span 
                        className="auth-forgot-link"
                        onClick={() => {
                          setMode('forgot-password');
                          setForgotStep('request');
                          setErrorMessage('');
                          setSuccessMessage('');
                        }}
                      >
                        Forgot password?
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Forgot Password Step 2: New Password */}
              {mode === 'forgot-password' && forgotStep === 'reset' && (
                <div className="auth-field-group">
                  <div className="auth-label-row">
                    <label className="auth-field-label">New Password</label>
                    <button 
                      type="button" 
                      className="auth-toggle-show-btn" 
                      onClick={handleToggleNewPassword}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="auth-field-input"
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    minLength={6}
                  />
                </div>
              )}

              {/* Submit Primary Button */}
              <button type="submit" className="auth-primary-btn" disabled={loading}>
                {loading
                  ? 'Processing...'
                  : mode === 'register'
                  ? 'Sign Up'
                  : mode === 'login'
                  ? 'Log In'
                  : mode === 'admin-login'
                  ? 'Log In to Admin Portal'
                  : forgotStep === 'request'
                  ? 'Send Reset Code'
                  : 'Update Password'}
              </button>
            </form>

            {/* Continue with Google Button */}
            {(mode === 'register' || mode === 'login') && (
              <button 
                type="button" 
                className="btn-google-auth-pill" 
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Log in with Google</span>
              </button>
            )}

            {/* Footer Switch Links */}
            <div className="auth-card-footer">
              {mode === 'login' && (
                <p>
                  <span className="footer-prompt">Don't have an account?</span>
                  <span className="auth-action-link" onClick={() => { setMode('register'); setErrorMessage(''); }}>
                    Sign Up
                  </span>
                  <span className="footer-divider">•</span>
                  <span className="auth-action-link" onClick={() => { setMode('admin-login'); setErrorMessage(''); }}>
                    Admin Portal
                  </span>
                </p>
              )}

              {mode === 'register' && (
                <p>
                  <span className="footer-prompt">Already have an account?</span>
                  <span className="auth-action-link" onClick={() => { setMode('login'); setErrorMessage(''); }}>
                    Log In
                  </span>
                </p>
              )}

              {mode === 'forgot-password' && (
                <p>
                  <span className="footer-prompt">Remembered your password?</span>
                  <span className="auth-action-link" onClick={() => { setMode('login'); setErrorMessage(''); }}>
                    Back to Log In
                  </span>
                </p>
              )}

              {mode === 'admin-login' && (
                <p>
                  <span className="footer-prompt">Student Sign In?</span>
                  <span className="auth-action-link" onClick={() => { setMode('login'); setErrorMessage(''); }}>
                    Student Portal
                  </span>
                </p>
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
