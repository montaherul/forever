import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import ReviewsSlider from "../components/ReviewsSlider";
import SmartRecommendations from "../components/SmartRecommendations";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="py-8">
          <LatestCollection />
        </div>
        <div className="py-8">
          <BestSeller />
        </div>
        <div className="py-8">
          <SmartRecommendations />
        </div>
        <div className="py-8">
          <ReviewsSlider />
        </div>
        <div className="py-8">
          <OurPolicy />
        </div>
        <div className="py-8">
          <NewsletterBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
