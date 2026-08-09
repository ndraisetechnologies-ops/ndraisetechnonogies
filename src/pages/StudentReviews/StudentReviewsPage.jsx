import React, { useState } from 'react';
import { Star, Search, Filter, Quote, CheckCircle2, Linkedin, MessageSquare, ThumbsUp, Send, Award } from 'lucide-react';
import './StudentReviewsPage.css';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Rohan Verma',
    domain: 'Web Development Virtual Internship',
    college: 'IIT Delhi',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'August 02, 2026',
    verified: true,
    project: 'Full-Stack E-Commerce Platform',
    quote: 'The 4-week Web Development internship at ND Raise Technologies gave me practical project experience that I could highlight on my resume. The mentor guidance and real-world tasks boosted my confidence immensely!',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    domain: 'Python Programming Track',
    college: 'BITS Pilani',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'July 28, 2026',
    verified: true,
    project: 'Automated Web Scraper & Data Pipeline',
    quote: 'Awesome virtual internship platform! The structure of the weekly tasks forced me to write clean Python code and learn key libraries. Receiving the ISO 9001 verified certificate helped me land my summer tech job.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 3,
    name: 'Vikramaditya Nair',
    domain: 'Data Science & Machine Learning',
    college: 'NIT Trichy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'July 15, 2026',
    verified: true,
    project: 'Customer Churn Prediction Model',
    quote: 'Working on actual machine learning datasets and deploying predictive models was an eye-opener. The feedback on task submissions was precise. Highly recommended for pre-final year engineering students!',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 4,
    name: 'Priya Sundaram',
    domain: 'Cybersecurity Analyst',
    college: 'SRM Institute of Technology',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'June 30, 2026',
    verified: true,
    project: 'Vulnerability Assessment & Penetration Report',
    quote: 'I learned network scanning, Wireshark packet analysis, and ethical hacking concepts. The certificate verification feature is seamless when sharing on LinkedIn!',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 5,
    name: 'Karthik Raja',
    domain: 'UI/UX Design Track',
    college: 'VIT Vellore',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'June 18, 2026',
    verified: true,
    project: 'Fintech Mobile App Design System',
    quote: 'The Figma wireframing and prototyping tasks allowed me to build a stunning design portfolio. ND Raise Technologies provided an amazing learning environment.',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 6,
    name: 'Sneha Patel',
    domain: 'Android & Mobile App Development',
    college: 'Delhi Technological University',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'June 05, 2026',
    verified: true,
    project: 'Cross-Platform React Native App',
    quote: 'Building real mobile apps from scratch was challenging yet rewarding. The offer letter and LOR added genuine value during campus placements!',
    linkedin: 'https://linkedin.com'
  }
];

export default function StudentReviewsPage({ user }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review state
  const [newReview, setNewReview] = useState({
    name: user ? user.name : '',
    domain: 'Web Development Virtual Internship',
    college: '',
    rating: 5,
    quote: '',
    project: ''
  });

  const categories = [
    'All',
    'Web Development',
    'Python',
    'Data Science',
    'Cybersecurity',
    'UI/UX Design'
  ];

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      r.domain.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) return;

    const created = {
      id: Date.now(),
      name: newReview.name,
      domain: newReview.domain,
      college: newReview.college || 'Engineering Student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newReview.name}`,
      rating: Number(newReview.rating),
      date: 'Just Now',
      verified: true,
      project: newReview.project || 'Virtual Internship Project',
      quote: newReview.quote,
      linkedin: '#'
    };

    setReviews([created, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ name: '', domain: 'Web Development Virtual Internship', college: '', rating: 5, quote: '', project: '' });
    alert('Thank you! Your review has been published.');
  };

  return (
    <div className="reviews-page">
      <div className="reviews-container">
        {/* Page Hero Header */}
        <div className="reviews-hero">
          <div className="reviews-badge">
            <span className="badge-dot">•</span>
            <span>50,000+ HAPPY INTERNS & ALUMNI</span>
          </div>

          <h1 className="reviews-title">
            Student Reviews & <span>Success Stories</span>
          </h1>

          <p className="reviews-subtitle">
            Read real experiences, career transformations, and feedback from students who completed virtual internships at ND Raise Technologies.
          </p>

          {/* Stats Bar */}
          <div className="reviews-stats-strip glass-panel">
            <div className="stat-box">
              <div className="stat-val">4.9 / 5.0</div>
              <div className="stat-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <div className="stat-lbl">Average Rating</div>
            </div>

            <div className="stat-divider" />

            <div className="stat-box">
              <div className="stat-val">5,000+</div>
              <div className="stat-lbl">Student Reviews</div>
            </div>

            <div className="stat-divider" />

            <div className="stat-box">
              <div className="stat-val">98%</div>
              <div className="stat-lbl">Skill Growth Rate</div>
            </div>

            <div className="stat-divider" />

            <div className="stat-box">
              <div className="stat-val">15,000+</div>
              <div className="stat-lbl">LinkedIn Endorsements</div>
            </div>
          </div>
        </div>

        {/* Filter & Action Toolbar */}
        <div className="reviews-toolbar glass-panel">
          <div className="search-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search reviews by name, domain, or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-chips">
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <button 
            className="btn-primary write-review-btn"
            onClick={() => setShowReviewForm(true)}
          >
            <MessageSquare size={16} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Card Grid */}
        <div className="reviews-grid">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="review-card glass-panel">
              <div className="card-header">
                <img src={rev.avatar} alt={rev.name} className="reviewer-avatar" />
                <div className="reviewer-info">
                  <div className="name-row">
                    <h3 className="reviewer-name">{rev.name}</h3>
                    {rev.verified && (
                      <span className="verified-badge" title="Verified Intern">
                        <CheckCircle2 size={14} color="#34d399" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <div className="reviewer-domain">{rev.domain}</div>
                  <div className="reviewer-college">{rev.college}</div>
                </div>

                <a href={rev.linkedin} target="_blank" rel="noreferrer" className="linkedin-link" title="LinkedIn Profile">
                  <Linkedin size={18} color="#0077b5" />
                </a>
              </div>

              <div className="rating-row">
                <div className="stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              <div className="project-tag">
                <Award size={14} color="#38bdf8" />
                <span>Project: {rev.project}</span>
              </div>

              <p className="review-quote">
                "{rev.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* WRITE A REVIEW MODAL */}
        {showReviewForm && (
          <div className="modal-overlay animate-fade-in" onClick={() => setShowReviewForm(false)}>
            <div className="modal-content glass-panel" style={{ maxWidth: '580px', background: '#0b1120', border: '1px solid var(--border-glow)' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>Write a Student Review</h2>
                <button className="modal-close-btn" onClick={() => setShowReviewForm(false)}>✕</button>
              </div>

              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.4rem' }}>Your Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="Enter your name" 
                    value={newReview.name} 
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.4rem' }}>College / University</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. IIT Delhi, SRM Institute" 
                    value={newReview.college} 
                    onChange={(e) => setNewReview({ ...newReview, college: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.4rem' }}>Internship Domain</label>
                  <select 
                    className="form-input" 
                    value={newReview.domain} 
                    onChange={(e) => setNewReview({ ...newReview, domain: e.target.value })}
                  >
                    <option value="Web Development Virtual Internship">Web Development Virtual Internship</option>
                    <option value="Python Programming Track">Python Programming Track</option>
                    <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                    <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                    <option value="UI/UX Design Track">UI/UX Design Track</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.4rem' }}>Project Completed</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. E-Commerce Web App" 
                    value={newReview.project} 
                    onChange={(e) => setNewReview({ ...newReview, project: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '0.4rem' }}>Your Review & Experience</label>
                  <textarea 
                    rows={4} 
                    required 
                    className="form-input" 
                    placeholder="Share how the virtual internship helped your skills and career..." 
                    value={newReview.quote} 
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem', justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>Submit My Review</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
