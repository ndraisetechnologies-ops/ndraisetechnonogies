import React from 'react';
import { ArrowRight, ChevronRight, Atom, Server, Terminal, BarChart2 } from 'lucide-react';
import './PopularInternships.css';

export const POPULAR_INTERNSHIPS_DATA = [
  {
    id: 'react-dev',
    title: 'React Development',
    duration: '8 Weeks',
    level: 'Beginner',
    description: 'Learn React, Hooks, Context API, React Router and build real-world projects.',
    icon: Atom,
    iconColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    skills: ['HTML/CSS/JS', 'React.js', 'Hooks & State', 'React Router', 'API Integration']
  },
  {
    id: 'node-dev',
    title: 'Node.js Development',
    duration: '8 Weeks',
    level: 'Beginner',
    description: 'Learn Node.js, Express, REST APIs, MongoDB and build backend apps.',
    icon: Server,
    iconColor: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.15)',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Auth']
  },
  {
    id: 'python-dev',
    title: 'Python Development',
    duration: '8 Weeks',
    level: 'Beginner',
    description: 'Learn Python programming, OOPs, Flask, APIs and real-world projects.',
    icon: Terminal,
    iconColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.15)',
    skills: ['Python 3', 'OOPs', 'Flask', 'Data Structures', 'Git']
  },
  {
    id: 'data-science',
    title: 'Data Science',
    duration: '10 Weeks',
    level: 'Intermediate',
    description: 'Learn Python, Statistics, ML, Data Analysis and Visualization.',
    icon: BarChart2,
    iconColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.15)',
    skills: ['Pandas & NumPy', 'Scikit-learn', 'Statistics', 'Matplotlib', 'ML Models']
  }
];

export default function PopularInternships({ onSelectInternship, onViewAllClick }) {
  return (
    <section className="popular-section">
      <div className="popular-header">
        <h2 className="popular-title">Popular Internships</h2>
        <span className="view-all-link" onClick={onViewAllClick}>
          View All Internships <ArrowRight size={16} />
        </span>
      </div>

      <div className="internships-grid">
        {POPULAR_INTERNSHIPS_DATA.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="glass-panel internship-card">
              <div 
                className="card-icon-box"
                style={{ 
                  background: item.glowColor, 
                  color: item.iconColor 
                }}
              >
                <Icon size={32} />
              </div>

              <h3 className="card-title">{item.title}</h3>

              <div className="card-meta">
                <span>{item.duration}</span>
                <span className="meta-divider"></span>
                <span>{item.level}</span>
              </div>

              <p className="card-desc">{item.description}</p>

              <button className="card-btn" onClick={() => onSelectInternship(item)}>
                <span>View Details</span>
                <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
