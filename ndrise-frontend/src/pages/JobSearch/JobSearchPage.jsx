import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
import { 
  Search, Briefcase, Building, MapPin, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Filter, Star, ExternalLink, RefreshCw, Zap, Layers 
} from 'lucide-react';
import { careerAPI } from '../../services/apiClient';
import { consumeAiCredit } from '../../services/aiCreditsService';
import AiLimitModal from '../../components/Modals/AiLimitModal';
import ApplyModal from '../../components/Modals/ApplyModal';
import './JobSearchPage.css';

const SAMPLE_SKILL_TAGS = [
  'React.js', 'Node.js', 'JavaScript', 'Python', 'Web Development', 
  'PostgreSQL', 'HTML5 & CSS3', 'REST APIs', 'UI/UX Design', 'Data Science', 'Git'
];

export default function JobSearchPage({ user, setCurrentView, onRequireAuth }) {
  const [skillsInput, setSkillsInput] = useState('React.js, Node.js, JavaScript, Web Development, REST APIs');
  const [jobTypeFilter, setJobTypeFilter] = useState('all'); // 'all' | 'internship' | 'fulltime' | 'remote'
  const [locationInput, setLocationInput] = useState('Remote / India');
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [applyModalItem, setApplyModalItem] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();

    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    if (!skillsInput.trim()) {
      alert('Please enter at least one skill or topic.');
      return;
    }

    // Check 3 Free AI Credits limit
    const creditStatus = consumeAiCredit(user?.email || 'guest');
    if (!creditStatus.success) {
      setIsLimitModalOpen(true);
      return;
    }

    setIsSearching(true);

    careerAPI.searchJobs({
      studentSkills: skillsInput,
      jobType: jobTypeFilter,
      location: locationInput,
      experienceLevel: 'Fresher / Entry Level (0-1 Yrs)'
    }).then((res) => {
      if (res.success && Array.isArray(res.jobs)) {
        setJobs(res.jobs);
      } else {
        setJobs([]);
      }
      setIsSearching(false);
    }).catch(() => {
      setIsSearching(false);
    });
  };

  // Perform initial search on mount
  useEffect(() => {
    handleSearch();
  }, []);

  const handleAddSkillTag = (tag) => {
    if (skillsInput.includes(tag)) return;
    setSkillsInput((prev) => (prev ? `${prev}, ${tag}` : tag));
  };

  const filteredJobs = jobs.filter((job) => {
    if (jobTypeFilter === 'internship') return (job.type || '').toLowerCase().includes('internship');
    if (jobTypeFilter === 'fulltime') return (job.type || '').toLowerCase().includes('full-time');
    if (jobTypeFilter === 'remote') return (job.location || '').toLowerCase().includes('remote');
    return true;
  });

  const handleApplyClick = (job) => {
    const isExternal = Boolean(job.applyUrl) || (job.company && !job.company.toLowerCase().includes('ndrise'));
    if (isExternal) {
      const targetUrl = job.applyUrl || `https://www.google.com/search?q=${encodeURIComponent(job.title + ' ' + job.company + ' careers apply')}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setApplyModalItem({ id: job.id, title: job.title, domain: job.company });
    }
  };

  return (
    <div className="job-search-page">
      <div className="job-search-container">
        
        {/* Toast Notification Banner */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div 
              className="toast-banner"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <CheckCircle2 size={18} color="#34d399" />
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <FadeIn direction="up">
          <div className="search-hero">
            <div className="hero-badge">
              <Sparkles size={14} color="#38bdf8" /> AI SKILL MATCHING ENGINE
            </div>
            <h1 className="hero-title">
              Skill-Based Job & Internship <span className="highlight-text">Finder</span>
            </h1>
            <p className="hero-subtitle">
              Enter your technical skills below to discover high-matching developer internships and entry-level positions tailored to your profile.
            </p>

            {/* Search Box Form */}
            <form className="search-box-card glass-panel" onSubmit={handleSearch}>
              <div className="search-input-group">
                <Search size={22} className="search-icon" />
                <input 
                  type="text"
                  className="skill-input"
                  placeholder="Enter your skills (e.g. React.js, Node.js, Python, PostgreSQL, Git...)"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary search-btn" disabled={isSearching}>
                {isSearching ? <RefreshCw className="spin-icon" size={18} /> : <Zap size={18} />}
                <span>{isSearching ? 'Finding Matched Jobs...' : 'Find Jobs & Internships →'}</span>
              </button>
            </form>

            {/* Popular Skill Tags */}
            <div className="skill-tags-wrapper">
              <span className="tags-label">Quick Add Skills:</span>
              <div className="tags-flex">
                {SAMPLE_SKILL_TAGS.map((tag) => (
                  <button 
                    key={tag}
                    type="button"
                    className={`skill-tag-pill ${skillsInput.includes(tag) ? 'active' : ''}`}
                    onClick={() => handleAddSkillTag(tag)}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Filter Bar */}
        <div className="search-filter-bar glass-panel">
          <div className="filter-tabs">
            <button 
              className={`filter-btn ${jobTypeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('all')}
            >
              All Openings ({jobs.length})
            </button>
            <button 
              className={`filter-btn ${jobTypeFilter === 'internship' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('internship')}
            >
              🎓 Virtual Internships
            </button>
            <button 
              className={`filter-btn ${jobTypeFilter === 'fulltime' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('fulltime')}
            >
              💼 Full-Time Roles
            </button>
            <button 
              className={`filter-btn ${jobTypeFilter === 'remote' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('remote')}
            >
              🌐 100% Remote
            </button>
          </div>

          <div className="results-count">
            Showing <strong>{filteredJobs.length}</strong> matched opportunities
          </div>
        </div>

        {/* Job Listings Grid */}
        {isSearching ? (
          <div className="search-loading-state">
            <RefreshCw className="spin-icon-lg" size={36} color="#38bdf8" />
            <h3>Matching your skills with live developer openings...</h3>
            <p>Evaluating compatibility, missing keywords, and stipend levels.</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="search-empty-state glass-panel">
            <Briefcase size={40} color="#94a3b8" />
            <h3>No specific job matches found for current filter</h3>
            <p>Try adding more skill tags above or switching the filter to "All Openings".</p>
            <button className="btn-secondary" onClick={() => { setJobTypeFilter('all'); setSkillsInput('React.js, Node.js, Web Development'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <StaggerContainer className="job-grid" staggerChildren={0.08}>
            {filteredJobs.map((job) => {
              const isExternal = Boolean(job.applyUrl) || (job.company && !job.company.toLowerCase().includes('ndrise'));
              return (
                <StaggerItem key={job.id}>
                  <div className="job-card glass-panel">
                    {/* Top Row: AI Match Score & Type */}
                    <div className="job-card-top">
                      <div className={`match-badge ${job.matchScore >= 90 ? 'match-high' : 'match-medium'}`}>
                        <Sparkles size={13} /> {job.matchScore}% Skill Match
                      </div>
                      <span className="job-type-pill">{job.type}</span>
                    </div>

                    {/* Body Info */}
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company-row">
                      <Building size={16} color="#38bdf8" />
                      <strong>{job.company}</strong>
                      <span className="company-dot">•</span>
                      <MapPin size={15} color="#94a3b8" />
                      <span>{job.location}</span>
                    </div>

                    <div className="job-stipend-box">
                      <span className="stipend-label">Stipend / Package:</span>
                      <strong className="stipend-value">{job.stipend}</strong>
                    </div>

                    <p className="job-desc">{job.description}</p>

                    {/* Skills Matching Chips */}
                    <div className="job-skills-section">
                      <div className="skills-group">
                        <span className="skills-sublabel">Matching Skills:</span>
                        <div className="chips-flex">
                          {(job.matchingSkills || []).map((sk, idx) => (
                            <span key={idx} className="chip-match">✓ {sk}</span>
                          ))}
                        </div>
                      </div>

                      {job.missingSkills && job.missingSkills.length > 0 && (
                        <div className="skills-group" style={{ marginTop: '0.4rem' }}>
                          <span className="skills-sublabel" style={{ color: '#f59e0b' }}>Good to learn:</span>
                          <div className="chips-flex">
                            {job.missingSkills.map((sk, idx) => (
                              <span key={idx} className="chip-missing">+ {sk}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Footer Action */}
                    <div className="job-card-footer">
                      <span className="posted-time">Posted {job.postedDate}</span>
                      <button 
                        className="btn-primary apply-job-btn"
                        onClick={() => handleApplyClick(job)}
                      >
                        {isExternal ? (
                          <>Apply Direct ↗</>
                        ) : (
                          <>Apply Now <ArrowRight size={15} /></>
                        )}
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

      </div>

      {/* Credit Limit Modal */}
      <AiLimitModal 
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        user={user}
        onSuccess={() => handleSearch()}
      />

      {/* Apply Modal for NDRise Internships */}
      <ApplyModal 
        isOpen={Boolean(applyModalItem)}
        internship={applyModalItem}
        onClose={() => setApplyModalItem(null)}
        onSubmitSuccess={(msg) => {
          showToast(msg || '🎉 Application Registered! Opening Student Dashboard...');
          setTimeout(() => {
            if (setCurrentView) setCurrentView('student-dashboard');
          }, 1200);
        }}
      />
    </div>
  );
}
