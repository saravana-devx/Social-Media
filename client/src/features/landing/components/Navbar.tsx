import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="w-full md:w-4/5 mx-auto flex justify-start items-center p-4">
      <button
        onClick={() => navigate('/')}
        className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
      >
        Social Media
      </button>
    </nav>
  );
};

export default Navbar;
