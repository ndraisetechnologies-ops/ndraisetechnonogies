import React from 'react';
import Hero from '../../components/Hero/Hero';
import Stats from '../../components/Stats/Stats';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import PopularInternships from '../../components/PopularInternships/PopularInternships';
import DarkProofSection from '../../components/DarkProofSection/DarkProofSection';
import ProjectShowcase from '../../components/ProjectShowcase/ProjectShowcase';
import CertificateShowcase from '../../components/CertificateShowcase/CertificateShowcase';
import Testimonials from '../../components/Testimonials/Testimonials';
import FAQ from '../../components/FAQ/FAQ';
import CollegeSection from '../../components/CollegeSection/CollegeSection';
import CTA from '../../components/CTA/CTA';
import './Home.css';

export default function Home({ 
  onSelectInternship, 
  onViewAllClick, 
  onGetStarted, 
  onVerifyClick, 
  onSubmitTaskClick, 
  onOpenTasksModal 
}) {
  return (
    <div className="home-page">
      {/* 1. Main Hero Section */}
      <Hero 
        onExploreClick={onViewAllClick}
        onVerifyClick={onVerifyClick}
        onSubmitTaskClick={onSubmitTaskClick}
      />

      {/* 2. Statistics Count-Up Section */}
      <Stats />

      {/* 3. How The Virtual Internship Works (Interactive Process Journey) */}
      <HowItWorks 
        onApplyClick={onViewAllClick}
        onVerifyClick={onVerifyClick}
        onSubmitTaskClick={onSubmitTaskClick}
      />

      {/* 4. Featured Internship Domains */}
      <PopularInternships 
        onSelectInternship={onSelectInternship}
        onViewAllClick={onViewAllClick}
        onOpenTasksModal={onOpenTasksModal}
      />

      {/* 5. Premium Dark Architecture Section: "Turn learning into proof." */}
      <DarkProofSection />

      {/* 6. Real Student Project Showcase */}
      <ProjectShowcase 
        onOpenTasksModal={onOpenTasksModal}
      />

      {/* 7. Authenticated Certificate Showcase Section */}
      <CertificateShowcase 
        onVerifyClick={onVerifyClick}
      />

      {/* 8. Student Testimonials Carousel */}
      <Testimonials />

      {/* 9. Frequently Asked Questions */}
      <FAQ />

      {/* 10. Infinite University & College Logo Marquee */}
      <CollegeSection />

      {/* 11. Final Call to Action */}
      <CTA onGetStarted={onGetStarted} />
    </div>
  );
}
