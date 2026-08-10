import React from 'react';
import { ArrowRight, ChevronRight, Atom, Server, Terminal, BarChart2, Cpu, Shield, Smartphone, Code } from 'lucide-react';
import { ALL_INTERNSHIPS } from '../../pages/Internships/InternshipsPage';
import './PopularInternships.css';

export default function PopularInternships({ onSelectInternship, onViewAllClick, onOpenTasksModal }) {
  const featured = ALL_INTERNSHIPS.slice(0, 4);

  return (
    <section className="popular-section">
      <div className="popular-header">
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            FEATURED VIRTUAL TRACKS
          </div>
          <h2 className="popular-title">Explore <span>Featured Domains</span></h2>
        </div>
        <span className="view-all-link" onClick={onViewAllClick}>
          <span>View All 8 Domains</span> <ArrowRight size={16} />
        </span>
      </div>

      <div className="internships-grid">
        {featured.map((item) => {
          const Icon = item.icon || Code;
          const glowColor = item.glowColor || 'rgba(59, 130, 246, 0.15)';
          const iconColor = item.iconColor || '#3b82f6';
          const level = item.level || 'Intermediate';
          return (
            <div key={item.id} className="glass-panel internship-card">
              <div 
                className="card-icon-box"
                style={{ 
                  background: glowColor, 
                  color: iconColor 
                }}
              >
                <Icon size={32} />
              </div>

              <div className="card-tag-row">
                <span className="badge-4weeks">4-Week Track</span>
                <span className="badge-tasks">3 Assigned Tasks</span>
              </div>

              <h3 className="card-title">{item.title}</h3>

              <div className="card-meta">
                <span>⏱ {item.duration}</span>
                <span className="meta-divider"></span>
                <span>🎯 {item.level}</span>
              </div>

              <p className="card-desc">{item.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
                <button 
                  className="btn-secondary" 
                  style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem' }}
                  onClick={() => onOpenTasksModal && onOpenTasksModal(item)}
                >
                  View Tasks
                </button>
                <button 
                  className="btn-primary" 
                  style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem' }}
                  onClick={() => onSelectInternship(item)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
