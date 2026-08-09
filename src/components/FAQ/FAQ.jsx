import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import './FAQ.css';

const FAQ_ITEMS = [
  {
    question: 'How does the ND Raise Virtual Internship program work?',
    answer: 'The ND Raise Virtual Internship is a 4-week self-paced online program. Once you apply, you receive an official Offer Letter and domain task guidelines. You complete 2–3 assigned project tasks, upload your code to GitHub, share progress on LinkedIn tagging #ndraisetechnologies, and submit your project links for certificate issuance.'
  },
  {
    question: 'Is there any registration fee for the virtual internship?',
    answer: 'No! Applying for and participating in the 4-week virtual internship program is 100% free for all students. ND Raise Technologies is committed to providing accessible hands-on project experience to learners nationwide.'
  },
  {
    question: 'When will I receive my official Offer Letter?',
    answer: 'After submitting your application form, your profile is verified within 24 hours. Your official Offer Letter will be generated directly in your student dashboard and sent to your registered email address.'
  },
  {
    question: 'What are the criteria to earn the Verifiable Certificate & LOR?',
    answer: 'To qualify for the verifiable digital certificate and Letter of Recommendation (LOR), you must complete at least 2 out of the 3 assigned tasks in your domain, push your code to a public GitHub repository, and submit the task form before the batch deadline.'
  },
  {
    question: 'How can employers or recruiters verify my certificate?',
    answer: 'Every certificate issued by ND Raise Technologies features a unique Certificate Verification ID (e.g. NDR-2026-1042) and QR code. Recruiters can enter this ID into our instant Certificate Verifier tool on this website to view your authenticated credentials.'
  },
  {
    question: 'Can I apply for multiple domains simultaneously?',
    answer: 'Yes, students are welcome to apply for up to 2 domain tracks (e.g. Web Development + Data Science) provided they can complete the assigned task requirements within the 4-week duration.'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faqs">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-tag">
            <HelpCircle size={16} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="faq-title">
            Got Questions? <span>We’ve Got Answers</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about ND Raise virtual internship tracks, task submissions, offer letters, and certificate verification.
          </p>
        </div>

        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-panel ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question">{item.question}</h3>
                  <ChevronDown className={`faq-chevron ${isOpen ? 'rotate' : ''}`} size={20} />
                </div>
                {isOpen && (
                  <div className="faq-answer-body animate-fade-in">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-contact-card glass-panel">
          <MessageSquare size={24} color="#38bdf8" />
          <div>
            <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>Still have questions?</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Reach out to our student support team at support@ndraise.com</div>
          </div>
        </div>
      </div>
    </section>
  );
}
