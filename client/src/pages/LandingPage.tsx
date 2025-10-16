import Footer from "@/components/Shared/Layout/Footer";
import FeatureCard from "@/components/Landing/FeatureCard";
import HeroSection from "@/components/Landing/HeroSection";
import Navbar from "@/components/Landing/Navbar";
import StatsSection from "@/components/Landing/StatsSection";
import ScrollStorytelling from "@/components/Landing/StoryTelling";
import TestimonialSection from "@/components/Landing/Testimonial";
import WebsiteView from "@/components/Landing/WebsiteView";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="w-full mx-auto relative ">
      <img
        src="https://stackbros.in/social/assets/images/elements/07.svg"
        className="right-0 top-[270px] absolute w-96 h-96 blur-[154px] "
        alt=""
      />
      <img
        src="https://stackbros.in/social/assets/images/elements/01.svg"
        alt=""
        className="absolute w-96 h-96 blur-[154px] -z-10 md:z-10"
      />
      <Navbar />
      <HeroSection />
      <WebsiteView />
      <FeatureCard />
      <ScrollStorytelling />
      <TestimonialSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;




