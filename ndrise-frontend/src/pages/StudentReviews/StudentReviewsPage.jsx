import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
import { Star, Search, PlusCircle, Heart, Home, Send, Quote, CheckCircle2 } from 'lucide-react';
import './StudentReviewsPage.css';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Muhammad Taha',
    role: 'Web Dev intern',
    initial: 'M',
    quote: 'Great experience with ND RAISE Technologies, enhanced my skills and allowed me to put the verified certificate on my resume',
    rating: 5,
    category: 'Web Development'
  },
  {
    id: 2,
    name: 'Mohamed Khaled Rammah',
    role: 'Machine Learning Intern',
    initial: 'M',
    quote: 'The project was well structured and offered practical work that helped me grow professionally.',
    rating: 4,
    category: 'Machine Learning'
  },
  {
    id: 3,
    name: 'N Srujana',
    role: 'App Development Intern',
    initial: 'N',
    quote: 'The internship helped me work on ideas and improve my application development skills.',
    rating: 5,
    category: 'App Development'
  },
  {
    id: 4,
    name: 'Shihab Sarar',
    role: 'Machine Learning Intern',
    initial: 'S',
    quote: 'The projects were exciting, creative, and helped me gain practical experience.',
    rating: 5,
    category: 'Machine Learning'
  },
  {
    id: 5,
    name: 'Priyanka Dubakula',
    role: 'Python Programming Intern',
    initial: 'P',
    quote: 'The way tasks were assigned helped me gain practical knowledge and improve my skills.',
    rating: 5,
    category: 'Python'
  },
  {
    id: 6,
    name: 'Saqlain Hassan',
    role: 'Frontend Development Intern',
    initial: 'S',
    quote: 'Working on real-time projects helped me understand concepts better and improve my development skills.',
    rating: 5,
    category: 'Frontend'
  },
  {
    id: 7,
    name: 'Rohan Verma',
    role: 'Web Development Intern',
    initial: 'R',
    quote: 'The 4-week Web Development internship at ND RAISE Technologies gave me practical project experience that I could highlight on my resume.',
    rating: 5,
    category: 'Web Development'
  },
  {
    id: 8,
    name: 'Ananya Sharma',
    role: 'Python Programming Intern',
    initial: 'A',
    quote: 'Awesome virtual internship platform! The structure of the weekly tasks forced me to write clean code and learn key libraries.',
    rating: 5,
    category: 'Python'
  },
  {
    id: 9,
    name: 'Vikramaditya Nair',
    role: 'Machine Learning Intern',
    initial: 'V',
    quote: 'Working on actual machine learning datasets and deploying predictive models was an eye-opener. Highly recommended!',
    rating: 5,
    category: 'Machine Learning'
  }
];

export default function StudentReviewsPage({ user, setCurrentView }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Form State for "Share Your Story"
  const [formName, setFormName] = useState(user ? user.name : '');
  const [formRole, setFormRole] = useState('');
  const [formFeedback, setFormFeedback] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories = [
    'All',
    'Web Development',
    'Machine Learning',
    'App Development',
    'Python',
    'Frontend'
  ];

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      r.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      r.role.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formFeedback.trim()) return;

    const newRev = {
      id: Date.now(),
      name: formName.trim(),
      role: formRole.trim() || 'Intern',
      initial: formName.trim().charAt(0).toUpperCase(),
      quote: formFeedback.trim(),
      rating: formRating,
      category: formRole.trim() || 'General'
    };

    setReviews([newRev, ...reviews]);
    setSubmittedSuccess(true);
    setFormFeedback('');
    setFormRole('');

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 5000);
  };

  const handleBackToHome = () => {
    if (typeof setCurrentView === 'function') {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="reviews-page">
      <div className="reviews-container">
        
        {/* Header Section */}
        <FadeIn direction="up">
          <div className="reviews-hero">
            <div className="community-voices-tag">
              COMMUNITY VOICES
            </div>

            <h1 className="reviews-title">
              Student <span className="highlight-feedback">Feedback</span>
            </h1>

            <p className="reviews-subtitle">
              See what our interns have to say about their journey with ND RAISE Technologies. Your experience matters to us.
            </p>
          </div>
        </FadeIn>

        {/* Toolbar: Search and Category Filter Chips */}
        <div className="reviews-toolbar">
          <div className="search-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search reviews by student name or role..."
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
        </div>

        {/* Reviews Grid */}
        <StaggerContainer className="reviews-grid" staggerChildren={0.06}>
          {filteredReviews.map((rev) => (
            <StaggerItem key={rev.id}>
              <motion.div className="review-card" whileHover={{ y: -6, scale: 1.015 }}>
                {/* Double Quote Symbol */}
                <div className="quote-icon-wrap">
                  <Quote size={28} className="quote-icon" />
                </div>

                {/* Quote Text */}
                <p className="review-quote-text">
                  "{rev.quote}"
                </p>

                {/* Card Footer */}
                <div className="review-card-footer">
                  {/* Author Info */}
                  <div className="reviewer-info">
                    <div className="avatar-initial">
                      {rev.initial}
                    </div>
                    <div className="reviewer-details">
                      <h3 className="reviewer-name">{rev.name}</h3>
                      <span className="reviewer-role">{rev.role}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < rev.rating ? "#f59e0b" : "none"} 
                        color={i < rev.rating ? "#f59e0b" : "#cbd5e1"} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredReviews.length === 0 && (
          <div className="no-reviews-msg">
            <p>No reviews found matching your search.</p>
          </div>
        )}

        {/* Share Your Story Section */}
        <div className="share-story-section">
          <div className="share-story-card">
            {/* Top Gradient Accent Line */}
            <div className="card-top-accent"></div>

            <div className="share-story-content">
              
              {/* Left Column: Feedback Form */}
              <div className="story-form-col">
                <div className="story-header">
                  <div className="plus-icon-circle">
                    <PlusCircle size={22} color="#2563eb" />
                  </div>
                  <h2 className="story-title">Share Your Story</h2>
                </div>

                <p className="story-desc">
                  Your feedback helps us improve and guides future students. If you had a positive experience, we'd love to hear it!
                </p>

                {submittedSuccess && (
                  <div className="success-banner">
                    <CheckCircle2 size={18} />
                    <span>Thank you! Your feedback has been submitted successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSubmitFeedback} className="story-form">
                  <div className="form-row-2col">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        className="story-input" 
                        placeholder="e.g. Rahul Sharma"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Role</label>
                      <input 
                        type="text" 
                        className="story-input" 
                        placeholder="e.g. Web Dev Intern"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Feedback</label>
                    <textarea 
                      rows={4} 
                      required 
                      className="story-textarea" 
                      placeholder="Share your thoughts..."
                      value={formFeedback}
                      onChange={(e) => setFormFeedback(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Rating</label>
                    <div className="interactive-stars">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          type="button"
                          key={starVal}
                          className="star-btn"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormRating(starVal)}
                        >
                          <Star 
                            size={22} 
                            fill={(hoverRating || formRating) >= starVal ? "#f59e0b" : "none"} 
                            color={(hoverRating || formRating) >= starVal ? "#f59e0b" : "#cbd5e1"} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="story-submit-btn">
                    <Send size={16} />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Thank You Box */}
              <div className="thank-you-col">
                <div className="thank-you-card">
                  <div className="heart-icon-wrap">
                    <Heart size={54} color="#f43f5e" strokeWidth={1.5} className="pink-heart-icon" />
                  </div>

                  <h3 className="thank-you-title">Thank you for your contribution!</h3>

                  <p className="thank-you-desc">
                    Join our community and help us build the future of tech education.
                  </p>

                  <button onClick={handleBackToHome} className="back-home-btn" title="Back to Home" aria-label="Back to Home">
                    <Home size={16} />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
