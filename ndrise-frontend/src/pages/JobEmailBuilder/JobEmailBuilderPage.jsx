import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
import { 
  Mail, Briefcase, Building, UserCheck, Clock, Heart, Users, Share2, 
  Sparkles, CheckCircle2, AlertCircle, Copy, RefreshCw, Edit3, Trash2, 
  Download, ArrowRight, ShieldCheck, FileText, Check, AlertTriangle 
} from 'lucide-react';
import { careerAPI } from '../../services/apiClient';
import { EMAIL_TYPES, TONE_OPTIONS, LENGTH_OPTIONS, generateJobEmail } from '../../services/jobEmail.service';
import { consumeAiCredit } from '../../services/aiCreditsService';
import AiLimitModal from '../../components/Modals/AiLimitModal';
import './JobEmailBuilderPage.css';

export default function JobEmailBuilderPage({ user, setCurrentView, onRequireAuth }) {
  const [selectedType, setSelectedType] = useState('internship-app');
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Rajan',
    email: user?.email || 'rajan@example.com',
    phone: '+91 9876543210',
    college: 'NDRise Academy of Technology',
    course: 'B.Tech in Computer Science',
    skills: 'React, JavaScript, HTML5, CSS3, REST APIs',
    recipientName: 'Hiring Manager',
    companyName: 'NDRise Technologies',
    recipientEmail: 'hr@ndrise.com',
    jobTitle: 'Frontend Developer Intern',
    jobDescription: '',
    whyInterested: 'your innovative projects and strong engineering culture',
    experience: 'Built responsive web interfaces and integrated REST APIs',
    portfolioUrl: 'https://rajan-portfolio.vercel.app',
    linkedinUrl: 'https://linkedin.com/in/rajan-dev',
    githubUrl: 'https://github.com/rajan-dev',
    tone: 'Professional',
    length: 'Medium'
  });

  // Generated Email Output State
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [editableSubject, setEditableSubject] = useState('');
  const [editableBody, setEditableBody] = useState('');
  
  // UI States
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
  const [validationError, setValidationError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const previewRef = useRef(null);
  const bodyTextareaRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationError) setValidationError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return false;
    }
    if (!formData.jobTitle.trim()) {
      setValidationError('Please enter the target job or internship title.');
      return false;
    }
    return true;
  };

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }
    if (!validateForm()) return;

    const creditStatus = consumeAiCredit(user?.email || 'guest');
    if (!creditStatus.success) {
      setIsLimitModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setValidationError('');

    careerAPI.generateEmail({
      recipientRole: formData.recipientName,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      studentSkills: formData.skills,
      emailType: selectedType,
      userNotes: formData.whyInterested
    }).then((res) => {
      if (res.success && res.data) {
        const d = res.data;
        const fullBody = `${d.salutation || 'Dear Hiring Team,'}\n\n${d.body}\n\n${d.callToAction || 'Looking forward to your response.'}\n\nBest regards,\n${formData.fullName}\n${formData.email} | ${formData.phone}`;
        const result = {
          subject: d.subject || `Application for ${formData.jobTitle}`,
          body: fullBody,
          followUp: d.followUpTemplate || 'Following up on my application.'
        };
        setGeneratedEmail(result);
        setEditableSubject(result.subject);
        setEditableBody(result.body);
      } else {
        const payload = { ...formData, emailType: selectedType };
        const result = generateJobEmail(payload);
        setGeneratedEmail(result);
        setEditableSubject(result.subject);
        setEditableBody(result.body);
      }
      setIsGenerating(false);
    }).catch(() => {
      const payload = { ...formData, emailType: selectedType };
      const result = generateJobEmail(payload);
      setGeneratedEmail(result);
      setEditableSubject(result.subject);
      setEditableBody(result.body);
      setIsGenerating(false);
    });

      // Scroll to preview on mobile
      if (window.innerWidth <= 900) {
        const el = document.getElementById('email-preview-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleCopyEmail = () => {
    const fullText = `Subject: ${editableSubject}\n\n${editableBody}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }).catch(() => {
      setValidationError('Failed to copy to clipboard. Please copy manually.');
    });
  };

  const handleFocusEditor = () => {
    if (bodyTextareaRef.current) {
      bodyTextareaRef.current.focus();
    }
  };

  const handleClearPreview = () => {
    setGeneratedEmail(null);
    setEditableSubject('');
    setEditableBody('');
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase size={20} />;
      case 'Building': return <Building size={20} />;
      case 'UserCheck': return <UserCheck size={20} />;
      case 'Clock': return <Clock size={20} />;
      case 'Heart': return <Heart size={20} />;
      case 'Users': return <Users size={20} />;
      case 'Share2': return <Share2 size={20} />;
      default: return <Mail size={20} />;
    }
  };

  const isFormValid = formData.fullName.trim() && formData.email.trim() && formData.jobTitle.trim();

  return (
    <div className="job-email-page">
      <div className="email-builder-container">
        
        {/* 1. Page Header */}
        <FadeIn direction="up">
          <div className="email-hero">
            <div className="hero-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>SMART CAREER COMMUNICATIONS</span>
            </div>
            <h1 className="hero-title">
              Job Email <span className="blue-highlight-text">Builder</span>
            </h1>
            <p className="hero-subtitle">
              Create professional job and internship emails in minutes.
            </p>
            <p className="hero-explanation">
              Choose your purpose, provide a few details, and build a clear, professional email you can personalize before sending.
            </p>
          </div>
        </FadeIn>

        {/* Toast Notification Banner */}
        {copiedToast && (
          <div className="copy-toast-banner animate-fade-in">
            <CheckCircle2 size={18} color="#34d399" />
            <span>✓ Email copied to clipboard successfully!</span>
          </div>
        )}

        {/* 2. Email Type Selector */}
        <FadeIn direction="up" delay={0.1}>
          <div className="section-card glass-panel type-selector-card">
            <h3 className="section-heading">What type of email do you want to write?</h3>
            <StaggerContainer className="type-cards-grid" staggerChildren={0.06}>
              {EMAIL_TYPES.map((typeObj) => {
                const isSelected = selectedType === typeObj.id;
                return (
                  <StaggerItem key={typeObj.id}>
                    <motion.div 
                      className={`type-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedType(typeObj.id)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="type-card-icon">
                        {getIcon(typeObj.iconName)}
                      </div>
                      <div className="type-card-content">
                        <h4 className="type-card-title">{typeObj.title}</h4>
                        <p className="type-card-desc">{typeObj.description}</p>
                      </div>
                      {isSelected && (
                        <div className="type-card-check">
                          <Check size={14} />
                        </div>
                      )}
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* 3. Main Two-Column Layout (Form vs Preview) */}
        <div className="builder-layout-grid">
          
          {/* Left Column: Form Controls */}
          <div className="form-column">
            <div className="section-card glass-panel form-card">
              <h3 className="section-heading">Enter Email Details</h3>

              {validationError && (
                <div className="error-banner animate-fade-in">
                  <AlertCircle size={18} />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Your Information */}
              <div className="form-group-block">
                <h4 className="group-title">Your Information</h4>
                <div className="form-grid-2col">
                  <div className="field-box">
                    <label>Full Name <span className="req-star">*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.fullName} 
                      onChange={(e) => handleInputChange('fullName', e.target.value)} 
                      placeholder="e.g. Rajan" 
                    />
                  </div>
                  <div className="field-box">
                    <label>Email Address <span className="req-star">*</span></label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={formData.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)} 
                      placeholder="rajan@example.com" 
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="field-box">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.phone} 
                      onChange={(e) => handleInputChange('phone', e.target.value)} 
                      placeholder="+91 9876543210" 
                    />
                  </div>
                  <div className="field-box">
                    <label>College / University</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.college} 
                      onChange={(e) => handleInputChange('college', e.target.value)} 
                      placeholder="NDRise Academy" 
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="field-box">
                    <label>Course / Degree</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.course} 
                      onChange={(e) => handleInputChange('course', e.target.value)} 
                      placeholder="B.Tech in Computer Science" 
                    />
                  </div>
                  <div className="field-box">
                    <label>Key Technical Skills</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.skills} 
                      onChange={(e) => handleInputChange('skills', e.target.value)} 
                      placeholder="React, JavaScript, HTML5, REST API" 
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Information */}
              <div className="form-group-block">
                <h4 className="group-title">Recipient Information</h4>
                <div className="form-grid-2col">
                  <div className="field-box">
                    <label>Recipient Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.recipientName} 
                      onChange={(e) => handleInputChange('recipientName', e.target.value)} 
                      placeholder="e.g. Hiring Manager or Ms. Anjali" 
                    />
                  </div>
                  <div className="field-box">
                    <label>Company Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.companyName} 
                      onChange={(e) => handleInputChange('companyName', e.target.value)} 
                      placeholder="e.g. NDRise Technologies" 
                    />
                  </div>
                </div>
              </div>

              {/* Opportunity Details */}
              <div className="form-group-block">
                <h4 className="group-title">Opportunity Information</h4>
                <div className="field-box">
                  <label>Target Job / Internship Title <span className="req-star">*</span></label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.jobTitle} 
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)} 
                    placeholder="e.g. Frontend Developer Intern" 
                  />
                </div>

                <div className="field-box">
                  <label>Job Description / Requirements</label>
                  <textarea 
                    className="form-textarea" 
                    rows={3} 
                    value={formData.jobDescription} 
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)} 
                    placeholder="Paste the job or internship description here..." 
                  />
                  <span className="input-helper">Adding the job description helps create a more relevant email.</span>
                </div>

                <div className="field-box">
                  <label>Why are you interested in this role/company?</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={formData.whyInterested} 
                    onChange={(e) => handleInputChange('whyInterested', e.target.value)} 
                    placeholder="e.g. your innovative products and engineering culture" 
                  />
                </div>
              </div>

              {/* Social / Portfolio Links */}
              <div className="form-group-block">
                <h4 className="group-title">Links & Portfolio (Optional)</h4>
                <div className="form-grid-2col">
                  <div className="field-box">
                    <label>Portfolio URL</label>
                    <input 
                      type="url" 
                      className="form-input" 
                      value={formData.portfolioUrl} 
                      onChange={(e) => handleInputChange('portfolioUrl', e.target.value)} 
                      placeholder="https://my-portfolio.vercel.app" 
                    />
                  </div>
                  <div className="field-box">
                    <label>LinkedIn URL</label>
                    <input 
                      type="url" 
                      className="form-input" 
                      value={formData.linkedinUrl} 
                      onChange={(e) => handleInputChange('linkedinUrl', e.target.value)} 
                      placeholder="https://linkedin.com/in/rajan-dev" 
                    />
                  </div>
                </div>
              </div>

              {/* Tone & Length Modifiers */}
              <div className="modifiers-grid">
                <div className="field-box">
                  <label>Email Tone</label>
                  <select 
                    className="form-select"
                    value={formData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value)}
                  >
                    {TONE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="field-box">
                  <label>Email Length</label>
                  <select 
                    className="form-select"
                    value={formData.length}
                    onChange={(e) => handleInputChange('length', e.target.value)}
                  >
                    {LENGTH_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              {/* Generate Primary Button */}
              <button 
                type="button" 
                className="btn-primary btn-generate-submit"
                disabled={!isFormValid || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="spinner-icon" />
                    <span>Generating your email...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Email</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Right Column: Email Preview Composer */}
          <div className="preview-column" id="email-preview-section">
            <div className="section-card glass-panel preview-card">
              <div className="preview-card-header">
                <div className="composer-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="composer-title-text">EMAIL PREVIEW & EDITOR</span>
              </div>

              {!generatedEmail ? (
                <div className="empty-preview-placeholder">
                  <div className="empty-mail-icon">
                    <Mail size={36} color="#38bdf8" />
                  </div>
                  <h4 className="empty-title">Your email preview will appear here</h4>
                  <p className="empty-desc">
                    Choose an email type and enter your details to generate a professional email.
                  </p>
                </div>
              ) : (
                <div className="active-email-composer">
                  
                  {/* Subject Line Editable Box */}
                  <div className="subject-input-box">
                    <span className="subject-label">Subject:</span>
                    <input 
                      type="text" 
                      className="subject-input-field" 
                      value={editableSubject} 
                      onChange={(e) => setEditableSubject(e.target.value)} 
                    />
                  </div>

                  {/* Body Textarea Editor */}
                  <div className="body-editor-box">
                    <textarea 
                      ref={bodyTextareaRef}
                      className="body-editor-textarea"
                      rows={14}
                      value={editableBody}
                      onChange={(e) => setEditableBody(e.target.value)}
                    />
                  </div>

                  {/* Quality Audit Widget */}
                  <div className="email-quality-box">
                    <div className="quality-header-row">
                      <div className="quality-title-group">
                        <ShieldCheck size={18} color="#34d399" />
                        <span className="quality-title">Email Quality</span>
                      </div>
                      <div className="quality-score-pill">
                        Score: <strong>{generatedEmail.qualityScore} / 100</strong>
                      </div>
                    </div>

                    <div className="quality-checklist-grid">
                      {generatedEmail.checklist.map((item, i) => (
                        <div key={i} className="check-item">
                          {item.status ? (
                            <CheckCircle2 size={14} color="#34d399" />
                          ) : (
                            <AlertTriangle size={14} color="#fbbf24" />
                          )}
                          <span className={item.status ? 'text-ok' : 'text-warn'}>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="quality-disclaimer">
                      This is a writing-quality estimate, not a factual guarantee.
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="composer-actions-bar">
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={handleCopyEmail}
                    >
                      <Copy size={16} />
                      <span>Copy Email</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={handleFocusEditor}
                    >
                      <Edit3 size={16} />
                      <span>Edit Text</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={handleGenerate}
                    >
                      <RefreshCw size={16} />
                      <span>Regenerate</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn-outline"
                      onClick={handleClearPreview}
                    >
                      <Trash2 size={16} />
                      <span>Clear</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      <AiLimitModal 
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        user={user}
        onSuccess={() => handleGenerate()}
      />
    </div>
  );
}
