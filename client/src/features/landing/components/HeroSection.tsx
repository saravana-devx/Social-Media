import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="select-none w-4/5 mt-16 flex flex-col justify-center items-center mx-auto gap-y-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight"
      >
        <span className="block text-center">Share Your World</span>
        <span className="block text-center">Connect With Others</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 max-w-xl text-xl text-foreground text-center"
      >
        Capture moments, discover stories, and be part of a community that inspires you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 flex gap-4"
      >
        <Button
          onClick={() => navigate("/auth/register")}
          size="lg"
          className="bg-gradient-to-r from-primary via-accent to-primary text-lg text-primary-foreground shadow-lg px-8 py-6 rounded-3xl font-bold uppercase tracking-wide transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          Get Started Free
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
