import React from 'react';
import { Users, Briefcase, RefreshCw, Award } from 'lucide-react';
import './Stats.css';

export default function Stats() {
  const stats = [
    {
      id: 'students',
      icon: Users,
      number: '12,540+',
      label: 'Students Enrolled',
      iconBg: 'rgba(168, 85, 247, 0.15)',
      iconColor: '#c084fc',
      borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      id: 'internships',
      icon: Briefcase,
      number: '150+',
      label: 'Internships',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818cf8',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    {
      id: 'projects',
      icon: RefreshCw,
      number: '500+',
      label: 'Projects Completed',
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#38bdf8',
      borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    {
      id: 'certificates',
      icon: Award,
      number: '7,950+',
      label: 'Certificates Issued',
      iconBg: 'rgba(52, 211, 153, 0.15)',
      iconColor: '#34d399',
      borderColor: 'rgba(52, 211, 153, 0.3)',
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="glass-panel stat-card">
              <div 
                className="stat-icon-wrapper" 
                style={{ 
                  background: stat.iconBg, 
                  color: stat.iconColor,
                  borderColor: stat.borderColor 
                }}
              >
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
