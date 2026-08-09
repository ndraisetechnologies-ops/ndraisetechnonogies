import React from 'react';
import { GraduationCap, Landmark, Building2, BookOpenCheck } from 'lucide-react';
import './CollegeSection.css';

export default function CollegeSection() {
  const colleges = [
    { id: 'iitm', name: 'IIT Madras', initials: 'IIT' },
    { id: 'nitt', name: 'NIT Trichy', initials: 'NIT' },
    { id: 'vit', name: 'NIT Vellore', initials: 'NIT' },
    { id: 'srm', name: 'SRM Institute', initials: 'SRM' },
    { id: 'amrita', name: 'Amrita University', initials: 'AMR' },
    { id: 'manipal', name: 'Manipal University', initials: 'MAHE' }
  ];

  return (
    <section className="college-section">
      <h3 className="college-title">Trusted by Students from Top Colleges</h3>

      <div className="college-grid">
        {colleges.map((c) => (
          <div key={c.id} className="college-badge">
            <div className="college-icon-circle">
              {c.initials}
            </div>
            <span>{c.name}</span>
          </div>
        ))}
      </div>

      <div className="college-pagination">
        <div className="pagination-dot"></div>
        <div className="pagination-dot active"></div>
        <div className="pagination-dot"></div>
        <div className="pagination-dot"></div>
      </div>
    </section>
  );
}
