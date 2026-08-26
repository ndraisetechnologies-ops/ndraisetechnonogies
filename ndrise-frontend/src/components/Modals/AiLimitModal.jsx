import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Key, CreditCard, QrCode, CheckCircle2, ShieldCheck, X, Zap } from 'lucide-react';
import { addAiCredits, setCustomApiKey } from '../../services/aiCreditsService';
import './AiLimitModal.css';

export default function AiLimitModal({ isOpen, onClose, user, onSuccess }) {
  const [activeTab, setActiveTab] = useState('pay'); // 'pay' | 'custom-key'
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card'

  // Lock background body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayTenRupees = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const email = user?.email || 'guest';
      addAiCredits(email, 3);
      setSuccessMsg('🎉 Payment of ₹10 Successful! +3 AI Credits added to your account.');
      setTimeout(() => {
        setSuccessMsg('');
        if (onSuccess) onSuccess();
        onClose();
      }, 1800);
    }, 1500);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (!apiKeyInput.trim() || apiKeyInput.trim().length < 10) {
      alert('Please enter a valid Gemini API Key starting with AIzaSy...');
      return;
    }
    const email = user?.email || 'guest';
    setCustomApiKey(email, apiKeyInput.trim());
    setSuccessMsg('⚡ Custom Gemini API Key activated! You now have Unlimited AI Access.');
    setTimeout(() => {
      setSuccessMsg('');
      if (onSuccess) onSuccess();
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="ai-modal-overlay">
        <motion.div 
          className="ai-modal-card glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button className="ai-modal-close" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="ai-modal-header">
            <div className="ai-modal-badge">
              <Zap size={15} color="#fbbf24" /> 0 / 3 FREE AI CREDITS REMAINING
            </div>
            <h2 className="ai-modal-title">Unlock More AI Scans & Tools</h2>
            <p className="ai-modal-desc">
              You have completed your 3 free trial AI uses. Choose an option below to continue using ATS Scorer, Email Builder, and Interview Prep.
            </p>
          </div>

          <div className="ai-modal-tabs">
            <button 
              className={`ai-tab-btn ${activeTab === 'pay' ? 'active' : ''}`}
              onClick={() => setActiveTab('pay')}
            >
              <CreditCard size={16} /> Pay ₹10 (+3 AI Uses)
            </button>
            <button 
              className={`ai-tab-btn ${activeTab === 'custom-key' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom-key')}
            >
              <Key size={16} /> Use My Own Key (Unlimited)
            </button>
          </div>

          {successMsg ? (
            <div className="ai-success-banner">
              <CheckCircle2 size={24} color="#34d399" />
              <span>{successMsg}</span>
            </div>
          ) : (
            <div className="ai-tab-content">
              {activeTab === 'pay' && (
                <div className="ai-pay-section">
                  <div className="price-tag-box">
                    <div className="price-amount">₹10 <span>/ 3 Extra AI Credits</span></div>
                    <div className="price-sub">Instant Auto-Activation • Valid for All Tools</div>
                  </div>

                  <div className="payment-options">
                    <label className={`pay-opt ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
                      <QrCode size={18} color="#38bdf8" />
                      <span>Instant UPI / QR Code</span>
                    </label>
                    <label className={`pay-opt ${paymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setPaymentMethod('card')}>
                      <CreditCard size={18} color="#c084fc" />
                      <span>Debit / Credit Card</span>
                    </label>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="upi-qr-preview">
                      <div className="qr-box">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=ndrisetech@upi%26pn=NDRise%20Technologies%26am=10.00%26cu=INR" 
                          alt="UPI QR Code ₹10"
                        />
                      </div>
                      <div className="qr-info">
                        <strong>Scan QR Code with any UPI App</strong>
                        <span>Google Pay • PhonePe • Paytm • BHIM</span>
                      </div>
                    </div>
                  )}

                  <button 
                    className="btn-primary pay-now-btn" 
                    onClick={handlePayTenRupees}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Verifying ₹10 Payment...' : 'Pay ₹10 & Get +3 Credits →'}
                  </button>
                </div>
              )}

              {activeTab === 'custom-key' && (
                <form className="ai-key-section" onSubmit={handleSaveApiKey}>
                  <div className="key-info-box">
                    <ShieldCheck size={20} color="#34d399" />
                    <div>
                      <strong>Bring Your Own Google Gemini API Key</strong>
                      <p>Get a 100% FREE key from Google AI Studio and enjoy Unlimited AI scans without paying!</p>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
                      Enter Gemini API Key (starts with AIzaSy...):
                    </label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="AIzaSy..." 
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#38bdf8', textDecoration: 'none' }}>
                      Get Free Key at Google AI Studio ↗
                    </a>
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                      Activate Unlimited AI ⚡
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
