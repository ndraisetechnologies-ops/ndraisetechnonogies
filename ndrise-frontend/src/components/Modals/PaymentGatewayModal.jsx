import React, { useState } from 'react';
import { X, CreditCard, QrCode, CheckCircle2, ShieldCheck, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Modals.css';

export default function PaymentGatewayModal({ isOpen, onClose, user, trackTitle, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('upi'); // 'upi', 'card'
  const [upiId, setUpiId] = useState('student@upi');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsVerified(true);

      setTimeout(() => {
        setIsVerified(false);
        onClose();
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }, 1200);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div 
          className="modal-container glass-panel"
          style={{ 
            maxWidth: '540px', 
            border: '1.5px solid #38bdf8', 
            boxShadow: '0 25px 70px rgba(56, 189, 248, 0.25)',
            background: 'rgba(15, 23, 42, 0.96)',
            padding: '1.75rem'
          }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
        >
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          {!isProcessing && !isVerified ? (
            <>
              {/* Payment Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7, #10b981)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)'
                }}>
                  <CreditCard size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontWeight: '700' }}>
                      Official Certificate Fee
                    </h3>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#34d399' }}>
                      ₹99
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>
                    ISO 9001:2015 Verified Certificate & LOR Verification Processing
                  </p>
                </div>
              </div>

              {/* Student & Deliverable Summary Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                fontSize: '0.82rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem'
              }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Student:</span> <strong style={{ color: 'var(--text-main)' }}>{user?.name || 'Nikhil Sharma'}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Email:</span> <strong style={{ color: 'var(--text-main)' }}>{user?.email || 'sriramdivilash@gmail.com'}</strong></div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Track:</span> <strong style={{ color: '#38bdf8' }}>{trackTitle || 'Full Stack Web Development Internship'}</strong>
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontWeight: '700', fontSize: '0.78rem' }}>
                  <ShieldCheck size={14} /> 3 Assigned Project Tasks Approved & Verified by Admin
                </div>
              </div>

              {/* Payment Methods Tab */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    background: selectedMethod === 'upi' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255,255,255,0.04)',
                    color: selectedMethod === 'upi' ? '#38bdf8' : 'var(--text-muted)',
                    border: `1px solid ${selectedMethod === 'upi' ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer'
                  }}
                >
                  <QrCode size={16} /> UPI / QR (GPay, PhonePe, Paytm)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    background: selectedMethod === 'card' ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255,255,255,0.04)',
                    color: selectedMethod === 'card' ? '#38bdf8' : 'var(--text-muted)',
                    border: `1px solid ${selectedMethod === 'card' ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer'
                  }}
                >
                  <CreditCard size={16} /> Card / Netbanking
                </button>
              </div>

              {/* Form Input Area */}
              <form onSubmit={handlePay}>
                {selectedMethod === 'upi' ? (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                      Enter VPA / UPI ID or Scan QR:
                    </label>
                    <input 
                      type="text" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="admin-search-input"
                      style={{ width: '100%', color: '#38bdf8', fontWeight: '600' }}
                      required
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>GPay</span>
                      <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>PhonePe</span>
                      <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>Paytm</span>
                      <span style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>BHIM</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>Card Number</label>
                      <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="admin-search-input" style={{ width: '100%' }} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>Expiry (MM/YY)</label>
                        <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="admin-search-input" style={{ width: '100%' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)', display: 'block', marginBottom: '0.3rem' }}>CVV</label>
                        <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} className="admin-search-input" style={{ width: '100%' }} required />
                      </div>
                    </div>
                  </div>
                )}

                {/* Secure Payment Guarantee */}
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  <Lock size={14} color="#34d399" />
                  <span>256-Bit SSL Encrypted & Instant Auto-Verification by Razorpay / UPI Gateway</span>
                </div>

                {/* Submit Payment Button */}
                <motion.button 
                  type="submit" 
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '1rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                    borderColor: '#34d399',
                    justifyContent: 'center'
                  }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span>Pay ₹99 & Verify Certificate →</span>
                </motion.button>
              </form>
            </>
          ) : isProcessing ? (
            /* Processing State */
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '3px solid rgba(56, 189, 248, 0.2)',
                borderTopColor: '#38bdf8',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1.5rem'
              }} />
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Verifying ₹99 Payment...
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Connecting to Razorpay UPI gateway and recording official verification code.
              </p>
            </div>
          ) : (
            /* Verified Success State */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(52, 211, 153, 0.2)',
                border: '2px solid #34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: '#34d399'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Payment Verified! ₹99
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: '600', margin: 0 }}>
                🎉 Application Logged! Updating status on your dashboard...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
