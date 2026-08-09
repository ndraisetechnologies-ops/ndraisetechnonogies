import React from 'react';
import Hero from '../../components/Hero/Hero';
import Stats from '../../components/Stats/Stats';
import PopularInternships from '../../components/PopularInternships/PopularInternships';
import CollegeSection from '../../components/CollegeSection/CollegeSection';
import CTA from '../../components/CTA/CTA';
import './Home.css';

export default function Home({ onSelectInternship, onViewAllClick, onGetStarted }) {
  return (
    <div className="home-page">
      <Hero 
        onExploreClick={onViewAllClick}
        onHowItWorksClick={onViewAllClick}
      />
      <Stats />
      <PopularInternships 
        onSelectInternship={onSelectInternship}
        onViewAllClick={onViewAllClick}
      />
      <CollegeSection />
      <CTA onGetStarted={onGetStarted} />
    </div>
  );
}
