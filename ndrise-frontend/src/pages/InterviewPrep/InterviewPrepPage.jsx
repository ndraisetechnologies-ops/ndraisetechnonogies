import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
import { 
  Brain, Target, Award, Code, UserCheck, Users, FileText, CheckCircle2, 
  AlertCircle, ArrowRight, RefreshCw, Sparkles, HelpCircle, Star, ShieldAlert, 
  Check, Play, Lightbulb, ChevronRight, BarChart2, Flame, Layers 
} from 'lucide-react';
import { careerAPI } from '../../services/apiClient';
import { 
  TARGET_ROLES, EXPERIENCE_LEVELS, INTERVIEW_TYPES, PREP_MODES, 
  INTERVIEW_CATEGORIES, STAR_FRAMEWORK, MOCK_QUESTIONS, QUESTION_OF_THE_DAY, getFilteredQuestions 
} from '../../data/interviewQuestions';
import './InterviewPrepPage.css';

export default function InterviewPrepPage({ setCurrentView, user, onRequireAuth }) {
  // Setup selections
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [interviewType, setInterviewType] = useState('Technical');
  const [prepMode, setPrepMode] = useState('Practice Questions');

  // Page View Modes: 'dashboard', 'practice', 'feedback', 'mock-result'
  const [viewState, setViewState] = useState('dashboard');
  
  // Practice session state
  const [activeQuestions, setActiveQuestions] = useState(MOCK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Stats State
  const [questionsPracticed, setQuestionsPracticed] = useState(62);
  const [streakDays, setStreakDays] = useState(3);
  const [readinessScore, setReadinessScore] = useState(78);

  const currentQuestion = activeQuestions[currentIndex] || MOCK_QUESTIONS[0];

  const handleStartSetup = () => {
    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    const filtered = getFilteredQuestions(selectedRole, interviewType, experienceLevel);
    const questionsToUse = filtered.length > 0 ? filtered : MOCK_QUESTIONS;

    careerAPI.generateInterviewPrep({
      targetRole: selectedRole,
      experienceLevel,
      topic: `${interviewType} Questions & Concepts`
    }).then((res) => {
      if (res.success && res.data && Array.isArray(res.data.questions)) {
        const aiQuestions = res.data.questions.map((q, idx) => ({
          id: q.id || idx + 1,
          question: q.question,
          category: q.category || interviewType,
          difficulty: q.difficulty || 'Medium',
          company: 'Top Tech Companies',
          hint: (q.keyConcepts || []).join(', ') || 'Focus on step-by-step problem solving.',
          answer: q.modelAnswer || 'Structure your answer using situation, task, action, and result.'
        }));
        setActiveQuestions(aiQuestions);
      } else {
        setActiveQuestions(questionsToUse);
      }
    }).catch(() => {
      setActiveQuestions(questionsToUse);
    });

    setCurrentIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setViewState('practice');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId) => {
    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }
    setInterviewType(catId);
    const filtered = getFilteredQuestions(selectedRole, catId, experienceLevel);
    setActiveQuestions(filtered.length > 0 ? filtered : MOCK_QUESTIONS);
    setCurrentIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setViewState('practice');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmitAnswer = (e) => {
    if (e) e.preventDefault();
    setQuestionsPracticed(prev => prev + 1);
    setViewState('feedback');
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowHint(false);
      setViewState('practice');
    } else {
      setViewState('mock-result');
    }
  };

  const handleTryAgain = () => {
    setUserAnswer('');
    setShowHint(false);
    setViewState('practice');
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={22} />;
      case 'UserCheck': return <UserCheck size={22} />;
      case 'Users': return <Users size={22} />;
      case 'FileText': return <FileText size={22} />;
      default: return <Brain size={22} />;
    }
  };

  return (
    <div className="interview-prep-page">
      <div className="interview-container">
        
        {/* 1. Page Header */}
        <FadeIn direction="up">
          <div className="interview-hero">
            <div className="hero-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>AI INTERVIEW PRACTICE & READINESS</span>
            </div>
            <h1 className="hero-title">
              Interview <span className="blue-highlight-text">Preparation</span>
            </h1>
            <p className="hero-subtitle font-medium">
              Practice technical questions, improve your interview answers, and build confidence before you meet recruiters.
            </p>

            {viewState === 'dashboard' && (
              <motion.button 
                type="button" 
                className="btn-primary hero-cta-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  const el = document.getElementById('setup-card-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Start Preparation →</span>
              </motion.button>
            )}
          </div>
        </FadeIn>

        {/* 2. Main Dashboard & Readiness View */}
        {viewState === 'dashboard' && (
          <div className="dashboard-content-stack animate-fade-in">
            
            {/* Top Readiness & Progress Bar Row */}
            <FadeIn direction="up" delay={0.1}>
              <div className="readiness-overview-grid">
                
                {/* Readiness Score Card */}
                <div className="section-card glass-panel readiness-card">
                  <div className="card-top-tag">NDRISE PREPARATION INDICATOR</div>
                  <h3 className="readiness-card-title">Interview Readiness</h3>

                  <div className="readiness-score-row">
                    <div className="score-badge-circle">
                      <span className="score-num">{readinessScore}</span>
                      <span className="score-max">/ 100</span>
                    </div>
                    <div className="score-status-info">
                      <span className="status-label">Good Progress</span>
                      <p className="status-desc">
                        Your answer structure and technical keyword alignment are improving. Keep practicing!
                      </p>
                    </div>
                  </div>

                  <div className="disclaimer-note">
                    <ShieldAlert size={14} />
                    <span>
                      This is an NDRise preparation indicator based on your practice activity and answers. It is not a prediction of interview outcomes.
                    </span>
                  </div>
                </div>

                {/* Progress & Stats Card */}
                <div className="section-card glass-panel stats-card">
                  <h3 className="card-section-title">Practice Metrics</h3>
                  
                  <div className="stats-row">
                    <div className="stat-item-box">
                      <div className="stat-icon-wrap icon-flame">
                        <Flame size={20} />
                      </div>
                      <div>
                        <div className="stat-val">{streakDays} Days</div>
                        <div className="stat-lbl">Current Streak</div>
                      </div>
                    </div>

                    <div className="stat-item-box">
                      <div className="stat-icon-wrap icon-check">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <div className="stat-val">{questionsPracticed}</div>
                        <div className="stat-lbl">Questions Practiced</div>
                      </div>
                    </div>
                  </div>

                  <div className="category-progress-list">
                    <div className="prog-item">
                      <div className="prog-label"><span>Technical Questions</span><strong>32 / 50</strong></div>
                      <div className="prog-bar"><div className="prog-fill" style={{ width: '64%' }}></div></div>
                    </div>
                    <div className="prog-item">
                      <div className="prog-label"><span>HR Questions</span><strong>18 / 30</strong></div>
                      <div className="prog-bar"><div className="prog-fill" style={{ width: '60%' }}></div></div>
                    </div>
                    <div className="prog-item">
                      <div className="prog-label"><span>Behavioral Questions</span><strong>12 / 20</strong></div>
                      <div className="prog-bar"><div className="prog-fill" style={{ width: '60%' }}></div></div>
                    </div>
                  </div>

                </div>
              </div>
            </FadeIn>

            {/* Daily Practice & Question of the Day Banner */}
            <FadeIn direction="up" delay={0.15}>
              <div className="daily-practice-grid">
                
                <motion.div className="daily-card glass-panel" whileHover={{ y: -4, scale: 1.01 }}>
                  <div className="daily-header">
                    <Flame size={22} color="#f59e0b" />
                    <h4>Daily Interview Practice</h4>
                  </div>
                  <p className="daily-text">Practice 5 targeted questions today to maintain your streak.</p>
                  <div className="daily-meta">
                    <span>⚡ 5 Questions</span>
                    <span>⏱ ~10 Minutes</span>
                  </div>
                  <motion.button 
                    type="button" 
                    className="btn-secondary btn-daily-action"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCategory('Technical')}
                  >
                    <span>Start Today's Practice →</span>
                  </motion.button>
                </motion.div>

                <motion.div className="qotd-card glass-panel" whileHover={{ y: -4, scale: 1.01 }}>
                  <div className="qotd-header">
                    <Lightbulb size={22} color="#38bdf8" />
                    <h4>Question of the Day</h4>
                  </div>
                  <p className="qotd-question">"{QUESTION_OF_THE_DAY.question}"</p>
                  <p className="qotd-hint">Hint: {QUESTION_OF_THE_DAY.hint}</p>
                  <motion.button 
                    type="button" 
                    className="btn-primary btn-qotd-action"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveQuestions([QUESTION_OF_THE_DAY]);
                      setCurrentIndex(0);
                      setViewState('practice');
                    }}
                  >
                    <span>Practice Answer →</span>
                  </motion.button>
                </motion.div>

              </div>
            </FadeIn>

            {/* Preparation Setup Card */}
            <div className="section-card glass-panel setup-card" id="setup-card-section">
              <h3 className="section-heading">Prepare For Your Interview</h3>
              
              <div className="setup-form-grid">
                
                {/* Target Role Dropdown */}
                <div className="field-box">
                  <label>Target Role</label>
                  <select 
                    className="setup-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {TARGET_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Experience Level */}
                <div className="field-box">
                  <label>Experience Level</label>
                  <div className="pill-group">
                    {EXPERIENCE_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        className={`pill-btn ${experienceLevel === lvl ? 'active' : ''}`}
                        onClick={() => setExperienceLevel(lvl)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interview Type */}
                <div className="field-box">
                  <label>Interview Type</label>
                  <div className="pill-group">
                    {INTERVIEW_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={`pill-btn ${interviewType === t ? 'active' : ''}`}
                        onClick={() => setInterviewType(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preparation Mode */}
                <div className="field-box">
                  <label>Preparation Mode</label>
                  <div className="pill-group">
                    {PREP_MODES.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`pill-btn ${prepMode === m ? 'active' : ''}`}
                        onClick={() => setPrepMode(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <button 
                type="button" 
                className="btn-primary btn-start-prep"
                onClick={handleStartSetup}
              >
                <span>Start Preparation →</span>
              </button>
            </div>

            {/* Category Cards */}
            <div className="section-card glass-panel categories-section">
              <h3 className="section-heading">Interview Categories</h3>
              
              <div className="category-cards-grid">
                {INTERVIEW_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="category-card">
                    <div className="cat-icon-badge">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <h4 className="cat-title">{cat.title}</h4>
                    <p className="cat-desc">{cat.description}</p>
                    
                    <div className="cat-bottom-row">
                      <span className="cat-count">{cat.count} Questions</span>
                      <button 
                        type="button" 
                        className="btn-secondary btn-cat-start"
                        onClick={() => handleSelectCategory(cat.id)}
                      >
                        <span>Start Practice →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 3. Question Practice View */}
        {viewState === 'practice' && currentQuestion && (
          <div className="section-card glass-panel practice-card animate-fade-in">
            
            <div className="practice-header-bar">
              <div className="meta-left">
                <span className="counter-badge">
                  Question {currentIndex + 1} / {activeQuestions.length}
                </span>
                <span className="role-tag">{selectedRole}</span>
                <span className="cat-tag">{currentQuestion.category}</span>
              </div>
              
              <button 
                type="button" 
                className="btn-back-link"
                onClick={() => setViewState('dashboard')}
              >
                Exit Practice
              </button>
            </div>

            <div className="question-content-box">
              <h2 className="question-text">"{currentQuestion.question}"</h2>
            </div>

            {/* Quick Action Helpers */}
            <div className="quick-actions-bar">
              <button 
                type="button" 
                className="action-chip"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb size={16} color="#fbbf24" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              <button 
                type="button" 
                className="action-chip"
                onClick={() => setUserAnswer('I am familiar with this concept.')}
              >
                <CheckCircle2 size={16} color="#34d399" />
                <span>I Know This</span>
              </button>

              <button 
                type="button" 
                className="action-chip"
                onClick={() => setShowHint(true)}
              >
                <HelpCircle size={16} color="#38bdf8" />
                <span>Need Help</span>
              </button>

              <button 
                type="button" 
                className="action-chip"
                onClick={handleNextQuestion}
              >
                <span>Skip</span>
              </button>
            </div>

            {showHint && (
              <div className="hint-banner animate-fade-in">
                <Lightbulb size={18} color="#fbbf24" />
                <span><strong>Hint:</strong> {currentQuestion.hint}</span>
              </div>
            )}

            {/* Answer Input Form */}
            <form onSubmit={handleSubmitAnswer} className="answer-form">
              <label className="answer-label">Write your answer here...</label>
              <textarea 
                className="answer-textarea"
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Structure your answer clearly with explanation and practical examples..."
              />

              <div className="form-submit-row">
                <button 
                  type="submit" 
                  className="btn-primary btn-submit-answer"
                >
                  <span>Submit Answer →</span>
                </button>
              </div>
            </form>

          </div>
        )}

        {/* 4. Educational Answer Feedback View */}
        {viewState === 'feedback' && currentQuestion && (
          <div className="section-card glass-panel feedback-card animate-fade-in">
            
            <div className="feedback-header">
              <span className="rating-badge rating-good">Evaluation: Good</span>
              <h2 className="feedback-question">"{currentQuestion.question}"</h2>
            </div>

            <div className="feedback-comparison-grid">
              
              {/* Student's Answer */}
              <div className="answer-box student-box">
                <h4 className="box-title">Your Answer</h4>
                <p className="box-text">
                  {userAnswer.trim() ? userAnswer : '(No text answer entered)'}
                </p>
              </div>

              {/* Suggested Answer */}
              <div className="answer-box exemplar-box">
                <h4 className="box-title">Suggested Exemplar Answer</h4>
                <p className="box-text">{currentQuestion.suggestedAnswer}</p>
              </div>

            </div>

            {/* Recruiter Expectations */}
            <div className="expectations-box">
              <h4 className="box-title">What a Recruiter Looks For:</h4>
              <ul className="expectations-list">
                {currentQuestion.expectations.map((exp, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} color="#34d399" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* STAR Framework Explanation for Behavioral Questions */}
            {currentQuestion.category === 'Behavioral' && (
              <div className="star-framework-box">
                <h4 className="star-title">⭐ STAR Framework Guidance</h4>
                <div className="star-grid">
                  {Object.values(STAR_FRAMEWORK).map((item) => (
                    <div key={item.letter} className="star-item">
                      <span className="star-letter">{item.letter}</span>
                      <div>
                        <strong>{item.title}:</strong> {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Tip */}
            <div className="tip-box">
              <Lightbulb size={18} color="#38bdf8" />
              <span><strong>How to Improve:</strong> {currentQuestion.improvementTip}</span>
            </div>

            {/* Navigation Actions */}
            <div className="feedback-actions-bar">
              <button 
                type="button" 
                className="btn-primary"
                onClick={handleNextQuestion}
              >
                <span>Next Question →</span>
              </button>

              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleTryAgain}
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>

              <button 
                type="button" 
                className="btn-outline"
                onClick={() => setViewState('dashboard')}
              >
                <span>Return to Dashboard</span>
              </button>
            </div>

          </div>
        )}

        {/* 5. Mock Interview Final Score Result View */}
        {viewState === 'mock-result' && (
          <div className="section-card glass-panel result-card animate-fade-in">
            <div className="result-header">
              <span className="result-tag">MOCK INTERVIEW SUMMARY</span>
              <h2 className="result-title">Interview Readiness Result</h2>
            </div>

            <div className="result-meter-row">
              <div className="result-score-circle">
                <span className="score-num">78</span>
                <span className="score-max">/ 100</span>
              </div>
              <div className="result-meta">
                <h3>Good Progress!</h3>
                <p>You demonstrated strong technical knowledge and clear articulation.</p>
              </div>
            </div>

            <div className="result-breakdown-list">
              <h4 className="breakdown-title">Skill Breakdown</h4>
              <div className="prog-item">
                <div className="prog-label"><span>Communication</span><strong>82%</strong></div>
                <div className="prog-bar"><div className="prog-fill" style={{ width: '82%' }}></div></div>
              </div>
              <div className="prog-item">
                <div className="prog-label"><span>Technical Knowledge</span><strong>76%</strong></div>
                <div className="prog-bar"><div className="prog-fill" style={{ width: '76%' }}></div></div>
              </div>
              <div className="prog-item">
                <div className="prog-label"><span>Confidence</span><strong>74%</strong></div>
                <div className="prog-bar"><div className="prog-fill" style={{ width: '74%' }}></div></div>
              </div>
              <div className="prog-item">
                <div className="prog-label"><span>Problem Solving</span><strong>81%</strong></div>
                <div className="prog-bar"><div className="prog-fill" style={{ width: '81%' }}></div></div>
              </div>
            </div>

            <div className="result-actions-bar">
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => handleSelectCategory('Technical')}
              >
                <span>Practice Technical Questions</span>
              </button>

              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => handleSelectCategory('HR')}
              >
                <span>Practice HR Questions</span>
              </button>

              <button 
                type="button" 
                className="btn-outline"
                onClick={() => setViewState('dashboard')}
              >
                <span>Back to Overview</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
