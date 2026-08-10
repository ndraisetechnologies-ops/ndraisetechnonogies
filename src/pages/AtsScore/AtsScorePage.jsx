import React, { useState, useRef } from 'react';
import { 
  FileText, UploadCloud, CheckCircle2, AlertTriangle, ArrowRight, 
  RefreshCw, Download, Sparkles, Check, AlertCircle, File, X, ShieldAlert, Target, Award, Layers 
} from 'lucide-react';
import { TARGET_INTERNSHIP_OPTIONS, getATSAnalysisResult } from './atsMockData';
import './AtsScorePage.css';

export default function AtsScorePage({ setCurrentView }) {
  const [file, setFile] = useState(null);
  const [targetInternship, setTargetInternship] = useState('general');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Analysis States: 'idle', 'analyzing', 'completed'
  const [analysisState, setAnalysisState] = useState('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const fileInputRef = useRef(null);

  const steps = [
    'Reading resume',
    'Extracting sections',
    'Checking keywords',
    'Analyzing skills',
    'Generating recommendations'
  ];

  const validateAndSetFile = (selectedFile) => {
    setErrorMsg('');
    if (!selectedFile) return;

    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    if (fileType !== 'pdf' && fileType !== 'docx' && fileType !== 'doc') {
      setErrorMsg('Please upload a PDF or DOCX file.');
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSizeInBytes) {
      setErrorMsg('Your resume must be smaller than 5MB.');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartAnalysis = () => {
    if (!file) {
      setErrorMsg('Please upload your resume before continuing.');
      return;
    }

    setErrorMsg('');
    setAnalysisState('analyzing');
    setCurrentStep(0);

    // Simulate animated loading progress steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            const result = getATSAnalysisResult(targetInternship, file.name);
            setAnalysisResult(result);
            setAnalysisState('completed');
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 550);
  };

  const handleResetAnalysis = () => {
    setAnalysisState('idle');
    setAnalysisResult(null);
    setCurrentStep(0);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${Math.round(kb)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  // Score circle calculations for SVG meter
  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981'; // Green
    if (score >= 75) return '#38bdf8'; // Blue
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="ats-score-page">
      <div className="ats-container">
        
        {/* 1. Page Header */}
        <div className="ats-header-hero">
          <div className="ats-badge-tag">
            <Sparkles size={14} className="sparkle-icon" />
            <span>AI RESUME COMPATIBILITY ANALYZER</span>
          </div>

          <h1 className="ats-main-title">
            Check Your <span className="blue-highlight-text">ATS Score</span>
          </h1>

          <p className="ats-sub-title">
            See how well your resume is optimized for applicant tracking systems and discover how you can improve it before applying.
          </p>
        </div>

        {/* 2. Main Work Area (Upload + Selection vs Results) */}
        {analysisState === 'idle' && (
          <div className="ats-card glass-panel upload-card">
            
            {/* Upload Area */}
            <div 
              className={`upload-dropzone ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept=".pdf,.docx,.doc" 
                style={{ display: 'none' }} 
              />

              {!file ? (
                <div className="upload-empty-content">
                  <div className="upload-icon-circle">
                    <UploadCloud size={32} color="#38bdf8" />
                  </div>
                  <h3 className="upload-title">Upload your resume</h3>
                  <p className="upload-subtitle">Drag & drop your resume here or</p>
                  
                  <button 
                    type="button" 
                    className="btn-secondary btn-browse-files"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <span>Browse Files</span>
                  </button>

                  <span className="upload-hint">PDF or DOCX • Maximum 5MB</span>
                </div>
              ) : (
                <div className="uploaded-file-card" onClick={(e) => e.stopPropagation()}>
                  <div className="file-icon-badge">
                    <FileText size={24} color="#38bdf8" />
                  </div>
                  <div className="file-info-text">
                    <div className="file-name">{file.name}</div>
                    <div className="file-meta">
                      {file.name.split('.').pop().toUpperCase()} • {formatFileSize(file.size)}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-remove-file" 
                    onClick={handleRemoveFile}
                    title="Remove File"
                    aria-label="Remove File"
                  >
                    <X size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error Message Banner */}
            {errorMsg && (
              <div className="ats-error-banner animate-fade-in">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Target Internship Dropdown Selector */}
            <div className="target-select-group">
              <label className="select-label">
                <Target size={16} color="#818cf8" />
                <span>Analyze against an internship (Optional)</span>
              </label>
              
              <select 
                className="target-select-input"
                value={targetInternship}
                onChange={(e) => setTargetInternship(e.target.value)}
              >
                {TARGET_INTERNSHIP_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Analyze Action Button */}
            <button 
              type="button"
              className="btn-primary btn-analyze-submit"
              disabled={!file}
              onClick={handleStartAnalysis}
            >
              <span>Analyze Resume</span>
              <ArrowRight size={18} />
            </button>

          </div>
        )}

        {/* 3. Loading Animated State */}
        {analysisState === 'analyzing' && (
          <div className="ats-card glass-panel analyzing-card animate-fade-in">
            <div className="loading-spinner-wrapper">
              <div className="loading-pulsing-orb"></div>
            </div>

            <h2 className="analyzing-title">Analyzing your resume...</h2>
            
            <div className="analysis-steps-list">
              {steps.map((stepText, idx) => {
                const isDone = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className={`step-item ${isDone ? 'done' : isCurrent ? 'active' : 'pending'}`}>
                    <span className="step-icon">
                      {isDone ? (
                        <CheckCircle2 size={18} color="#34d399" />
                      ) : isCurrent ? (
                        <span className="current-dot"></span>
                      ) : (
                        <span className="pending-circle"></span>
                      )}
                    </span>
                    <span className="step-text">{stepText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Complete ATS Analysis Results View */}
        {analysisState === 'completed' && analysisResult && (
          <div className="ats-results-wrapper animate-fade-in">
            
            {/* Top Score Overview Card */}
            <div className="ats-card glass-panel score-overview-card">
              <div className="score-header-bar">
                <div>
                  <span className="score-card-tag">YOUR NDRISE RESUME SCORE</span>
                  <h2 className="score-file-name">{analysisResult.analyzedFile}</h2>
                </div>
                
                <span className={`grade-badge grade-${analysisResult.grade.toLowerCase().replace(/\s+/g, '-')}`}>
                  {analysisResult.grade}
                </span>
              </div>

              <div className="score-display-body">
                {/* SVG Gauge Meter */}
                <div className="score-meter-container">
                  <svg width="180" height="180" viewBox="0 0 180 180" className="score-svg">
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="70" 
                      stroke="rgba(255, 255, 255, 0.08)" 
                      strokeWidth="12" 
                      fill="none" 
                    />
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="70" 
                      stroke={getScoreColor(analysisResult.score)} 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray="440" 
                      strokeDashoffset={440 - (440 * analysisResult.score) / 100}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                    />
                  </svg>

                  <div className="score-center-text">
                    <span className="score-number">{analysisResult.score}</span>
                    <span className="score-total">/ 100</span>
                  </div>
                </div>

                <div className="score-feedback-text">
                  <p className="feedback-quote">"{analysisResult.feedback}"</p>
                  
                  <div className="score-quick-stats">
                    <div className="stat-pill">
                      <span>Target:</span>
                      <strong>{TARGET_INTERNSHIP_OPTIONS.find(t => t.id === targetInternship)?.label}</strong>
                    </div>
                    <div className="stat-pill">
                      <span>Evaluated:</span>
                      <strong>{analysisResult.analyzedAt}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Breakdown Section */}
            <div className="ats-card glass-panel breakdown-card">
              <h3 className="card-section-title">Resume Analysis Breakdown</h3>
              
              <div className="breakdown-grid">
                {analysisResult.breakdown.map((item, idx) => (
                  <div key={idx} className="breakdown-item">
                    <div className="breakdown-label-row">
                      <span className="breakdown-name">{item.category}</span>
                      <span className="breakdown-val">{item.score}%</span>
                    </div>
                    <div className="breakdown-progress-track">
                      <div 
                        className="breakdown-progress-fill"
                        style={{ 
                          width: `${item.score}%`,
                          background: item.score >= 85 ? 'linear-gradient(90deg, #34d399, #10b981)' : item.score >= 70 ? 'linear-gradient(90deg, #38bdf8, #818cf8)' : 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Analysis Section */}
            <div className="ats-card glass-panel keywords-card">
              <h3 className="card-section-title">Keyword Analysis</h3>
              
              <div className="keywords-grid">
                {/* Matched Keywords Box */}
                <div className="keyword-box matched-box">
                  <div className="box-title-row">
                    <CheckCircle2 size={18} color="#34d399" />
                    <h4>Matched Keywords ({analysisResult.matchedKeywords.length})</h4>
                  </div>
                  <div className="tags-flex">
                    {analysisResult.matchedKeywords.map((kw, i) => (
                      <span key={i} className="kw-chip chip-matched">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords Box */}
                <div className="keyword-box missing-box">
                  <div className="box-title-row">
                    <AlertTriangle size={18} color="#fbbf24" />
                    <h4>Missing Keywords ({analysisResult.missingKeywords.length})</h4>
                  </div>
                  <div className="tags-flex">
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="kw-chip chip-missing">
                        ⚠ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="keyword-guidance-note">
                <InfoIcon size={16} />
                <span>Only add keywords that genuinely reflect your skills and real project experience.</span>
              </div>
            </div>

            {/* How You Can Improve Section */}
            <div className="ats-card glass-panel suggestions-card" id="suggestions-section">
              <h3 className="card-section-title">How You Can Improve</h3>
              
              <div className="suggestions-list">
                {analysisResult.suggestions.map((sug) => (
                  <div key={sug.id} className="suggestion-item">
                    <div className="sug-header-row">
                      <span className={`priority-badge priority-${sug.priority.toLowerCase()}`}>
                        {sug.priority} Priority
                      </span>
                      <h4 className="sug-title">{sug.title}</h4>
                    </div>
                    <p className="sug-desc">{sug.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="ats-actions-bar">
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => {
                  const el = document.getElementById('suggestions-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Improve My Resume</span>
              </button>

              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleResetAnalysis}
              >
                <RefreshCw size={16} />
                <span>Analyze Another Resume</span>
              </button>

              <button 
                type="button" 
                className="btn-outline btn-disabled"
                disabled
                title="Download report feature coming soon"
              >
                <Download size={16} />
                <span>Download Report (Coming Soon)</span>
              </button>
            </div>

            {/* Official NDRise Disclaimer */}
            <div className="ats-disclaimer-box">
              <ShieldAlert size={16} className="disclaimer-icon" />
              <span>
                NDRise Resume Score is an estimated resume compatibility score. Different employers and ATS platforms may evaluate resumes differently.
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function InfoIcon({ size }) {
  return <FileText size={size} color="#38bdf8" style={{ flexShrink: 0 }} />;
}
