import React from 'react';
import { Link } from 'react-scroll';

const Logo = () => {
  return (
    <Link to="hero" spy={true} smooth={true} offset={-70} duration={700} className="cursor-pointer">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-2">
          <img 
            src="https://i.ibb.co/68qn8Qh/staysmart-logo.png" 
            alt="StaySmart Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-blue to-primary-green bg-clip-text text-transparent">
          StaySmart
        </h1>
      </div>
    </Link>
  );
};

export default Logo;