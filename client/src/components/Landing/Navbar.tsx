import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="w-full md:w-4/5 mx-auto flex justify-start items-center p-4">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:text-blue-800 cursor-pointer">
        Social Media
      </h2>
    </div>
  );
};

export default Navbar;
