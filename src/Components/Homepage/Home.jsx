import React from 'react';
import Banner from './Banner';
import FeaturedSection from './FeaturedSection';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
import HowItWorks from './HowItWorks';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <HowItWorks></HowItWorks>
      <ContactUs></ContactUs>
      <FAQ></FAQ>
      
    </div>
  );
};

export default Home;