import React from 'react';
import Hero from '../../components/Hero/Hero';
import Stats from '../../components/Stats/Stats';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import PopularInternships from '../../components/PopularInternships/PopularInternships';
import CertificateVerifier from '../../components/CertificateVerifier/CertificateVerifier';
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
      <Hero 
        onExploreClick={onViewAllClick}
        onVerifyClick={onVerifyClick}
        onSubmitTaskClick={onSubmitTaskClick}
      />
      <Stats />
      <HowItWorks 
        onApplyClick={onViewAllClick}
        onVerifyClick={onVerifyClick}
        onSubmitTaskClick={onSubmitTaskClick}
      />
      <PopularInternships 
        onSelectInternship={onSelectInternship}
        onViewAllClick={onViewAllClick}
        onOpenTasksModal={onOpenTasksModal}
      />
      <CertificateVerifier />
      <Testimonials />
      <FAQ />
      <CollegeSection />
      <CTA onGetStarted={onGetStarted} />
    </div>
  );
}
