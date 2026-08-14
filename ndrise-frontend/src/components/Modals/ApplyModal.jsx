import React, { useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import './Modals.css';

export default function ApplyModal({ isOpen, internship, onClose, onSubmitSuccess }) {
  const [college, setCollege] = useState('IIT Madras');
  const [degree, setDegree] = useState('B.Tech Computer Science');
  const [phone, setPhone] = useState('+91 98765 43210');

  if (!isOpen || !internship) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess(`Successfully applied for ${internship.title}! Check your email for details.`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-header">
          <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
            Apply For Internship
          </div>
          <h3 className="modal-title">{internship.title}</h3>
          <p className="modal-subtitle">
            {internship.duration} | {internship.level}
          </p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">College / University</label>
            <input
              type="text"
              className="form-input"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Degree / Stream</label>
            <input
              type="text"
              className="form-input"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary form-submit-btn">
            <Send size={18} />
            <span>Submit Application</span>
          </button>
        </form>
      </div>
    </div>
  );
}
