import React from 'react';
import { Star, Linkedin, Quote, Award } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Siddharth Patel',
    domain: 'Web Development Intern',
    batch: 'July 2026 Batch',
    college: 'BITS Pilani',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    quote: 'The 4-week Web Development track at ND Raise Technologies was incredible! Building the portfolio and e-commerce UI tasks gave me code for my GitHub. The verifiable certificate helped me land my first software internship!'
  },
  {
    name: 'Ananya Sharma',
    domain: 'Data Science Intern',
    batch: 'June 2026 Batch',
    college: 'Delhi Technological University (DTU)',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: 'Loved the task-oriented structure! The assigned EDA and machine learning classification tasks were practical. The QR verification feature on the certificate is impressive when sharing on LinkedIn!'
  },
  {
    name: 'Rohan Deshmukh',
    domain: 'Python Programming Intern',
    batch: 'July 2026 Batch',
    college: 'VJT Mumbai',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Receiving the official Offer Letter on day one gave me confidence. The web scraping task using BeautifulSoup was challenging and fun. Highly recommend to engineering students!'
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-tag">
            <Quote size={16} />
            <span>INTERN SUCCESS STORIES</span>
          </div>
          <h2 className="testimonials-title">
            Loved By <span>50,000+ Students</span>
          </h2>
          <p className="testimonials-subtitle">
            See how CodeAlpha virtual internship programs helped students build portfolio projects and launch their tech careers.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-card glass-panel animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="testimonial-quote">"{t.quote}"</p>

              <div className="author-row">
                <img src={t.photo} alt={t.name} className="author-avatar" />
                <div className="author-details">
                  <div className="author-name">{t.name}</div>
                  <div className="author-domain">{t.domain} • {t.batch}</div>
                  <div className="author-college">{t.college}</div>
                </div>
                <div className="linkedin-badge" title="Verified LinkedIn Intern Review">
                  <Linkedin size={18} color="#0077b5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
