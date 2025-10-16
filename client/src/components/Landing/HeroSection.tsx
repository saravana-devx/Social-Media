import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="select-none w-4/5 mt-16 flex flex-col justify-center items-center mx-auto gap-y-4 ">
      <h1 className="text-6xl font-extrabold  bg-clip-text text-transparent leading-tight 
      bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500
      ">
        <span className="block text-center">Share Your World</span>
        <span className="block text-center">Connect With Others</span>
      </h1>

      <p className="mt-4 max-w-xl text-xl text-black text-center">
        Capture moments, discover stories, and be part of a community that
        inspires you.
      </p>

      <div className="mt-6 flex gap-4">
        <Button
          onClick={() => navigate("/register")}
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-xl text-white shadow-lg px-8 py-6 rounded-3xl font-bold uppercase tracking-wide transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          Sign Up Free
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
