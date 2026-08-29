import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../../components/Motion/MotionUtils';
import { 
  Search, Briefcase, Building, MapPin, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Filter, Star, ExternalLink, RefreshCw, Zap, Layers 
} from 'lucide-react';
import { careerAPI } from '../../services/apiClient';
import { consumeAiCredit } from '../../services/aiCreditsService';
import AiLimitModal from '../../components/Modals/AiLimitModal';
import ApplyModal from '../../components/Modals/ApplyModal';
import './JobSearchPage.css';

export const DEFAULT_JOBS = [
  {
    id: 'job-101',
    title: 'Junior Full-Stack Web Developer Intern',
    company: 'NDRise Technologies & Partners',
    location: '100% Remote (India)',
    type: 'Virtual Internship',
    stipend: '₹15,000 - ₹25,000 / month',
    matchScore: 94,
    matchingSkills: ['React.js', 'Node.js & Express', 'JavaScript (ES6+)', 'REST APIs', 'Git'],
    missingSkills: ['PostgreSQL / Prisma', 'TypeScript'],
    description: 'Build production-ready React web apps, integrate REST APIs, and collaborate on real client projects.',
    postedDate: 'Today',
    applyUrl: null
  },
  {
    id: 'job-102',
    title: 'Frontend Developer (React & UI Engineering)',
    company: 'InnovateTech Labs',
    location: 'Bangalore / Remote',
    type: 'Full-Time (Entry Level)',
    stipend: '₹4.5 - ₹7.0 LPA',
    matchScore: 90,
    matchingSkills: ['React.js', 'HTML5 & CSS3', 'JavaScript', 'Responsive Web Design'],
    missingSkills: ['Tailwind CSS', 'Redux Toolkit'],
    description: 'Develop slick UI components, optimize web performance, and maintain modern design systems.',
    postedDate: '1 day ago',
    applyUrl: 'https://careers.google.com/jobs/results/'
  },
  {
    id: 'job-103',
    title: 'Python & Backend Software Intern',
    company: 'CloudScale Systems',
    location: 'Hyderabad / Remote',
    type: 'Virtual Internship',
    stipend: '₹18,000 - ₹28,000 / month',
    matchScore: 88,
    matchingSkills: ['Python 3', 'Django / FastAPI', 'REST APIs', 'SQL', 'Git'],
    missingSkills: ['Docker', 'Redis'],
    description: 'Design scalable microservices APIs, manage database connections, and write automated Python unit tests.',
    postedDate: '2 days ago',
    applyUrl: 'https://careers.google.com/jobs/results/'
  },
  {
    id: 'job-104',
    title: 'Full Stack Software Engineer (Fresher)',
    company: 'NexGen Digital Solutions',
    location: '100% Remote',
    type: 'Full-Time (Entry Level)',
    stipend: '₹5.0 - ₹8.5 LPA',
    matchScore: 92,
    matchingSkills: ['React.js', 'Node.js', 'Express', 'MongoDB / SQL', 'REST APIs'],
    missingSkills: ['AWS', 'GraphQL'],
    description: 'Collaborate with cross-functional teams to build high-performance web apps and microservices.',
    postedDate: '3 days ago',
    applyUrl: 'https://careers.google.com/jobs/results/'
  }
];

const SAMPLE_SKILL_TAGS = [
  'React.js', 'Node.js', 'JavaScript', 'Python', 'Web Development', 
  'PostgreSQL', 'HTML5 & CSS3', 'REST APIs', 'UI/UX Design', 'Data Science', 'Git'
];

export default function JobSearchPage({ user, setCurrentView, onRequireAuth }) {
  const [skillsInput, setSkillsInput] = useState('React.js, Node.js, JavaScript, Web Development, REST APIs');
  const [jobTypeFilter, setJobTypeFilter] = useState('all'); // 'all' | 'internship' | 'fulltime' | 'remote'
  const [locationInput, setLocationInput] = useState('Remote / India');
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [applyModalItem, setApplyModalItem] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleSearch = (e, isManualSearch = false) => {
    if (e) e.preventDefault();

    if (isManualSearch && !user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    if (!skillsInput.trim()) {
      if (isManualSearch) alert('Please enter at least one skill or topic.');
      return;
    }

    // Check 3 Free AI Credits limit only for manual search actions
    if (isManualSearch) {
      const creditStatus = consumeAiCredit(user?.email || 'guest');
      if (!creditStatus.success) {
        setIsLimitModalOpen(true);
        return;
      }
    }

    setIsSearching(true);

    careerAPI.searchJobs({
      studentSkills: skillsInput,
      jobType: 'all',
      location: locationInput,
      experienceLevel: 'Fresher / Entry Level (0-1 Yrs)'
    }).then((res) => {
      if (res.success && Array.isArray(res.jobs) && res.jobs.length > 0) {
        setJobs(res.jobs);
      } else {
        setJobs(DEFAULT_JOBS);
      }
      setIsSearching(false);
    }).catch(() => {
      setJobs(DEFAULT_JOBS);
      setIsSearching(false);
    });
  };

  // Perform initial search on mount (without forcing auth redirect on page refresh)
  useEffect(() => {
    handleSearch(null, false);
  }, []);

  const handleAddSkillTag = (tag) => {
    if (skillsInput.includes(tag)) return;
    setSkillsInput((prev) => (prev ? `${prev}, ${tag}` : tag));
  };

  // Precise Job Type Classification Helpers
  const isInternshipJob = (j) => {
    const typeLower = (j.type || '').toLowerCase();
    const titleLower = (j.title || '').toLowerCase();
    return typeLower.includes('intern') || titleLower.includes('intern');
  };

  const isFullTimeJob = (j) => {
    if (isInternshipJob(j)) return false;
    const typeLower = (j.type || '').toLowerCase();
    return (
      typeLower.includes('full') ||
      typeLower.includes('permanent') ||
      typeLower.includes('entry') ||
      typeLower.includes('role') ||
      typeLower.includes('job') ||
      !isInternshipJob(j)
    );
  };

  const isRemoteJob = (j) => {
    const locLower = (j.location || '').toLowerCase();
    const typeLower = (j.type || '').toLowerCase();
    return locLower.includes('remote') || typeLower.includes('remote');
  };

  // Filter Counts
  const allCount = jobs.length;
  const internshipCount = jobs.filter(isInternshipJob).length;
  const fulltimeCount = jobs.filter(isFullTimeJob).length;
  const remoteCount = jobs.filter(isRemoteJob).length;

  const filteredJobs = jobs.filter((job) => {
    if (jobTypeFilter === 'internship') return isInternshipJob(job);
    if (jobTypeFilter === 'fulltime') return isFullTimeJob(job);
    if (jobTypeFilter === 'remote') return isRemoteJob(job);
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
              <Sparkles size={14} className="hero-badge-icon" /> AI SKILL MATCHING ENGINE
            </div>
            <h1 className="hero-title">
              Skill-Based Job & Internship <span className="highlight-text">Finder</span>
            </h1>
            <p className="hero-subtitle">
              Enter your technical skills below to discover high-matching developer internships and entry-level positions tailored to your profile.
            </p>

            {/* Search Box Form */}
            <form className="search-box-card glass-panel" onSubmit={(e) => handleSearch(e, true)}>
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
              All Openings ({allCount})
            </button>
            <button 
              className={`filter-btn ${jobTypeFilter === 'internship' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('internship')}
            >
              🎓 Virtual Internships ({internshipCount})
            </button>
            <button 
              className={`filter-btn ${jobTypeFilter === 'fulltime' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('fulltime')}
            >
              💼 Full-Time Roles ({fulltimeCount})
            </button>
            <button 
              className={`filter-btn ${jobTypeFilter === 'remote' ? 'active' : ''}`}
              onClick={() => setJobTypeFilter('remote')}
            >
              🌐 100% Remote ({remoteCount})
            </button>
          </div>

          <div className="results-count">
            Showing <strong>{filteredJobs.length}</strong> matched {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
          </div>
        </div>

        {/* Job Listings Grid */}
        {isSearching ? (
          <div className="search-loading-state glass-panel">
            <RefreshCw className="spin-icon-lg" size={36} />
            <h3>Matching your skills with live developer openings...</h3>
            <p>Evaluating compatibility, missing keywords, and stipend levels.</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="search-empty-state glass-panel">
            <Briefcase size={40} className="empty-state-icon" />
            <h3>No specific job matches found for current filter</h3>
            <p>Try adding more skill tags above or switching the filter to "All Openings".</p>
            <button className="btn-secondary" onClick={() => { setJobTypeFilter('all'); setSkillsInput('React.js, Node.js, Web Development'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            key={jobTypeFilter}
            className="job-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {filteredJobs.map((job) => {
              const isExternal = Boolean(job.applyUrl) || (job.company && !job.company.toLowerCase().includes('ndrise'));
              return (
                <div key={job.id} className="job-card glass-panel">
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
                    <span className="company-info-item">
                      <Building size={15} className="company-icon" />
                      <strong>{job.company}</strong>
                    </span>
                    <span className="company-dot">•</span>
                    <span className="company-info-item">
                      <MapPin size={15} className="location-icon" />
                      <span>{job.location}</span>
                    </span>
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
                      <div className="skills-group missing-group">
                        <span className="skills-sublabel skills-sublabel-amber">Good to learn:</span>
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
              );
            })}
          </motion.div>
        )}

      </div>

      {/* Credit Limit Modal */}
      <AiLimitModal 
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        user={user}
        onSuccess={() => handleSearch(null, true)}
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
