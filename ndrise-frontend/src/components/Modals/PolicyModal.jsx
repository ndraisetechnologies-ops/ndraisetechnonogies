import React from 'react';
import { X, Shield, FileText, Cookie, Mail, CheckCircle2, Phone, MapPin } from 'lucide-react';
import './Modals.css';

export default function PolicyModal({ isOpen, type, onClose }) {
  if (!isOpen || !type) return null;

  const contentMap = {
    contact: {
      icon: Mail,
      title: 'Contact Support',
      subtitle: 'We are here to assist with your virtual internship, task submissions, & credentials.',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-main)' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-glow)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> Support Email
            </h4>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>support@ndraisetechnologies.com</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Average response time: 2-4 business hours</p>
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-glow)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> Student Helpline
            </h4>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>+91 98765 43210 (Mon - Sat, 10:00 AM - 6:00 PM IST)</p>
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-glow)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} /> Head Office
            </h4>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>ND Raise Technologies HQ, Cyber City, Tech Park, India</p>
          </div>
        </div>
      )
    },
    terms: {
      icon: FileText,
      title: 'Terms & Conditions',
      subtitle: 'Guidelines and terms governing ND Raise Technologies Virtual Internship Programs.',
      body: (
        <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p><strong>1. Eligibility:</strong> The 4-Week Virtual Internship is open to engineering, computer science, and technology students worldwide.</p>
          <p><strong>2. Task Completion:</strong> Interns must complete at least 2 out of 3 assigned domain tasks to earn an official certificate & Letter of Recommendation (LOR).</p>
          <p><strong>3. Code Integrity:</strong> All project submissions must be original work pushed to public GitHub repositories and posted on LinkedIn.</p>
          <p><strong>4. Verification:</strong> Issued certificates bear a unique QR code and ID verifiable on our official verification portal indefinitely.</p>
        </div>
      )
    },
    privacy: {
      icon: Shield,
      title: 'Privacy Policy',
      subtitle: 'How ND Raise Technologies handles and protects your student data.',
      body: (
        <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p><strong>Data Collection:</strong> We collect student contact details, college names, and project repository URLs solely for issuing internship credentials and certificates.</p>
          <p><strong>Data Protection:</strong> Your personal information is encrypted and never sold or shared with unauthorized third parties.</p>
          <p><strong>Public Verification:</strong> Verified certificate IDs display recipient name, domain track, and issue date on our public verifier tool for recruiters.</p>
        </div>
      )
    },
    cookies: {
      icon: Cookie,
      title: 'Cookies Policy',
      subtitle: 'Information about cookie preferences and website sessions.',
      body: (
        <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p><strong>Essential Cookies:</strong> Used to maintain your theme preference (Light/Dark mode) and active login session.</p>
          <p><strong>Performance Cookies:</strong> Analytics cookies help us improve task loading speeds and interactive certificate rendering.</p>
          <p><strong>Managing Cookies:</strong> You can clear or disable cookies via your browser settings at any time without affecting certificate verification.</p>
        </div>
      )
    }
  };

  const item = contentMap[type] || contentMap.terms;
  const IconComponent = item.icon;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-header" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', marginBottom: '0.5rem' }}>
            <IconComponent size={24} />
            <span style={{ fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ND Raise Platform Policy</span>
          </div>
          <h2 className="modal-title" style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>
            {item.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {item.subtitle}
          </p>
        </div>

        <div style={{ padding: '0.5rem 0 1.5rem' }}>
          {item.body}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-glow)' }}>
          <button className="btn-primary" onClick={onClose} style={{ padding: '0.55rem 1.5rem', fontSize: '0.88rem' }}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
