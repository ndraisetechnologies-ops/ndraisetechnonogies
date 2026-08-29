import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import './ContactUsPage.css';

export default function ContactUsPage({ user, setCurrentView }) {
  const [fullName, setFullName] = useState(user ? user.name || '' : '');
  const [email, setEmail] = useState(user ? user.email || '' : '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    setMessage('');
    setPhone('');

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        
        {/* Header Section */}
        <FadeIn direction="up">
          <div className="contact-hero">
            <div className="contact-tag">
              CONTACT US
            </div>

            <h1 className="contact-title">
              Let's Start a <span className="highlight-conversation">Conversation</span>
            </h1>

            <p className="contact-subtitle">
              Have questions about our internships or courses? We're here to help you accelerate your tech career.
            </p>
          </div>
        </FadeIn>

        {/* Main Content Layout */}
        <div className="contact-content-grid">
          
          {/* Left Column: Contact Info Cards */}
          <StaggerContainer className="contact-info-cards" staggerChildren={0.08}>
            
            {/* Card 1: Visit Us */}
            <StaggerItem>
              <motion.div className="info-card" whileHover={{ y: -5, scale: 1.015 }}>
                <div className="info-icon-badge">
                  <MapPin size={20} color="#2563eb" />
                </div>
                <div className="info-card-text">
                  <h3 className="info-card-title">Visit Us</h3>
                  <p className="info-card-detail">Lucknow, Uttar Pradesh, India</p>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Card 2: Email Us */}
            <StaggerItem>
              <motion.div className="info-card" whileHover={{ y: -5, scale: 1.015 }}>
                <div className="info-icon-badge">
                  <Mail size={20} color="#2563eb" />
                </div>
                <div className="info-card-text">
                  <h3 className="info-card-title">Email Us</h3>
                  <a href="mailto:support@ndraisetechnologies.com" className="info-card-link">
                    support@ndraisetechnologies.com
                  </a>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Card 3: Call Us */}
            {/* <StaggerItem>
              <motion.div className="info-card" whileHover={{ y: -5, scale: 1.015 }}>
                <div className="info-icon-badge">
                  <Phone size={20} color="#2563eb" />
                </div>
                <div className="info-card-text">
                  <h3 className="info-card-title">Call Us</h3>
                  <a href="tel:+915223369892" className="info-card-link">
                    +91 522 3369892
                  </a>
                </div>
              </motion.div>
            </StaggerItem> */}

          </StaggerContainer>

          {/* Right Column: Send Us a Message Form */}
          <div className="contact-form-card">
            {/* Top Accent Gradient Bar */}
            <div className="form-card-top-accent"></div>

            <div className="form-card-body">
              <h2 className="form-card-heading">Send us a message</h2>

              {submitted && (
                <div className="contact-success-banner">
                  <CheckCircle2 size={18} />
                  <span>Thank you! Your message has been sent. Our team will get back to you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                
                {/* Row 1: Full Name & Email Address */}
                <div className="form-row-2col">
                  <div className="contact-field">
                    <label className="contact-label">Full Name</label>
                    <input 
                      type="text"
                      required
                      className="contact-input"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="contact-field">
                    <label className="contact-label">Email Address</label>
                    <input 
                      type="email"
                      required
                      className="contact-input"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="contact-field">
                  <label className="contact-label">Phone Number</label>
                  <input 
                    type="tel"
                    className="contact-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Row 3: Your Message */}
                <div className="contact-field">
                  <label className="contact-label">Your Message</label>
                  <textarea 
                    rows={4}
                    required
                    className="contact-textarea"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Row 4: Submit Button */}
                <button type="submit" className="contact-submit-btn">
                  <span>Send Message</span>
                  <Send size={16} />
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
